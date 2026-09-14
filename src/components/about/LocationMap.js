import React from "react";
import { Container } from "react-bootstrap";

const LocationMap = () => {
  return (
    <Container className="container-nivvis section-nivvis mb-5 pb-5">
      <h2 className="text-h2 text-primary fw-bold mb-4 text-center">
        Our Location
      </h2>
      <div
        className="rounded overflow-hidden shadow-sm border border-border"
        style={{ height: "400px" }}
      >
        <iframe
          title="Nivvis Labs Registered Office - Sion, Mumbai"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15086.208940866503!2d72.8550!3d19.0390!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d9e69e4a3b%3A0x6b64d081f21db59!2sSion%2C%20Mumbai%2C%20Maharashtra%20400022!5e0!3m2!1sen!2sin!4v1728209762316!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </Container>
  );
};

export default LocationMap;
