import HeroSection from '../components/HeroSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle, Eye, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-time Detection",
      description: "AI-powered waste classification using advanced computer vision",
      link: "/webcam"
    },
    {
      icon: Recycle,
      title: "Smart Classification",
      description: "Accurate identification of paper, glass, metal, and plastic waste",
      link: "/upload"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and performance metrics",
      link: "/results"
    },
    {
      icon: Users,
      title: "Educational Impact",
      description: "Learn about waste segregation and environmental sustainability",
      link: "/about"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience cutting-edge waste detection technology with comprehensive 
              analytics and educational resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="eco-card group animate-slide-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="mb-6">
                      {feature.description}
                    </CardDescription>
                    <Link to={feature.link}>
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground border-primary/30">
                        Explore
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with state-of-the-art technologies for reliable and accurate waste detection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="eco-card animate-slide-up">
              <CardHeader>
                <CardTitle className="text-center text-2xl">YOLOv8</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Cutting-edge object detection model for real-time waste classification
                </p>
                <div className="text-3xl font-bold text-primary mb-2">95%+</div>
                <p className="text-sm text-muted-foreground">Detection Accuracy</p>
              </CardContent>
            </Card>

            <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">React + TypeScript</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Modern web interface with responsive design and seamless user experience
                </p>
                <div className="text-3xl font-bold text-success mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Responsive Design</p>
              </CardContent>
            </Card>

            <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Python Backend</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Robust API integration for seamless communication with AI models
                </p>
                <div className="text-3xl font-bold text-accent mb-2">&lt;2s</div>
                <p className="text-sm text-muted-foreground">Response Time</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
            Try our AI-powered waste detection system and contribute to a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
                Upload Image
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/webcam">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Live Detection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
