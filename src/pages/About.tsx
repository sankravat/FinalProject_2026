import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, GraduationCap, Target, Lightbulb, Award, MapPin } from 'lucide-react';
import wasteSegregationImage from '@/assets/waste-segregation.jpg';
import guide from "@/assets/guide.jpeg";
import teamPhoto from "@/assets/teamPhoto.jpeg";


const About = () => {
  const teamMembers = [
    {
      name: "Basavaraj Sankravat",
      expertise: ["YOLOv11", "Computer Vision", "Deep Learning"],
    },
    {
      name: "Akshay Reddy",

      expertise: ["Python", "Flask API Development", "Model Integration"],
    },
    {
      name: "Basavaraj S",

      expertise: ["React", "Typescript", "UI/UX Design", "Web Development"],
    },
    {
      name: "Bharat",
      role: "Data Analysis",
      expertise: ["Dataset collection", "Model Training", "Performance Optimization"],
    }
  ];

  const objectives = [
    {
      icon: Target,
      title: "Real-time Detection",
      description: "Build YOLOv8-powered system for instant waste classification"
    },
    {
      icon: Award,
      title: "High Accuracy",
      description: "Achieve 95%+ precision across all recyclable waste categories"
    },
    {
      icon: Lightbulb,
      title: "Software-only Solution",
      description: "Deploy without external hardware dependencies"
    },
    {
      icon: Users,
      title: "User-friendly Interface",
      description: "Intuitive web interface for seamless interaction"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About RecycleVision
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary AI-powered waste detection system developed by engineering students
            to make waste management smarter and more efficient.
          </p>
        </div>

        {/* Project Overview */}
        <div className="mb-16 animate-slide-up">
          <Card className="eco-card">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                <span>Project Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Manual segregation of recyclable waste is labor-intensive, inconsistent, and not scalable
                for modern waste management systems. Our project bridges this gap using cutting-edge YOLOv8
                technology for real-time, software-based waste classification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Key Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Real-time waste detection via webcam</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Multi-classes classification (Paper, Glass, Metal, Plastic)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Comprehensive analytics dashboard</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>User-friendly web interface</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Impact Goals</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Improve waste segregation efficiency</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Reduce manual labor requirements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Enable scalable waste management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Support environmental sustainability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Objectives */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 animate-fade-in">
            Project Objectives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <Card
                  key={index}
                  className="eco-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {objective.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {objective.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Institution */}
        <Card className="eco-card animate-fade-in">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
                <MapPin className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                BLDEA's Dr P G Halakatti College of Engineering and Technology
              </h3>
              <p className="text-lg text-muted-foreground mb-4">Vijaypur</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This project is developed as part of our engineering curriculum, combining academic
                learning with practical application to address real-world environmental challenges.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Project Guide */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 animate-fade-in">
            Under the Guidance Of
          </h2>

          <Card className="eco-card animate-slide-up">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">

                {/* Guide Image */}
                <div className="flex-shrink-0">
                  <img
                    src={guide}
                    alt="Project Guide"
                    className="w-48 h-48 object-cover rounded-full shadow-lg border-4 border-primary/20"
                  />
                </div>

                {/* Info */}
                <div className="text-center md:text-left space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">
                    DR. MAHESH NAGARAL
                  </h3>

                  <p className="text-lg text-muted-foreground">
                    Our respected project guide, whose expertise, guidance, and continuous mentorship
                    played a crucial role in shaping this project and enhancing the quality of our work.
                  </p>

                  <div className="flex justify-center md:justify-start space-x-3 pt-2">

                    <Badge variant="secondary">Project Guide</Badge>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>


        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 animate-fade-in">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="eco-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-foreground">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {member.role}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Group Photo Section */}
        <div className="my-20 flex flex-col items-center animate-slide-up">
          <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-primary/30 bg-secondary/20 hover:scale-105 transition-transform duration-300 ease-in-out">
            <img
              src={teamPhoto}
              alt="Team Members"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-base font-medium text-foreground mt-4">
            Team RecycleVision
          </p>

          <p className="text-sm text-muted-foreground">
            Academic Year 2025-26
          </p>
        </div>








        {/* Waste Segregation Education */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 animate-fade-in">
            Why Waste Segregation Matters
          </h2>
          <Card className="eco-card animate-slide-up">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={wasteSegregationImage}
                    alt="Waste segregation bins"
                    className="rounded-lg shadow-card w-full"
                  />
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-foreground">
                    Environmental Impact
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Proper waste segregation is crucial for environmental sustainability.
                      When waste is correctly sorted, recycling becomes more efficient and
                      reduces landfill burden.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span><strong>Plastic:</strong> Takes 450+ years to decompose</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span><strong>Paper:</strong> Can be recycled up to 7 times</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span><strong>Glass:</strong> 100% recyclable indefinitely</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span><strong>Metal:</strong> Retains properties when recycled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;