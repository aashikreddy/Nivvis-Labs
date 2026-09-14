import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import smallLogo from "../assets/optimized/ui/logo.webp";
import name from "../assets/optimized/ui/name.webp";
import "../styles/navbar.css";

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => setShowOffcanvas(false);

  return (
    <header className="enterprise-header-wrapper">
      <Navbar
        sticky="top"
        expand="lg"
        className={`enterprise-navbar bg-surface-nivvis ${scrolled ? "scrolled shadow-sm" : "border-bottom"}`}
      >
        <Container className="container-nivvis d-flex align-items-center justify-content-between">
          {/* Brand Lockup */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="enterprise-brand d-flex align-items-center text-decoration-none py-1 me-2 me-lg-4"
            aria-label="Nivvis Labs Homepage"
          >
            <img
              src={smallLogo}
              alt="Nivvis Labs Logo"
              className="brand-logo"
              width="32"
              height="32"
            />
            <img
              src={name}
              alt="Nivvis Labs"
              className="brand-wordmark ms-2"
              width="80"
              height="16"
            />
          </Navbar.Brand>

          {/* Desktop Navigation Links */}
          <Nav className="d-none d-lg-flex align-items-center gap-4 mx-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={`enterprise-nav-link text-body fw-medium ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/product"
              className={`enterprise-nav-link text-body fw-medium ${location.pathname.startsWith("/product") ? "active" : ""}`}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={`enterprise-nav-link text-body fw-medium ${location.pathname === "/about" ? "active" : ""}`}
            >
              About Us
            </Nav.Link>
          </Nav>

          {/* Desktop Right Corporate CTA */}
          <div className="d-none d-lg-flex align-items-center ms-auto">
            <Link
              to="/about"
              className="btn btn-primary enterprise-nav-cta fw-medium px-4 py-2"
              style={{
                backgroundColor: "var(--color-primary)",
                borderColor: "var(--color-primary)",
                fontSize: "0.9375rem",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <Navbar.Toggle
            aria-controls="offcanvas-navbar-nav"
            aria-label="Toggle navigation menu"
            className="enterprise-mobile-toggle border-0 p-2 ms-auto d-lg-none"
            onClick={() => setShowOffcanvas(true)}
          >
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Drawer */}
      <Offcanvas
        className="bg-surface-nivvis enterprise-offcanvas"
        show={showOffcanvas}
        onHide={handleClose}
        placement="end"
        style={{ maxWidth: "320px", width: "85vw" }}
        aria-labelledby="offcanvas-navbar-title"
      >
        <Offcanvas.Header closeButton className="border-bottom px-4 py-3">
          <Offcanvas.Title
            id="offcanvas-navbar-title"
            className="d-flex align-items-center"
          >
            <img
              src={smallLogo}
              alt="Nivvis Labs Logo"
              width="28"
              height="28"
              style={{ height: "28px", width: "auto", objectFit: "contain" }}
            />
            <img
              src={name}
              alt="Nivvis Labs"
              className="ms-2"
              width="70"
              height="14"
              style={{ height: "14px", width: "auto", objectFit: "contain" }}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-4 py-4 d-flex flex-column justify-content-between">
          <Nav className="flex-column gap-3">
            <Nav.Link
              as={Link}
              to="/"
              onClick={handleClose}
              className={`enterprise-mobile-link text-h4 ${location.pathname === "/" ? "text-primary fw-bold" : "text-text-primary"}`}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/product"
              onClick={handleClose}
              className={`enterprise-mobile-link text-h4 ${location.pathname.startsWith("/product") ? "text-primary fw-bold" : "text-text-primary"}`}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              onClick={handleClose}
              className={`enterprise-mobile-link text-h4 ${location.pathname === "/about" ? "text-primary fw-bold" : "text-text-primary"}`}
            >
              About Us
            </Nav.Link>
          </Nav>

          <div className="pt-4 border-top mt-auto">
            <Link
              to="/about"
              onClick={handleClose}
              className="btn btn-primary w-100 py-3 fw-medium text-center d-block"
              style={{
                backgroundColor: "var(--color-primary)",
                borderColor: "var(--color-primary)",
                borderRadius: "var(--radius-sm)",
              }}
            >
              Contact Us
            </Link>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default NavigationBar;
