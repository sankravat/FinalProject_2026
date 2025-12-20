import os
import cv2
import numpy as np
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

# ---------------------------
# Flask App Setup
# ---------------------------
app = Flask(__name__)
CORS(app)

# ---------------------------
# Model Configuration
# ---------------------------
MODEL_PATH = "best.pt"
GOOGLE_DRIVE_FILE_ID = "1Bg1nI62iq6yp38cXYZC6UktJS13I7-IU"

# ---------------------------
# Download model if missing
# ---------------------------
def download_model():
    if os.path.exists(MODEL_PATH):
        print("✅ YOLO model already exists")
        return

    print("⬇️ Downloading YOLO model from Google Drive...")

    url = f"https://drive.google.com/uc?id={GOOGLE_DRIVE_FILE_ID}"
    response = requests.get(url, stream=True)

    with open(MODEL_PATH, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)

    print("✅ Model downloaded successfully")

# Download before loading
download_model()

# ---------------------------
# Load YOLO model (CPU safe)
# ---------------------------
model = YOLO(MODEL_PATH)
model.fuse()  # reduce memory usage

# ---------------------------
# Health Check Route (REQUIRED)
# ---------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "RecycleVision backend running",
        "endpoint": "/detect",
        "model_loaded": True
    })

# ---------------------------
# Detection Route
# ---------------------------
@app.route("/detect", methods=["POST"])
def detect():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        image_bytes = file.read()

        img = cv2.imdecode(
            np.frombuffer(image_bytes, np.uint8),
            cv2.IMREAD_COLOR
        )

        if img is None:
            return jsonify({"error": "Invalid or unreadable image"}), 400

        # YOLO inference (CPU optimized)
        results = model(
            img,
            conf=0.4,
            iou=0.5,
            device="cpu",
            verbose=False
        )

        detections = []

        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                x1, y1, x2, y2 = map(float, box.xyxy[0])

                detections.append({
                    "category": model.names[cls_id],
                    "confidence": conf,
                    "bbox": [x1, y1, x2, y2]
                })

        return jsonify({
            "detections": detections,
            "totalItems": len(detections),
            "recyclable": len(detections)
        })

    except Exception as e:
        # ALWAYS return JSON (never HTML)
        return jsonify({
            "error": "Detection failed",
            "details": str(e)
        }), 500

# ---------------------------
# Run App (HF uses port 7860)
# ---------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7860)
