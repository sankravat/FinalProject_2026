import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, CameraOff, Play, Square, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Webcam = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, plastic: 0, paper: 0, glass: 0, metal: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
        
        toast({
          title: "Camera Started",
          description: "Ready for live waste detection",
        });
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      setIsDetecting(false);
      
      toast({
        title: "Camera Stopped",
        description: "Live detection ended",
      });
    }
  };

  const startDetection = () => {
  if (!isStreaming) {
    toast({
      title: "Camera not active",
      description: "Please start the camera first",
      variant: "destructive",
    });
    return;
  }

  setIsDetecting(true);

  const interval = setInterval(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // Draw current frame
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert frame to blob
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const response = await fetch("http://127.0.0.1:5000/detect", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Detection failed");

        const data = await response.json();

        if (data.detections) {
          setDetections(data.detections);

          // Draw detection boxes
          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          ctx.font = "16px Arial";
          ctx.fillStyle = "lime";
          data.detections.forEach((det: any) => {
            const [x1, y1, x2, y2] = det.bbox;
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            ctx.fillText(
              `${det.category} ${(det.confidence * 100).toFixed(1)}%`,
              x1,
              y1 > 20 ? y1 - 5 : y1 + 15
            );
          });
        }
      } catch (err) {
        console.error("Detection error:", err);
      }
    }, "image/jpeg");
  }, 1000); // capture every 1 sec

  (window as any).liveInterval = interval;
};

const stopDetection = () => {
  setIsDetecting(false);
  if ((window as any).liveInterval) {
    clearInterval((window as any).liveInterval);
  }
  toast({
    title: "Detection Stopped",
    description: "Real-time waste detection paused",
  });
};


 

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Live Waste Detection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time AI-powered waste classification using your webcam. 
            Start the camera and enable detection to see live results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera Section */}
          <div className="lg:col-span-2">
            <Card className="eco-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Live Camera Feed</span>
                </CardTitle>
                <CardDescription>
                  Camera stream with real-time waste detection overlay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Container */}
                <div className="relative aspect-video bg-muted/20 rounded-lg overflow-hidden">
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
                  
                  {/* Detection Overlays */}
                  {isDetecting && detections.map((detection) => (
                    <div
                      key={detection.id}
                      className="absolute border-2 border-primary bg-primary/10 rounded"
                      style={{
                        left: `${(detection.x / 640) * 100}%`,
                        top: `${(detection.y / 480) * 100}%`,
                        width: `${(detection.w / 640) * 100}%`,
                        height: `${(detection.h / 480) * 100}%`,
                      }}
                    >
                      <div className="absolute -top-8 left-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        {detection.category} ({(detection.confidence * 100).toFixed(0)}%)
                      </div>
                    </div>
                  ))}

                  {/* Status Overlay */}
                  {!isStreaming && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                      <div className="text-center">
                        <CameraOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">
                          Camera not active
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={isStreaming ? stopCamera : startCamera}
                    variant={isStreaming ? "destructive" : "default"}
                    className={isStreaming ? "" : "eco-button"}
                  >
                    {isStreaming ? (
                      <>
                        <CameraOff className="h-4 w-4 mr-2" />
                        Stop Camera
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Start Camera
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={isDetecting ? stopDetection : startDetection}
                    disabled={!isStreaming}
                    variant={isDetecting ? "secondary" : "outline"}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {isDetecting ? (
                      <>
                        <Square className="h-4 w-4 mr-2" />
                        Stop Detection
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Detection
                      </>
                    )}
                  </Button>

                  <Button variant="ghost" className="text-muted-foreground">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Live Results */}
          <div className="space-y-6">
            {/* Live Stats */}
            <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Detection Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-xl font-bold text-primary">{stats.total}</div>
                    <div className="text-xs text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-xl font-bold text-success">{stats.plastic}</div>
                    <div className="text-xs text-muted-foreground">Plastic</div>
                  </div>
                  <div className="text-center p-3 bg-accent/10 rounded-lg">
                    <div className="text-xl font-bold text-accent">{stats.paper}</div>
                    <div className="text-xs text-muted-foreground">Paper</div>
                  </div>
                  <div className="text-center p-3 bg-warning/10 rounded-lg">
                    <div className="text-xl font-bold text-warning">{stats.glass + stats.metal}</div>
                    <div className="text-xs text-muted-foreground">Glass/Metal</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Detections */}
            <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-lg">Current Detections</CardTitle>
              </CardHeader>
              <CardContent>
                {detections.length > 0 ? (
                  <div className="space-y-2">
                    {detections.map((detection) => (
                      <div
                        key={detection.id}
                        className="flex justify-between items-center p-2 bg-secondary/30 rounded"
                      >
                        <span className="text-sm font-medium">
                          {detection.category}
                        </span>
                        <span className="text-xs font-mono bg-primary/20 px-2 py-1 rounded">
                          {(detection.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">
                      {isDetecting ? "Scanning for waste..." : "Start detection to see live results"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webcam;