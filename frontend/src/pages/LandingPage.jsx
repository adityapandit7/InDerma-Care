import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/index.css"; 

function LandingPage() {
  const [isNavActive, setIsNavActive] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [scrollHeader, setScrollHeader] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrollHeader(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popup with Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activePopup) {
        setActivePopup(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activePopup]);

  // Product data
  const products = {
    1: {
      name: "Betaclin Face Wash",
      price: "Rs.1000",
      image: "/images/Betaclin.jpg",
      description: "A gentle yet effective cleanser designed to remove impurities and excess oil while maintaining the skin's natural moisture balance.",
      features: [
        "Gentle formula suitable for sensitive skin",
        "Removes impurities without stripping natural oils",
        "Maintains skin's pH balance",
        "Dermatologically tested",
        "Free from harsh chemicals and parabens",
        "Provides a refreshing clean feeling"
      ],
      usage: "Apply to wet face, massage gently, and rinse thoroughly. Use twice daily for best results.",
      ingredients: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Aloe Vera Extract",
      benefits: "Cleanses deeply, maintains moisture balance, suitable for daily use"
    },
    2: {
      name: "D Fence Lotion",
      price: "Rs.1000",
      image: "/images/D-Fence_Lotion.jpg",
      description: "Creates a protective barrier on the skin that shields against environmental pollutants while providing deep hydration.",
      features: [
        "Creates protective barrier against pollutants",
        "Non-greasy, fast-absorbing formula",
        "Provides 24-hour hydration",
        "Strengthens skin's natural defense",
        "Suitable for all skin types",
        "Dermatologist recommended"
      ],
      usage: "Apply evenly to clean skin twice daily, focusing on exposed areas.",
      ingredients: "Aqua, Glycerin, Dimethicone, Niacinamide, Ceramide NP, Allantoin",
      benefits: "Protects from environmental damage, deeply hydrates, strengthens skin barrier"
    },
    // Add all other products here...
  };

  // Handle image error
  const handleImageError = (e, productName) => {
    e.target.src = `https://via.placeholder.com/300x200/1a5f9e/ffffff?text=${encodeURIComponent(productName)}`;
  };

  // Render product popup
  const renderProductPopup = () => {
    if (!activePopup) return null;
    
    const product = products[activePopup];
    if (!product) return null;

    return (
      <div className="popup-overlay active" onClick={(e) => e.target === e.currentTarget && setActivePopup(null)}>
        <div className="popup-content">
          <div className="popup-close" onClick={() => setActivePopup(null)}>
            <i className="fas fa-times"></i>
          </div>
          <div className="popup-body">
            <div className="popup-image">
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => handleImageError(e, product.name)}
              />
            </div>
            <div className="popup-details">
              <h2>{product.name}</h2>
              <div className="popup-price">{product.price}</div>
              <p className="popup-description">{product.description}</p>
              
              <div className="popup-info-grid">
                <div className="info-item">
                  <h4>Usage</h4>
                  <p>{product.usage}</p>
                </div>
                <div className="info-item">
                  <h4>Key Ingredients</h4>
                  <p>{product.ingredients}</p>
                </div>
                <div className="info-item">
                  <h4>Benefits</h4>
                  <p>{product.benefits}</p>
                </div>
              </div>
              
              <div className="popup-features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="popup-actions">
                <button className="btn">Add to Cart</button>
                <button className="btn btn-outline">Save for Later</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render product card
  const renderProductCard = (productId, product) => (
    <div className="product-card" key={productId} onClick={() => setActivePopup(productId)}>
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => handleImageError(e, product.name)}
        />
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <div className="product-price">{product.price}</div>
        <p>{product.description}</p>
      </div>
    </div>
  );

  return (
    <>
      <header style={{
        boxShadow: scrollHeader ? '0 5px 20px rgba(0, 0, 0, 0.1)' : '0 2px 15px rgba(0, 0, 0, 0.08)',
        padding: scrollHeader ? '5px 0' : '0'
      }}>
        <div className="container header-container">
          <div className="logo">
            <img 
              src="/images/Logo2.jpg" 
              alt="Inderma Care Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
            <h1>INDERMA CARE</h1>
          </div>
          
          <div className="mobile-menu" onClick={() => setIsNavActive(!isNavActive)}>
            <i className="fas fa-bars"></i>
          </div>
          
          <nav className={isNavActive ? 'active' : ''}>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          
            <div className="header-actions">
            <a href="#search"><i className="fas fa-search"></i></a>
            {/* Update this line to navigate to login */}
            <a onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>
              <i className="fas fa-user"></i>
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container">
          <h2>WELCOME</h2>
          <p>We specialize in providing high-quality healthcare products, including infant milk powders, multivitamins, calcium supplements, and a range of medical supplies. Our commitment is to support the health and well-being of families and individuals.</p>
          <a href="#products" className="btn">Explore Products</a>
        </div>
      </section>

      <section className="products" id="products">
        <div className="container">
          <div className="section-title">
            <h2>Our Products</h2>
          </div>
          
          <div className="products-grid">
            {Object.entries(products).map(([id, product]) => 
              renderProductCard(id, product)
            )}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>INDERMA CARE</h3>
              <p style={{ color: '#adb5bd', marginTop: '15px', lineHeight: '1.7' }}>
                Providing premium healthcare solutions for over a decade with a commitment to quality and innovation.
              </p>
            </div>
            
            <div className="footer-column">
              <h3>Help</h3>
              <ul>
                <li><a href="#contact">Contact Us</a></li>                
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h3>Contact</h3>
              <ul>
                <li><i className="fas fa-map-marker-alt"></i> Imadol, Lalitpur, Nepal</li>
                <li><i className="fas fa-phone"></i> +977-9823411639</li>
                <li><i className="fas fa-envelope"></i> indermacare@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; 2025 Inderma Care Pvt. Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {renderProductPopup()}
    </>
  );
}

export default LandingPage;