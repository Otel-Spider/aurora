import React, { useState, useEffect, useCallback, useRef } from 'react';
import './vertical-spotlight-slider.css';

const VerticalSpotlightSlider = ({
  eyebrow = "DISCOVER",
  heading = "The ALL Inclusive Collection. All in. All for you.",
  slides = [],
  startIndex = 0
}) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMouseOverTextStack, setIsMouseOverTextStack] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const textColumnRef = useRef(null);
  const componentRef = useRef(null);
  const wheelThrottleRef = useRef(null);

  // Progress calculation
  const computeProgress = useCallback((currentIndex) => {
    const totalSlides = slides.length;
    const maxIndex = Math.max(0, totalSlides - 1);
    const progressRatio = maxIndex > 0 ? currentIndex / maxIndex : 0;
    return {
      currentIndex,
      progressRatio,
      totalSlides,
      maxIndex
    };
  }, [slides.length]);

  // Navigation functions
  const goToSlide = useCallback((newIndex, direction = 'right') => {
    if (newIndex === activeIndex || isAnimating || newIndex < 0 || newIndex >= slides.length) {
      return;
    }

    setIsAnimating(true);
    setSlideDirection(direction);
    setActiveIndex(newIndex);

    // Update progress
    const progress = computeProgress(newIndex);
    setPage(progress.progressRatio);
    setPages(1);

    // Reset animation state after transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [activeIndex, isAnimating, slides.length, computeProgress]);

  const goToPrevious = useCallback(() => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : slides.length - 1;
    goToSlide(newIndex, 'left');
  }, [activeIndex, slides.length, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex = activeIndex < slides.length - 1 ? activeIndex + 1 : 0;
    goToSlide(newIndex, 'right');
  }, [activeIndex, slides.length, goToSlide]);

  // Throttle function
  const throttle = useCallback((func, delay) => {
    return (...args) => {
      if (wheelThrottleRef.current) return;
      
      wheelThrottleRef.current = setTimeout(() => {
        func(...args);
        wheelThrottleRef.current = null;
      }, delay);
    };
  }, []);

  // Wheel handler for text column
  const handleWheel = useCallback(
    throttle((event) => {
      console.log('Wheel event detected, mouse over text stack:', isMouseOverTextStack);
      
      // Handle slide navigation when mouse is over text stack
      if (isMouseOverTextStack) {
        console.log('Handling slide navigation:', event.deltaY);
        
        if (event.deltaY > 0) {
          // Scroll down - next slide
          console.log('Going to next slide');
          goToNext();
        } else {
          // Scroll up - previous slide
          console.log('Going to previous slide');
          goToPrevious();
        }
      }
    }, 30),
    [goToNext, goToPrevious, isMouseOverTextStack]
  );



  // Global wheel blocker
  useEffect(() => {
    const globalWheelHandler = (event) => {
      if (isMouseOverTextStack) {
        // Only prevent default, but let the event bubble to our handlers
        event.preventDefault();
        console.log('Global wheel blocker: preventing page scroll');
        return false;
      }
    };

    // Add global wheel listener to document
    document.addEventListener('wheel', globalWheelHandler, { passive: false, capture: true });
    console.log('Global wheel blocker attached');

    return () => {
      document.removeEventListener('wheel', globalWheelHandler, { capture: true });
    };
  }, [isMouseOverTextStack]);

  // Event listeners
  useEffect(() => {
    const textColumn = textColumnRef.current;
    const entireSection = componentRef.current;

    console.log('Setting up wheel listeners:', { textColumn, entireSection });

    // Add to text column for precise control
    if (textColumn) {
      textColumn.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      console.log('Wheel listener attached to text column');
    }

    // Also add to entire section as backup
    if (entireSection) {
      entireSection.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      console.log('Wheel listener attached to entire section');
    }

    return () => {
      if (textColumn) {
        textColumn.removeEventListener('wheel', handleWheel, { capture: true });
      }
      if (entireSection) {
        entireSection.removeEventListener('wheel', handleWheel, { capture: true });
      }
      if (wheelThrottleRef.current) {
        clearTimeout(wheelThrottleRef.current);
      }
    };
  }, [handleWheel]);

  // Initialize progress
  useEffect(() => {
    const progress = computeProgress(activeIndex);
    setPage(progress.progressRatio);
    setPages(1);
  }, [activeIndex, computeProgress]);

  if (!slides.length) return null;

  const activeSlide = slides[activeIndex];

  return (
    <section className="vertical-spotlight-slider" ref={componentRef}>
      <div className="vss-background">
        <div className="container-xxl">
          <div className="vss-header">
            <div className="vss-eyebrow">{eyebrow}</div>
            <h2 className="vss-heading">{heading}</h2>
          </div>

          <div className="vss-content">
            {/* Desktop Layout */}
            <div className="row g-4 align-items-center d-none d-lg-flex">
              {/* Left Controls */}
              <div className="col-auto">
                <div className="vss-controls">
                  <button
                    className="vss-control vss-control-up"
                    onClick={goToPrevious}
                    aria-label="Previous slide"
                    disabled={isAnimating}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className="vss-control vss-control-down"
                    onClick={goToNext}
                    aria-label="Next slide"
                    disabled={isAnimating}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Center Image */}
              <div className="col-12 col-lg-6">
                <div className="vss-image-container">
                  <div
                    className={`vss-image ${
                      isAnimating 
                        ? slideDirection === 'right' 
                          ? 'vss-image-slide-in-right' 
                          : 'vss-image-slide-in-left'
                        : 'vss-image-current'
                    }`}
                    aria-live="polite"
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.title}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right Text Stack */}
              <div className="col-12 col-lg-5">
                <div
                  className="vss-text-stack"
                  ref={textColumnRef}
                  onMouseEnter={() => {
                    console.log('Mouse entered text stack');
                    setIsMouseOverTextStack(true);
                  }}
                  onMouseLeave={() => {
                    console.log('Mouse left text stack');
                    setIsMouseOverTextStack(false);
                  }}
                >
                  {slides.map((slide, index) => {
                    const isActive = index === activeIndex;
                    const offsetDistance = 150;
                    
                    // Calculate offset for infinite loop
                    let offset = index - activeIndex;
                    
                    // Handle wrapping for infinite loop
                    if (offset > slides.length / 2) {
                      offset = offset - slides.length;
                    } else if (offset < -slides.length / 2) {
                      offset = offset + slides.length;
                    }
                    
                    return (
                      <div
                        key={slide.id}
                        className={`vss-text-item ${
                          isActive ? 'vss-text-active' : 'vss-text-inactive'
                        }`}
                        style={{
                          transform: isActive 
                            ? 'translateY(-50%) scale(1)' 
                            : `translateY(calc(-50% + ${offset * offsetDistance}px)) scale(0.85)`,
                          zIndex: isActive ? 10 : Math.max(1, 10 - Math.abs(offset))
                        }}
                        aria-current={isActive ? 'true' : 'false'}
                      >
                        <h3 className="vss-text-title">{slide.title}</h3>
                        {slide.description && isActive && (
                          <p className="vss-text-description">{slide.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="vss-mobile-layout d-lg-none">
              {/* Image */}
              <div className="vss-mobile-image">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  loading="lazy"
                />
              </div>

              {/* Text Loop */}
              <div className="vss-mobile-text-loop">
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={slide.id}
                      className={`vss-mobile-text-item ${
                        isActive ? 'vss-mobile-text-active' : 'vss-mobile-text-inactive'
                      }`}
                      aria-current={isActive ? 'true' : 'false'}
                    >
                      <h3 className="vss-mobile-title">{slide.title}</h3>
                      {slide.description && (
                        <p className="vss-mobile-description">{slide.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="vss-progress" style={{ "--vss-pages": pages, "--vss-page": page }}></div>

              {/* Navigation Buttons */}
              <div className="vss-mobile-controls">
                <button
                  className="vss-mobile-control vss-mobile-prev"
                  onClick={goToPrevious}
                  aria-label="Previous slide"
                  disabled={isAnimating}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="vss-mobile-control vss-mobile-next"
                  onClick={goToNext}
                  aria-label="Next slide"
                  disabled={isAnimating}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M19 12l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerticalSpotlightSlider;
