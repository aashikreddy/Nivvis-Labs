import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { products } from './productsData';

import ProductGallery from '../components/products/ProductGallery';
import ProductInformation from '../components/products/ProductInformation';
import ProductNotFound from '../components/products/ProductNotFound';

function ProductDetails() {
  const { productName } = useParams();
  
  // Find product by slug to preserve existing routing compatibility
  const product = products.find(p => p.slug === productName);

  React.useEffect(() => {
    if (product) {
      document.title = `${product.displayName || product.name} | Nivvis Labs`;
      const metaDesc = document.querySelector('meta[name="description"]');
      const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
      if (metaDesc && product.description) {
        metaDesc.setAttribute('content', product.description.substring(0, 160) + (product.description.length > 160 ? '...' : ''));
      }
      return () => {
        document.title = 'Nivvis Labs';
        if (metaDesc && originalDesc) {
          metaDesc.setAttribute('content', originalDesc);
        }
      };
    }
  }, [product]);
  
  const images = product?.images?.gallery || [];
  const hasImages = images.length > 0;

  if (!product) {
    return <ProductNotFound productName={productName} />;
  }

  return (
    <main className="bg-background-nivvis flex-grow-1 py-5">
      <Container className="container-nivvis mb-5">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4 pb-2 border-bottom">
          <ol className="breadcrumb mb-2 text-small">
            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-primary fw-medium">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/product" className="text-decoration-none text-primary fw-medium">Products</Link></li>
            <li className="breadcrumb-item active text-text-secondary" aria-current="page">{product.displayName || product.name}</li>
          </ol>
        </nav>

        <Card className="border-0 shadow-sm bg-surface-nivvis overflow-hidden radius-lg">
          <Row className="g-0">
            {/* Gallery Column */}
            <Col lg={6} className="bg-surface-muted p-4 p-md-5 d-flex align-items-center justify-content-center border-end-lg">
              {hasImages ? (
                <div className="w-100" style={{ maxWidth: '500px' }}>
                  <ProductGallery images={images} productName={product.displayName || product.name} />
                </div>
              ) : (
                <div className="text-center text-text-muted p-5 bg-surface-nivvis rounded border w-100">
                  Image not available
                </div>
              )}
            </Col>
            
            {/* Information Column */}
            <Col lg={6} className="p-4 p-md-5">
              <ProductInformation product={product} />
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
}

export default ProductDetails;