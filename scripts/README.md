# Image Optimization Pipeline

This pipeline statically generates highly-optimized WebP image derivatives for the Nivvis Labs React application.

## Purpose
To avoid relying on heavy images being dynamically compressed by third-party hosting providers or causing performance bottlenecks, this pipeline generates optimized production assets at development time. 
The generated derivatives are committed to Git, making the production build and deployment environments 100% independent of image processing tools.

## Source & Target Directories
- **UI Images (Originals):** `src/images/products/`
- **UI Images (Optimized):** `src/assets/optimized/ui/`
- **Product Images (Originals):** `src/Products/productimages/`
- **Product Images (Optimized):** `src/assets/optimized/products/`

## How to Run
Run the following command locally whenever source images are added or modified:
```bash
npm run optimize-images
```

## Settings & Dimensions
- **Format:** All derivatives are output in WebP format.
- **Quality:** WebP Quality is deterministically set to `80`.
- **UI Images (`img1`, `img4`):** Scaled to fit within a `1350x900` bounding box.
- **Product Thumbnails:** Scaled to fit within a `960x440` bounding box.
- **Aspect Ratio:** Strictly preserved for all images. No cropping occurs.

## Architecture Rules
1. **Originals are NEVER modified:** Source files in the repository are strictly treated as read-only.
2. **Sharp is Development-Only:** The `sharp` dependency is required locally but does NOT execute during `npm run build` or on the production server.
3. **Derivatives are Committed:** All files in `src/assets/optimized/` must be committed to source control.
4. **React Integration:** The frontend simply imports from `src/assets/optimized/` where applicable. (Note: Integration is planned for a subsequent phase).
