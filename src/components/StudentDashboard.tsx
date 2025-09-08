import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, Target, PlayCircle, FileText, Video, Download } from "lucide-react";
import { useState } from "react";
import mathImage from "@/assets/material-math.jpg";
import physicsImage from "@/assets/material-physics.jpg";
import chemistryImage from "@/assets/material-chemistry.jpg";
import programmingImage from "@/assets/material-programming.jpg";

const StudentDashboard = () => {
  const [studentProgress] = useState({
    completedQuizzes: 8,
    totalQuizzes: 12,
    averageScore: 85,
    completedCourses: 3,
    totalCourses: 5,
  });

  const recentQuizzes = [
    { id: 1, title: "Mathematics - Algebra Basics", score: 90, status: "completed", date: "2024-01-15" },
    { id: 2, title: "Physics - Newton's Laws", score: 78, status: "completed", date: "2024-01-14" },
    { id: 3, title: "Chemistry - Periodic Table", score: 0, status: "pending", date: "2024-01-16" },
  ];

  const learningMaterials = [
    { id: 1, title: "Advanced Calculus", type: "pdf", uploadedBy: "Dr. Smith", date: "2024-01-10", image: mathImage, downloadUrl: "/materials/calculus.pdf" },
    { id: 2, title: "Physics Lab Manual", type: "pdf", uploadedBy: "Prof. Johnson", date: "2024-01-12", image: physicsImage, downloadUrl: "/materials/physics-lab.pdf" },
    { id: 3, title: "Chemistry Lecture Series", type: "video", uploadedBy: "Dr. Brown", date: "2024-01-14", image: chemistryImage, downloadUrl: "/materials/chemistry-video.mp4" },
    { id: 4, title: "Mathematics Problem Set", type: "text", uploadedBy: "Prof. Davis", date: "2024-01-15", image: programmingImage, downloadUrl: "/materials/math-problems.pdf" },
  ];

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const handleDownload = (material: any) => {
    // Create a temporary anchor element for download
    const link = document.createElement('a');
    link.href = material.downloadUrl;
    link.download = material.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Track your learning progress and access materials</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.completedQuizzes}/{studentProgress.totalQuizzes}</div>
            <Progress 
              value={(studentProgress.completedQuizzes / studentProgress.totalQuizzes) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.averageScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Great performance!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentProgress.completedCourses}/{studentProgress.totalCourses}</div>
            <Progress 
              value={(studentProgress.completedCourses / studentProgress.totalCourses) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground mt-1">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recent Quizzes
            </CardTitle>
            <CardDescription>Your latest quiz attempts and scores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{quiz.title}</h4>
                  <p className="text-sm text-muted-foreground">{quiz.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  {quiz.status === "completed" ? (
                    <Badge className={`${getProgressColor(quiz.score)} text-white`}>
                      {quiz.score}%
                    </Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                  <Button 
                    size="sm" 
                    variant={quiz.status === "completed" ? "outline" : "education"}
                  >
                    {quiz.status === "completed" ? "Review" : "Start"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Learning Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Materials
            </CardTitle>
            <CardDescription>Recent uploads from your teachers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={material.image} 
                      alt={material.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="absolute -top-1 -right-1 p-1 bg-primary rounded-full">
                      {getTypeIcon(material.type)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{material.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      by {material.uploadedBy} • {material.date}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDownload(material)}
                >
                  {material.type === "video" ? (
                    <>
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Watch
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </>
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;