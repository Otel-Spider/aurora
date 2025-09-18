import React from 'react';
import './resort-hero.css';

const ResortHero = ({
  title = "Rixos Sharm El Sheikh Adults Only 18+",
  logoSrc,
  bgImageUrl, // Consumer must pass this
  location = "Sharm El Sheikh, Egypt",
  stars = 5,
  chips = [
    { key: 'all-inclusive', label: 'All Inclusive', icon: 'dining' },
    { key: 'entertainment', label: 'Entertainment', icon: 'entertainment' },
    { key: 'fitness', label: 'Fitness', icon: 'fitness' },
    { key: 'wellness', label: 'Wellness', icon: 'wellness' },
    { key: 'sports', label: 'Sports', icon: 'sports' },
    { key: 'watersports', label: 'Watersports', icon: 'watersports' },
    { key: 'beach', label: 'Beach', icon: 'beach' },
    { key: 'romance', label: 'Romance', icon: 'romance' }
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

  // Chip icon component
  const ChipIcon = ({ type }) => {
    const icons = {
      dining: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2H5L5.4 5M7 13V21H9V13L7 13ZM13 13V21H15V13L13 13ZM19 13V21H21V13L19 13ZM5.4 5L6.4 9H17.6L18.6 5H5.4ZM6.4 9L7 13H17L17.6 9H6.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      entertainment: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      fitness: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 6.5L9.5 9.5L12 7L14.5 9.5L17.5 6.5L20 9V20H4V9L6.5 6.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L12 9L15 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      wellness: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      sports: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      watersports: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 12 6 4 12 4S21 12 21 12S18 20 12 20S3 12 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      beach: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 12 6 4 12 4S21 12 21 12S18 20 12 20S3 12 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      romance: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };
    
    return icons[type] || icons.dining;
  };

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
              <span className="chip-icon">
                <ChipIcon type={chip.icon} />
              </span>
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
