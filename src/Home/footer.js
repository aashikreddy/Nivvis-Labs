import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import smallLogo from "../assets/optimized/ui/logo.webp";
import name from "../assets/optimized/ui/name.webp";

const Footer = () => (
  <footer className="enterprise-footer bg-surface-nivvis border-top mt-auto pt-5 pb-4">
    <Container className="container-nivvis">
      <Row className="gy-5 gx-lg-5">
        {/* Column 1: Corporate Profile & Overview */}
        <Col lg={4} md={12}>
          <div className="d-flex align-items-center mb-3">
            <img
              src={smallLogo}
              alt="Nivvis Labs Emblem"
              width="32"
              height="32"
              style={{ height: "32px", width: "auto", objectFit: "contain" }}
            />
            <img
              src={name}
              alt="Nivvis Labs"
              className="ms-2"
              width="80"
              height="16"
              style={{ height: "16px", width: "auto", objectFit: "contain" }}
            />
          </div>
          <p
            className="text-body text-text-secondary pe-xl-4 mb-3"
            style={{ lineHeight: "1.6" }}
          >
            Nivvis Labs Private Limited is dedicated to improving patient health
            outcomes through high-quality therapeutic solutions, continuous
            pharmaceutical research, and accessible chronic care medications.
          </p>
          <div className="text-small text-muted-nivvis">
            <span className="fw-semibold text-primary">Core Focus:</span>{" "}
            Cardiovascular, Neurology, Diabetes &amp; Pain Management.
          </div>
        </Col>

        {/* Column 2: Quick Links */}
        <Col lg={2} sm={6} xs={12}>
          <h3 className="text-h4 text-primary mb-3 fw-bold">Company</h3>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            <li>
              <Link
                to="/"
                className="link-nivvis text-body text-text-secondary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="link-nivvis text-body text-text-secondary"
              >
                About Nivvis
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className="link-nivvis text-body text-text-secondary"
              >
                Product Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="link-nivvis text-body text-text-secondary"
              >
                Contact &amp; Inquiries
              </Link>
            </li>
          </ul>
        </Col>

        {/* Column 3: Therapeutic Areas (Derived strictly from productsData.js) */}
        <Col lg={3} sm={6} xs={12}>
          <h3 className="text-h4 text-primary mb-3 fw-bold">
            Therapeutic Areas
          </h3>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            <li>
              <Link
                to="/product?category=anti-hypertension"
                className="link-nivvis text-body text-text-secondary"
              >
                Anti-Hypertension
              </Link>
            </li>
            <li>
              <Link
                to="/product?category=neuropathic-pain"
                className="link-nivvis text-body text-text-secondary"
              >
                Neuropathic Pain
              </Link>
            </li>
            <li>
              <Link
                to="/product?category=diabetes"
                className="link-nivvis text-body text-text-secondary"
              >
                Diabetes Care
              </Link>
            </li>
            <li>
              <Link
                to="/product?category=lipids"
                className="link-nivvis text-body text-text-secondary"
              >
                Lipid Management
              </Link>
            </li>
            <li>
              <Link
                to="/product?category=calcium-vitamin-deficiency"
                className="link-nivvis text-body text-text-secondary"
              >
                Calcium &amp; Vitamin Care
              </Link>
            </li>
          </ul>
        </Col>

        {/* Column 4: Registered Office & Verified Contact */}
        <Col lg={3} md={12}>
          <h3 className="text-h4 text-primary mb-3 fw-bold">Headquarters</h3>
          <address
            className="text-body text-text-secondary mb-3"
            style={{ fontStyle: "normal", lineHeight: "1.6" }}
          >
            R/o.205, Floor GRD, Sunder Kamala Nagar,
            <br />
            Laxmibai Kelkar Marg, Shastri Gully,
            <br />
            Manav Seva Singh, Sion,
            <br />
            Mumbai – 400022, India
          </address>
          <div className="d-flex flex-column gap-2 text-small">
            <div>
              <span className="fw-semibold text-text-primary">Phone: </span>
              <a
                href="tel:+917702998819"
                className="link-nivvis text-text-secondary"
              >
                +91 7702998819
              </a>
            </div>
            <div>
              <span className="fw-semibold text-text-primary">Email: </span>
              <a
                href="mailto:nivvislabs2021@gmail.com"
                className="link-nivvis text-text-secondary"
              >
                nivvislabs2021@gmail.com
              </a>
            </div>
          </div>
        </Col>
      </Row>

      {/* Regulatory & Informational Notice */}
      <Row className="mt-5 pt-4 border-top">
        <Col lg={8} md={12} className="mb-3 mb-lg-0">
          <p
            className="text-caption text-muted-nivvis mb-0"
            style={{ lineHeight: "1.5" }}
          >
            <strong>Informational Notice:</strong> The therapeutic and product
            information provided on this website is intended solely for
            corporate, commercial, and general informational purposes. It does
            not constitute medical advice or substitute for consultation with a
            qualified medical professional.
          </p>
        </Col>
        <Col lg={4} md={12} className="text-lg-end">
          <p className="text-caption text-muted-nivvis mb-0">
            &copy; {new Date().getFullYear()} Nivvis Labs Private Limited. All
            rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
