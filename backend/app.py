from flask import Flask, request, jsonify
from ultralytics import YOLO
from flask_cors import CORS
import os
import cv2

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Create upload directory
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load your trained YOLOv11 model once
model = YOLO("best.pt")

@app.route("/detect", methods=["POST"])
def detect_waste():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    filename = file.filename.replace(" ", "_")  # remove spaces
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(image_path)

    # ✅ Validate image before processing
    img = cv2.imread(image_path)
    if img is None:
        return jsonify({"error": "Invalid or unreadable image"}), 400

    try:
        # Run inference
        results = model(image_path)

        detections = []
        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls)
                conf = float(box.conf)
                label = result.names[cls_id]
                detections.append({
                    "category": label,
                    "confidence": conf,
                    "bbox": box.xyxy[0].tolist()
                })

        return jsonify({
            "detections": detections,
            "totalItems": len(detections),
            "recyclable": len(detections),  # (Later you can add logic for recyclable vs non-recyclable)
            "processingTime": f"{results[0].speed['inference']:.2f} ms"
        })
    except Exception as e:
        return jsonify({"error": f"Detection failed: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
