import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Recycle, Award, Calendar, Clock } from 'lucide-react';

const Results = () => {
  // Mock analytics data
  const analyticsData = {
    totalProcessed: 1247,
    accuracy: 94.8,
    avgProcessingTime: 1.2,
    categoriesDetected: {
      plastic: 456,
      paper: 324,
      glass: 198,
      metal: 269
    },
    weeklyStats: [
      { day: 'Mon', detections: 45 },
      { day: 'Tue', detections: 62 },
      { day: 'Wed', detections: 38 },
      { day: 'Thu', detections: 71 },
      { day: 'Fri', detections: 56 },
      { day: 'Sat', detections: 29 },
      { day: 'Sun', detections: 34 }
    ],
    recentSessions: [
      { id: 1, type: 'Upload', items: 3, accuracy: 96.2, time: '2 hours ago' },
      { id: 2, type: 'Webcam', items: 7, accuracy: 93.8, time: '5 hours ago' },
      { id: 3, type: 'Upload', items: 2, accuracy: 98.1, time: '1 day ago' },
      { id: 4, type: 'Webcam', items: 12, accuracy: 91.4, time: '2 days ago' }
    ]
  };

  const totalItems = Object.values(analyticsData.categoriesDetected).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analytics and insights from your waste detection sessions. 
            Track performance, accuracy, and environmental impact.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="eco-card animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Processed</p>
                  <p className="text-3xl font-bold text-primary">{analyticsData.totalProcessed}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Accuracy Rate</p>
                  <p className="text-3xl font-bold text-success">{analyticsData.accuracy}%</p>
                </div>
                <Award className="h-8 w-8 text-success/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Processing</p>
                  <p className="text-3xl font-bold text-accent">{analyticsData.avgProcessingTime}s</p>
                </div>
                <Clock className="h-8 w-8 text-accent/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Items Recycled</p>
                  <p className="text-3xl font-bold text-primary">{totalItems}</p>
                </div>
                <Recycle className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Breakdown */}
          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Waste Category Distribution</span>
              </CardTitle>
              <CardDescription>
                Breakdown of detected waste materials by category
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(analyticsData.categoriesDetected).map(([category, count]) => {
                  const percentage = (count / totalItems) * 100;
                  const colors = {
                    plastic: 'bg-blue-500',
                    paper: 'bg-green-500',
                    glass: 'bg-purple-500',
                    metal: 'bg-orange-500'
                  };
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize text-foreground">
                          {category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {count} items ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-primary/10 rounded-lg">
                    <div className="text-xl font-bold text-primary">{totalItems}</div>
                    <div className="text-xs text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center p-3 bg-success/10 rounded-lg">
                    <div className="text-xl font-bold text-success">100%</div>
                    <div className="text-xs text-muted-foreground">Recyclable</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="eco-card animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Weekly Activity</span>
              </CardTitle>
              <CardDescription>
                Detection activity over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.weeklyStats.map((stat, index) => {
                  const maxDetections = Math.max(...analyticsData.weeklyStats.map(s => s.detections));
                  const percentage = (stat.detections / maxDetections) * 100;
                  
                  return (
                    <div key={stat.day} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-muted-foreground">
                        {stat.day}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-mono text-foreground w-8">
                            {stat.detections}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="eco-card lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Recent Detection Sessions</span>
              </CardTitle>
              <CardDescription>
                Latest waste detection activities and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.recentSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg hover-lift"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        session.type === 'Upload' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">
                          {session.type} Detection
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.items} items detected • {session.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-success">
                        {session.accuracy}%
                      </p>
                      <p className="text-xs text-muted-foreground">accuracy</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;