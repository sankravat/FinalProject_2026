import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, CameraOff, Play, Square, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Known 22 classes from the model
const KNOWN_CLASSES = [
  "battery", "can", "cardboard_bowl", "cardboard_box",
  "chemical_plastic_bottle", "chemical_plastic_gallon",
  "chemical_spray_can", "light_bulb", "paint_bucket",
  "plastic_bag", "plastic_bottle", "plastic_bottle_cap",
  "plastic_box", "plastic_cultery", "plastic_cup",
  "plastic_cup_lid", "reuseable_paper", "scrap_paper",
  "scrap_plastic", "snack_bag", "stick", "straw"
];


const Webcam = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Start Webcam
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);

        toast({
          title: "Camera Started",
          description: "Ready for detection",
        });
      }
    } catch (err) {
      toast({
        title: "Camera Error",
        description: "Enable camera permission",
        variant: "destructive",
      });
    }
  };

  // Stop Webcam
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
    stopDetection();
  };

  // Start Object Detection
  const startDetection = () => {
    if (!isStreaming) {
      toast({
        title: "Camera not active",
        description: "Start camera first",
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);
    setMessage("Scanning...");

    const interval = setInterval(async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas frame → Blob
      canvas.toBlob(
        async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");

          try {
            const response = await fetch(
              "https://basusan-recyclevision-backend.hf.space/detect",
              {
                method: "POST",
                body: formData,
              }
            );


            const data = await response.json();
            const detected = data?.detections || [];

            setDetections(detected);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (detected.length === 0) {
              setMessage("No objects found");
              return;
            }

            // Draw boxes
            detected.forEach((det: any) => {
              const [x1, y1, x2, y2] = det.bbox;
              const cat = det.category;
              const conf = (det.confidence * 100).toFixed(1);

              const isKnown = KNOWN_CLASSES.includes(cat);

              ctx.strokeStyle = isKnown ? "lime" : "red";
              ctx.fillStyle = isKnown ? "lime" : "red";
              ctx.lineWidth = 2;

              ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
              ctx.fillText(`${cat} ${conf}%`, x1, y1 > 20 ? y1 - 5 : y1 + 15);
            });

            // Feedback message
            if (detected.some((d: any) => !KNOWN_CLASSES.includes(d.category))) {
              setMessage("Unknown object detected");
            } else {
              setMessage(`Detected ${detected.length} items`);
            }
          } catch (err) {
            console.log(err);
          }
        },
        "image/jpeg",
        0.4 // compression helps speed
      );
    }, 800);

    (window as any).liveInterval = interval;
  };

  // Stop Detection
  const stopDetection = () => {
    setIsDetecting(false);
    setDetections([]);
    setMessage("");

    if ((window as any).liveInterval) {
      clearInterval((window as any).liveInterval);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Live Waste Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time detection using YOLOv11
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Camera */}
          <div className="lg:col-span-2">
            <Card className="eco-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Live Camera Feed</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                  />

                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  />

                  {/* Show status message */}
                  {isDetecting && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-3 py-1 text-sm rounded">
                      {message}
                    </div>
                  )}

                  {/* Overlay when camera off */}
                  {!isStreaming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                      <CameraOff className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={isStreaming ? stopCamera : startCamera}
                    variant={isStreaming ? "destructive" : "default"}
                  >
                    {isStreaming ? "Stop Camera" : "Start Camera"}
                  </Button>

                  <Button
                    onClick={isDetecting ? stopDetection : startDetection}
                    disabled={!isStreaming}
                    variant={isDetecting ? "secondary" : "outline"}
                  >
                    {isDetecting ? "Stop Detection" : "Start Detection"}
                  </Button>

                  <Button variant="ghost" className="text-muted-foreground">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Results Sidebar */}
          <Card className="eco-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-lg">Detection Results</CardTitle>
            </CardHeader>
            <CardContent>
              {detections.length > 0 ? (
                <div className="space-y-2">
                  {detections.map((det, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-secondary/30 rounded"
                    >
                      <span className="text-sm font-medium">{det.category}</span>
                      <span className="text-xs font-mono bg-primary/20 px-2 py-1 rounded">
                        {(det.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-sm">
                  {isDetecting ? "Scanning..." : "Start detection"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Webcam;
