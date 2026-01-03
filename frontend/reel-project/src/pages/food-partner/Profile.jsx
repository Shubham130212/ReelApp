import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const fallBackStats = { meals: '43', customers: '15K' };

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const { data } = await axios.get('http://localhost:7000/api/auth/myProfile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Profile data:', data);
        setProfileData(data?.user);
      } catch (err) {
        console.error('Failed to load profile data', err);
        setError('Unable to load profile details');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const { data } = await axios.get('http://localhost:7000/api/food/get-food-items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Videos data:', data);
        setVideos(data?.foodItems || []);
      } catch (err) {
        console.error('Failed to load videos', err);
        setError('Unable to load videos');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <section className="profile-screen">
      <div className="profile-content">
        <div className="profile-card">
          {error && <p className="profile-error">{error}</p>}
          <div className="profile-card__header">
            <div className="profile-avatar">
              {profileData?.image ? (
                <img src={profileData.image} alt={profileData.company_name} />
              ) : (
                <span>{profileData?.company_name?.[0] || profileData?.name?.[0] || 'FP'}</span>
              )}
            </div>
            <div className="profile-meta">
              <span className="profile-tag">{profileData?.company_name || profileData?.name || 'Business name'}</span>
              <span className="profile-subtag">{profileData?.address || 'Address'}</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <small>total meals</small>
              <strong>{profileData ? fallBackStats.meals : '--'}</strong>
            </div>
            <div className="profile-stat">
              <small>customer serve</small>
              <strong>{profileData ? fallBackStats.customers : '--'}</strong>
            </div>
          </div>
        </div>

        {videos.length > 0 && (
          <div className="profile-grid">
            {videos.map(video => (
              <div key={video._id} className="profile-tile profile-tile--media">
                {video?.image && (
                  <img src={video.image} alt={video?.title || video?.name || 'video preview'} />
                )}
                <span className="profile-tile__label">
                  {video?.title || video?.name || 'video'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;