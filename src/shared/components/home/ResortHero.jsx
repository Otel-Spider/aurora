import React from 'react';
import './resort-hero.css';

const ResortHero = ({
  title = "Rixos Sharm El Sheikh Adults Only 18+",
  logoSrc,
  bgImageUrl, // Consumer must pass this
  location = "Sharm El Sheikh, Egypt",
  stars = 5,
  chips = [
    { key: 'all-inclusive', label: 'All Inclusive', icon: '🍽️' },
    { key: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { key: 'fitness', label: 'Fitness', icon: '💪' },
    { key: 'wellness', label: 'Wellness', icon: '🧘' },
    { key: 'sports', label: 'Sports', icon: '⚽' },
    { key: 'watersports', label: 'Watersports', icon: '🏄' },
    { key: 'beach', label: 'Beach', icon: '🏖️' },
    { key: 'romance', label: 'Romance', icon: '💕' }
  ],
  ratingBadge = { score: '4.8/5', reviews: '900 reviews' },
  parallax = false,
  onChipClick
}) => {
  // Star icon component
  const StarIcon = ({ filled = true }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={filled ? "var(--hero-gold)" : "transparent"}
        stroke={filled ? "var(--hero-gold)" : "rgba(255,255,255,0.3)"}
        strokeWidth="1.5"
      />
    </svg>
  );

  // Location dot separator
  const LocationDot = () => (
    <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="2" r="2" fill="var(--hero-gold)" />
    </svg>
  );

  const handleChipClick = (key) => {
    if (onChipClick) {
      onChipClick(key);
    }
  };

  return (
    <section 
      role="banner" 
      aria-label="Resort hero"
      className={`resort-hero ${parallax ? 'parallax' : ''}`}
      style={{ backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined }}
    >
      <div className="hero-container">
        {/* Logo */}
        {logoSrc && (
          <div className="hero-logo">
            <img src={logoSrc} alt="Resort Logo" />
          </div>
        )}

        {/* Title */}
        <h1 className="hero-title">{title}</h1>

        {/* Stars Rating */}
        <div className="hero-stars" aria-label={`${stars} out of 5 stars`}>
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < stars} />
          ))}
        </div>

        {/* Location Pill */}
        <div className="hero-pill">
          <LocationDot />
          <span>{location}</span>
        </div>

        {/* Feature Chips */}
        <div className="hero-chips">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              className="hero-chip"
              onClick={() => handleChipClick(chip.key)}
              aria-pressed="false"
            >
              {chip.icon && <span className="chip-icon">{chip.icon}</span>}
              <span className="chip-label">{chip.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rating Badge */}
      <div className="hero-rating">
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={true} />
          ))}
        </div>
        <div className="rating-text">
          <span className="rating-score">{ratingBadge.score}</span>
          <span className="rating-separator">•</span>
          <span className="rating-reviews">{ratingBadge.reviews}</span>
        </div>
      </div>
    </section>
  );
};

export default ResortHero;
