import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'English' },
    { code: 'ES', label: 'Español' },
    { code: 'FR', label: 'Français' },
    { code: 'DE', label: 'Deutsch' },
  ];

  const currencies = [
    { code: 'USD', label: 'US Dollar' },
    { code: 'EUR', label: 'Euro' },
    { code: 'GBP', label: 'British Pound' },
    { code: 'JPY', label: 'Japanese Yen' },
  ];

  const siteMapItems = [
    'Introduction',
    'Rooms',
    'Entertainment',
    'Food and drinks',
    'Sports',
    'Wellness',
    'Offers',
    'Location',
    'Guest reviews'
  ];

  return (
    <>
      <header className="header">
        {/* Top section with menu button, logo, and dropdowns */}
        <div className="header-top">
          <div className="header-container">
            <div className="header-left">
              <button 
                className="menu-button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="menu-icon">☰</span>
                <span className="menu-text">Menu</span>
              </button>
            </div>
            
            <div className="header-center">
              <div className="logo">
                <img 
                  src="https://static.wixstatic.com/media/f57497_e724bd3950134b9badbd5bca5b0824b4~mv2.png/v1/fill/w_223,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo%20Head%20Office%20Base%20Horizontal%20Transpa.png"
                  alt="Aurora Logo"
                  className="logo-image"
                />
              </div>
            </div>
            
            <div className="header-right">
              <div className="dropdowns">
                <select 
                  className="language-dropdown"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.label}
                    </option>
                  ))}
                </select>
                
                <hr className="dropdown-separator" />
                
                <select 
                  className="currency-dropdown"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Light horizontal line */}
        <hr className="header-divider" />

        {/* Site map section */}
        <div className="site-map">
          <div className="site-map-container">
            <nav className="site-map-nav">
              {siteMapItems.map((item, index) => (
                <a key={index} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="site-map-link">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom horizontal line */}
        <hr className="header-bottom-divider" />
      </header>

      {/* Off-canvas menu overlay */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Off-canvas menu */}
      <div className={`off-canvas-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <button 
            className="close-button"
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className="menu-nav">
          {siteMapItems.map((item, index) => (
            <a 
              key={index} 
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
              className="menu-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="menu-footer">
          <div className="menu-dropdowns">
            <select 
              className="menu-language-dropdown"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
            
            <select 
              className="menu-currency-dropdown"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
