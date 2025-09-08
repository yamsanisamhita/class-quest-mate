import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-education.jpg";

const AuthFlow = () => {
  const { user } = useUser();
  const [authMode, setAuthMode] = useState<'select' | 'signin' | 'signup'>('select');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  if (user) {
    return null; // User is authenticated, don't show auth flow
  }

  const handleRoleSelection = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
    setAuthMode('signin');
  };

  if (authMode === 'select') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">EduTrack</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your gateway to seamless learning and teaching
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card 
              className="cursor-pointer transition-all hover:scale-105 hover:shadow-glow bg-white/95 backdrop-blur"
              onClick={() => handleRoleSelection('student')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">I'm a Student</CardTitle>
                <CardDescription className="text-base">
                  Access courses, take quizzes, and track your learning progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Browse learning materials</li>
                  <li>• Take assignments and quizzes</li>
                  <li>• Track your progress</li>
                  <li>• Get AI-powered help</li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer transition-all hover:scale-105 hover:shadow-glow bg-white/95 backdrop-blur"
              onClick={() => handleRoleSelection('teacher')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">I'm a Teacher</CardTitle>
                <CardDescription className="text-base">
                  Create courses, manage students, and track their progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Upload learning materials</li>
                  <li>• Create quizzes and assignments</li>
                  <li>• Monitor student progress</li>
                  <li>• AI-powered quiz generation</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-white/80">
              Already have an account?{" "}
              <button 
                onClick={() => setAuthMode('signin')}
                className="text-white underline hover:text-white/90"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="text-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setAuthMode('select')}
            className="text-white hover:text-white/80"
          >
            ← Back to role selection
          </Button>
        </div>
        
        <div className="bg-white/95 backdrop-blur rounded-lg p-6">
          {authMode === 'signin' ? (
            <>
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                    dividerLine: "bg-gray-300",
                    dividerText: "text-gray-500",
                  }
                }}
                afterSignInUrl="/dashboard"
                signUpUrl="#"
              />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <SignUp 
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-primary hover:bg-primary/90",
                    socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                    dividerLine: "bg-gray-300",
                    dividerText: "text-gray-500",
                  }
                }}
                afterSignUpUrl="/dashboard"
                signInUrl="#"
              />
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button 
                    onClick={() => setAuthMode('signin')}
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;