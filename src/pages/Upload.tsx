import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, Image, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResults(null);
    }
  };



  const handleAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // this field name must match Flask's expectation

    try {
      const response = await fetch(
        "https://basusan-recyclevision-backend.hf.space/detect",
        {
          method: "POST",
          body: formData,
        }
      );


      const data = await response.json();

      if (response.ok) {
        setResults(data);
        toast({
          title: "Analysis Complete!",
          description: "Waste classification successful",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: data.error || "Backend returned an error.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Cannot reach backend.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };





  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Upload Image for Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload an image containing waste materials and our AI will identify and classify
            recyclable items with high precision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="eco-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UploadIcon className="h-5 w-5 text-primary" />
                <span>Image Upload</span>
              </CardTitle>
              <CardDescription>
                Select an image file to analyze for recyclable waste materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Area */}
              <div
                onClick={triggerFileSelect}
                className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-smooth"
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-card"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click to select a different image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Image className="h-16 w-16 text-primary/50 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">
                        Click to upload image
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, and other image formats
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Button */}
              <Button
                onClick={handleAnalysis}
                disabled={!selectedFile || isAnalyzing}
                className="w-full eco-button"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Analyze Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span>Analysis Results</span>
              </CardTitle>
              <CardDescription>
                Detected waste items and classification details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {results.totalItems}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Items Found
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {results.recyclable}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Recyclable
                      </div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {results.processingTime}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Process Time
                      </div>
                    </div>
                  </div>

                  {/* Detection Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Detected Items:</h4>
                    {results.detections.map((detection: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg"
                      >
                        <span className="font-medium">{detection.category}</span>
                        <span className="text-sm font-mono bg-primary/10 px-2 py-1 rounded">
                          {(detection.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;