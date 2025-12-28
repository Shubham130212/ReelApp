import './Landing.css';
import { useNavigate } from 'react-router-dom';

const heroImages = [
  'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
];

const showcaseImages = [
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <header className="landing__header">
        <div className="landing__logo">ReelEats</div>
        <nav className="landing__nav">
          <a href="#hero">Discover</a>
          <a href="#gallery">Gallery</a>
          <a href="#partners">Partners</a>
          <a href="#footer">Contact</a>
        </nav>
        <div className="landing__auth">
          <button className="landing__cta" onClick={() => navigate('/user/register')}>Sign up</button>
          <button className="landing__ghost" onClick={() => navigate('/user/login')}>Sign in</button>
        </div>
      </header>

      <section id="hero" className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">REEL-FIRST DINING</p>
          <h1>Savor cinematic bites from chefs around the world</h1>
          <p>Stream vibrant food reels, follow creators, and get dishes delivered from your favorite culinary artists.</p>
          <div className="hero__actions">
            <button className="landing__cta">Start Exploring</button>
            <button className="landing__ghost">Learn More</button>
          </div>
        </div>
        <div className="hero__gallery">
          {heroImages.map((src, index) => (
            <div key={src} className={`hero__image hero__image--${index}`}>
              <img src={src} alt="Hero food" />
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery">
        <div className="gallery__headings">
          <h2>Feasts in motion</h2>
          <p>Each reel is handpicked for bold flavor, storytelling, and visuals that feed your inspiration.</p>
        </div>
        <div className="gallery__grid">
          {showcaseImages.map((src, index) => (
            <figure key={src} className="gallery__card">
              <img src={src} alt="Showcase dish" />
              <figcaption>
                <p>Chef {index + 1}</p>
                <span>Signature dish • 2 min reel</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="partners" className="partners">
        <div className="partners__text">
          <p className="hero__eyebrow">FOR FOOD PARTNERS</p>
          <h2>Showcase your craft in an immersive reel storefront</h2>
          <p>We help visionary kitchens and creators launch cinematic menus with seamless logistics.</p>
          <ul>
            <li>Rich motion templates and brand styling</li>
            <li>Built-in analytics and community tools</li>
            <li>Curated partnerships with delivery networks</li>
          </ul>
        </div>
        <div className="partners__panel">
          <div className="partners__stat">
            <span>120K</span>
            <p>Monthly reel plays</p>
          </div>
          <div className="partners__stat">
            <span>340+</span>
            <p>Partner kitchens</p>
          </div>
          <div className="partners__stat">
            <span>4.9★</span>
            <p>Community rating</p>
          </div>
        </div>
      </section>

      <footer id="footer" className="landing__footer">
        <div>
          <p className="hero__eyebrow">REEL EATS</p>
          <h3>Pairs cravings with brilliant stories</h3>
        </div>
        <div>
          <p>hello@reeleats.app</p>
          <p>© {new Date().getFullYear()} ReelEats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
