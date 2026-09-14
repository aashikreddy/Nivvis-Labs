import cv2
import os
import numpy as np

def process_directory(input_root, output_root):
    count = 0
    for root, dirs, files in os.walk(input_root):
        for file in files:
            ext = file.lower().split('.')[-1]
            if ext in ['jpg', 'jpeg', 'png']:
                input_path = os.path.join(root, file)
                
                # Determine relative path to recreate directory structure
                rel_path = os.path.relpath(root, input_root)
                target_dir = os.path.join(output_root, rel_path)
                
                if not os.path.exists(target_dir):
                    os.makedirs(target_dir)
                    
                output_path = os.path.join(target_dir, file)
                
                # Read the image
                img = cv2.imread(input_path)
                if img is None:
                    continue

                # 1. Convert the image from BGR to LAB color space
                lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
                
                # 2. Apply CLAHE ONLY to the L (Lightness) channel
                l, a, b = cv2.split(lab)
                clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
                cl = clahe.apply(l)
                
                # 3. Merge the channels back and convert to BGR
                limg = cv2.merge((cl, a, b))
                enhanced_bgr = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
                
                # 4. Apply an Unsharp Mask
                blurred = cv2.GaussianBlur(enhanced_bgr, (5, 5), 1.0)
                unsharp = cv2.addWeighted(enhanced_bgr, 1.5, blurred, -0.5, 0)
                
                # 5. Save the output image
                cv2.imwrite(output_path, unsharp)
                count += 1
                print(f"Processed: {output_path}")
                
    print(f"\nTotal images processed: {count}")

if __name__ == "__main__":
    input_root = r"C:\Users\aashi\OneDrive\Desktop\nivvis\src\Products\productimages"
    output_root = r"C:\Users\aashi\OneDrive\Desktop\nivvis\visually-enhanced-original-images"
    process_directory(input_root, output_root)
