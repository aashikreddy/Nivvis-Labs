import React, { useState } from "react";
import Slider from "react-slick";
import { Modal } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const arrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 1,
  cursor: "pointer",
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  backgroundColor: "var(--color-surface)",
  boxShadow: "var(--shadow-sm)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid var(--color-border)",
  transition: "all var(--transition-fast)",
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Previous product image"
      className={className}
      style={{ ...arrowStyles, left: "0px" }}
      onClick={onClick}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-surface-muted)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-surface)")
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      aria-label="Next product image"
      className={className}
      style={{ ...arrowStyles, right: "0px" }}
      onClick={onClick}
      onMouseOver={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-surface-muted)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.backgroundColor = "var(--color-surface)")
      }
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
  dotsClass: "slick-dots custom-dots mt-3",
};

const ProductGallery = ({ images, productName }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="product-gallery-container position-relative px-4 pb-4 w-100">
      <Slider {...settings}>
        {images.map((imageObj, index) => {
          // Defensive fallback handling
          const optimizedSrc =
            imageObj?.optimized || imageObj?.original || imageObj;
          const originalSrc = imageObj?.original || imageObj;

          return (
            <div
              key={index}
              className="text-center d-flex justify-content-center align-items-center"
              style={{ height: "350px", outline: "none" }}
            >
              <button
                className="border-0 bg-transparent p-0 d-flex justify-content-center align-items-center w-100 h-100"
                onClick={() => handleImageClick(originalSrc)}
                aria-label={`View enlarged ${productName} image ${index + 1}`}
                title="Click to enlarge"
                style={{ minHeight: "350px" }}
              >
                {/* Stable container reserves 350px height before image loads */}
                <div
                  style={{
                    width: "100%",
                    height: "350px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={optimizedSrc}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    alt={`${productName} view ${index + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "350px",
                      objectFit: "contain",
                      transition: "transform var(--transition-fast)",
                    }}
                    className="img-fluid gallery-image"
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>
              </button>
            </div>
          );
        })}
      </Slider>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        centered
        className="product-image-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="visually-hidden">
            {productName} — Product Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center p-4">
          <img
            src={currentImage}
            alt={`Enlarged ${productName}`}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "80vh", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductGallery;
