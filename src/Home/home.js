import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import VisionSection from "../components/home/VisionSection";
import ServicesSection from "../components/home/ServicesSection";
import ProductsCarousel from "../components/home/ProductsCarousel";
import FormulationsSection from "../components/home/FormulationsSection";
import QualitySection from "../components/home/QualitySection";
import CorporateEnquirySection from "../components/home/CorporateEnquirySection";
import { products } from "../Products/productsData";
import heroImage from "../assets/optimized/ui/img13.webp";

import "../styles/home.css";

const Home = () => {
  React.useEffect(() => {
    document.title = "Nivvis Labs | Pharmaceutical & Healthcare";
    return () => {
      document.title = "Nivvis Labs";
    };
  }, []);

  return (
    <main className="bg-background-nivvis flex-grow-1">
      {/* HERO SECTION */}
      <section className="hero-corporate-section py-5 mb-5">
        <Container className="container-nivvis py-lg-3">
          <Row className="align-items-center gy-5">
            <Col lg={6} className="pe-lg-4">
              <span className="hero-badge">
                Pharmaceutical &amp; Healthcare
              </span>
              <h1 className="hero-title mb-3">
                Providing Trusted, Effective, and Secure Therapeutic Care.
              </h1>
              <p className="hero-description mb-4">
                Dedicated to improving patient health outcomes through
                accessible, high-quality medications with a primary focus on
                chronic care across cardiovascular health, diabetes, neurology,
                and pain management.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/product" className="hero-cta-btn hero-cta-primary">
                  Explore Products
                </Link>
                <Link to="/about" className="hero-cta-btn hero-cta-secondary">
                  Contact Us
                </Link>
              </div>
            </Col>
            <Col
              lg={6}
              className="d-flex justify-content-center justify-content-lg-end"
            >
              <div className="hero-image-wrapper">
                <img
                  src={heroImage}
                  alt="Nivvis Labs Laboratory Facility"
                  className="hero-image"
                  fetchpriority="high"
                  width="640"
                  height="480"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <VisionSection />
      <ServicesSection />
      <ProductsCarousel products={products} />
      <FormulationsSection />
      <QualitySection />
      <CorporateEnquirySection />
    </main>
  );
};

export default Home;
