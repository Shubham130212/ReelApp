import React, { useState, useEffect, useRef, useCallback } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [videos, setVideos] = useState([])
  const videoRefs = useRef(new Map())
  const observerRef = useRef(null)

  const setVideoRef = useCallback(
    id => el => {
      const observer = observerRef.current
      if (el) {
        videoRefs.current.set(id, el)
        observer?.observe(el)
      } else {
        const video = videoRefs.current.get(id)
        if (video) {
          observer?.unobserve(video)
        }
        videoRefs.current.delete(id)
      }
    },
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target

          if (entry.isIntersecting) {
            video.play().catch(() => { })
          } else {
            video.pause()
            video.currentTime = 0
          }
        })
      },
      { threshold: 0.85 }
    )
    observerRef.current = observer

    return () => {
      videoRefs.current.forEach(video => video && observer.unobserve(video))
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return  // or redirect to login
        const { data } = await axios.get(
          'http://localhost:7000/api/food/get-food-items',
          { headers: { Authorization: `Bearer ${token}` } }
        )
        console.log('data',data)
        setVideos(data.foodItems)
      } catch (err) {
        console.error('Failed to load food items', err)
      }
    }
    fetchFood()
  }, [])

  return (
    <section className="reels-page">
      <div className="reels-wrapper">
        {videos.map((item) => (
          <article key={item._id} className="reel-card">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              //poster="https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            />

            <div className="reel-overlay">
              <div className="reel-info">
                <span className="reel-badge">{item?.badge}</span>
                <p className="reel-description">{item.description}</p>
                <Link
                  className="reel-cta" to={"/food-partner" + item.food_partner} aria-label="Visit store">
                  Visit store
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home