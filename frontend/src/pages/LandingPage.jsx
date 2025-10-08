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
    3: {
      name: "Femivel Intimate Wash",
      price: "Rs.1000",
      image: "/images/Femivel.jpg",
      description: "Specially formulated with a pH-balanced formula to maintain the natural flora of intimate areas.",
      features: [
        "pH-balanced formula (pH 3.5-4.5)",
        "Maintains natural protective flora",
        "Gentle, soap-free cleansing",
        "Contains soothing natural extracts",
        "Hypoallergenic and gynecologist tested",
        "Free from harsh detergents and dyes"
      ],
      usage: "Use during daily shower routine. Apply small amount, lather gently, and rinse thoroughly.",
      ingredients: "Aqua, Sodium Lauroyl Methyl Isethionate, Decyl Glucoside, Lactic Acid, Calendula Extract",
      benefits: "Maintains intimate health, prevents irritation, gentle daily cleansing"
    },
    4: {
      name: "Corquill Retinol",
      price: "Rs.1200",
      image: "/images/Corquill.jpg",
      description: "Advanced anti-aging formula that helps reduce the appearance of fine lines, wrinkles, and uneven skin tone.",
      features: [
        "Advanced stabilized retinol formula",
        "Reduces appearance of fine lines and wrinkles",
        "Improves skin texture and tone",
        "Encapsulated for reduced irritation",
        "Suitable for most skin types",
        "Clinically tested for efficacy"
      ],
      usage: "Apply a pea-sized amount to clean, dry face in the evening. Follow with moisturizer.",
      ingredients: "Retinol, Niacinamide, Hyaluronic Acid, Ceramides, Vitamin E, Squalane",
      benefits: "Reduces signs of aging, improves skin texture, evens skin tone"
    },
    5: {
      name: "Kiaglow Cream",
      price: "Rs.950",
      image: "/images/Kiaglow.jpg",
      description: "Brightening formulation that helps reduce dark spots and hyperpigmentation for a more even skin tone.",
      features: [
        "Brightens and evens skin tone",
        "Reduces appearance of dark spots",
        "Gentle formula suitable for sensitive skin",
        "Contains antioxidant protection",
        "Non-comedogenic formula",
        "Dermatologist tested"
      ],
      usage: "Apply to clean face and neck twice daily, focusing on areas with discoloration.",
      ingredients: "Niacinamide, Vitamin C, Licorice Root Extract, Kojic Acid, Alpha Arbutin, Glycerin",
      benefits: "Brightens complexion, reduces hyperpigmentation, evens skin tone"
    },
    6: {
      name: "Incal Plus Tablets",
      price: "Rs.1500",
      image: "/images/Incal_Plus.jpg",
      description: "Comprehensive calcium and vitamin D supplement formulated to support bone health and help prevent osteoporosis.",
      features: [
        "High-potency calcium carbonate",
        "Includes vitamin D3 for better absorption",
        "Supports bone density and strength",
        "Easy-to-swallow tablets",
        "Suitable for adults of all ages",
        "Manufactured in GMP-certified facility"
      ],
      usage: "Take one tablet daily with food, or as directed by your healthcare provider.",
      ingredients: "Calcium Carbonate, Vitamin D3 (Cholecalciferol), Magnesium, Zinc, Vitamin K2",
      benefits: "Supports bone health, prevents osteoporosis, promotes calcium absorption"
    },
    7: {
      name: "Medomil L-Free",
      price: "Rs.1500",
      image: "/images/Medomil_L-Free.jpg",
      description: "Specialized lactose-free nutritional supplement designed for individuals with lactose intolerance.",
      features: [
        "100% lactose-free formula",
        "Complete nutritional profile",
        "Easy to digest",
        "Contains essential vitamins and minerals",
        "Suitable for children and adults",
        "Pleasant taste and texture"
      ],
      usage: "Mix recommended amount with water as directed on package. Consume as meal replacement or supplement.",
      ingredients: "Corn Syrup Solids, Soy Protein Isolate, Vegetable Oils, Vitamins, Minerals, Prebiotics",
      benefits: "Lactose-free nutrition, easy digestion, complete vitamin and mineral profile"
    },
    8: {
      name: "Medomil LBW",
      price: "Rs.1500",
      image: "/images/Medomil_LBW.jpg",
      description: "Specialized nutritional formula specifically designed for low birth weight infants.",
      features: [
        "Higher calorie density for catch-up growth",
        "Enhanced protein content",
        "Contains essential fatty acids for brain development",
        "Easy to digest formula",
        "Fortified with vitamins and minerals",
        "Clinically tested for efficacy"
      ],
      usage: "Prepare as directed by healthcare provider. Use under medical supervision for low birth weight infants.",
      ingredients: "Whey Protein, Vegetable Oils, Lactose, MCT Oil, Vitamins, Minerals, Prebiotics",
      benefits: "Supports catch-up growth, provides essential nutrients, promotes healthy development"
    },
    9: {
      name: "Medomil Stage-1",
      price: "Rs.1500",
      image: "/images/Medomil_Stage-1.jpg",
      description: "Infant formula specially designed for babies 0-6 months. Provides complete nutrition for healthy development.",
      features: [
        "Complete nutrition for 0-6 months",
        "Contains DHA and ARA for brain development",
        "Easy to digest proteins",
        "Fortified with iron and essential vitamins",
        "Prebiotics for digestive health",
        "Clinically tested composition"
      ],
      usage: "Prepare as directed on package. Use as sole source of nutrition or as supplement to breastfeeding.",
      ingredients: "Lactose, Whey Protein, Vegetable Oils, DHA, ARA, Prebiotics, Vitamins, Minerals",
      benefits: "Complete infant nutrition, supports brain development, promotes healthy growth"
    },
    10: {
      name: "Medomil Stage-2",
      price: "Rs.1500",
      image: "/images/Medomil_Stage-2.jpg",
      description: "Follow-on formula designed for babies 6-12 months. Provides additional nutrients needed as babies begin solid foods.",
      features: [
        "Follow-on formula for 6-12 months",
        "Higher iron content for growing needs",
        "Contains essential fatty acids",
        "Easy transition from Stage-1",
        "Fortified with vitamins and minerals",
        "Supports immune system development"
      ],
      usage: "Prepare as directed on package. Use as part of a balanced diet with appropriate solid foods.",
      ingredients: "Lactose, Skimmed Milk, Vegetable Oils, DHA, ARA, Prebiotics, Vitamins, Minerals",
      benefits: "Supports continued growth, provides essential nutrients, complements solid foods"
    },
    11: {
      name: "Medomil Stage-3",
      price: "Rs.1500",
      image: "/images/Medomil_Stage-3.jpg",
      description: "Growing-up milk specially formulated for toddlers 1-3 years old to support increased activity levels.",
      features: [
        "Growing-up milk for 1-3 years",
        "Supports bone development with calcium and vitamin D",
        "Contains iron for cognitive development",
        "Pleasant taste toddlers enjoy",
        "Easy to prepare and serve",
        "Fortified with essential vitamins"
      ],
      usage: "Mix with water as directed. Serve as part of a balanced diet with regular family foods.",
      ingredients: "Skimmed Milk, Vegetable Oils, Lactose, Vitamins, Minerals, Prebiotics",
      benefits: "Supports toddler development, provides essential nutrients, complements family foods"
    },
    12: {
      name: "Permethrin Lotion",
      price: "Rs.1500",
      image: "/images/Permethrin_Lotion.jpg",
      description: "Medicated treatment for scabies and lice infestations. Effective formula kills parasites while being gentle.",
      features: [
        "Effective against scabies and lice",
        "Single application often sufficient",
        "Minimal skin irritation when used correctly",
        "Easy to apply lotion",
        "Clinically proven efficacy",
        "Available without prescription"
      ],
      usage: "Apply from neck to toes, leave on for 8-14 hours, then wash off. Repeat after 7 days if needed.",
      ingredients: "Permethrin 5%, Isopropyl Alcohol, Purified Water, Emulsifying Wax, Mineral Oil",
      benefits: "Treats scabies and lice, easy application, clinically proven effectiveness"
    }
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
              src="/images/Logo.jpg" 
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
              <p style={{ color: '#ffffffff', marginTop: '15px', lineHeight: '1.7' }}>
                Providing premium healthcare solutions for over a decade with a commitment to quality and innovation.
              </p>
            </div>
            
            <div className="footer-column">
              <h3>Help</h3>
              <ul>
                <li>Contact Us</li>                
                <li>FAQ</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
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