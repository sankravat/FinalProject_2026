import { Button } from '@/components/ui/button';
import { ArrowRight, Camera, Upload, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-waste.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Recyclable waste materials"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Waste Detection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Smart Waste
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Classification
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Revolutionary YOLOv8-powered system for real-time identification and classification 
            of recyclable waste materials. Making waste management smarter, one detection at a time.
          </p>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 animate-slide-up">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%+</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Waste Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
              <div className="text-sm text-muted-foreground">Detection Speed</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Link to="/upload">
              <Button className="eco-button group">
                <Upload className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Upload Image
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/webcam">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg shadow-eco hover-lift">
                <Camera className="h-5 w-5 mr-2" />
                Live Detection
              </Button>
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12 animate-fade-in">
            {['Paper', 'Glass', 'Metal', 'Plastic'].map((category) => (
              <div
                key={category}
                className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-full text-sm font-medium text-secondary-foreground hover-scale"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse-eco opacity-20">
        <div className="w-16 h-16 bg-gradient-primary rounded-full"></div>
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse-eco opacity-20" style={{ animationDelay: '1s' }}>
        <div className="w-12 h-12 bg-gradient-eco rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;