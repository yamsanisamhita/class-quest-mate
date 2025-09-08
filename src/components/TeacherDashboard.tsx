import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Target, Plus, Upload, Edit, Trash2, BarChart3 } from "lucide-react";
import { useState } from "react";

const TeacherDashboard = () => {
  const [materials, setMaterials] = useState([
    { id: 1, title: "Advanced Calculus", type: "PDF", uploadDate: "2024-01-10", downloads: 24 },
    { id: 2, title: "Physics Lab Manual", type: "PDF", uploadDate: "2024-01-12", downloads: 18 },
    { id: 3, title: "Chemistry Lecture Series", type: "Video", uploadDate: "2024-01-14", downloads: 31 },
  ]);

  const studentProgress = [
    { id: 1, name: "Alice Johnson", completedQuizzes: 8, totalQuizzes: 10, averageScore: 92 },
    { id: 2, name: "Bob Smith", completedQuizzes: 6, totalQuizzes: 10, averageScore: 78 },
    { id: 3, name: "Carol Davis", completedQuizzes: 9, totalQuizzes: 10, averageScore: 88 },
    { id: 4, name: "David Wilson", completedQuizzes: 5, totalQuizzes: 10, averageScore: 65 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return "bg-success";
    if (score >= 70) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-success bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Manage your courses and monitor student progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="education">
            <Upload className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
          <Button variant="success">
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              2 new this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Created</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Class Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">81%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Progress
            </CardTitle>
            <CardDescription>Overview of student performance across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentProgress.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Completed: {student.completedQuizzes}/{student.totalQuizzes} quizzes
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getScoreBadge(student.averageScore)} text-white`}>
                      {student.averageScore}%
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Materials Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Materials
            </CardTitle>
            <CardDescription>Manage your uploaded course materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{material.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {material.type} • Uploaded {material.uploadDate} • {material.downloads} downloads
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add New Material
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;