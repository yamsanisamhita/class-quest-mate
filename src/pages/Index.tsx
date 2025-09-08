import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center text-white">
        <h1 className="mb-4 text-6xl font-bold">Welcome to EduTrack</h1>
        <p className="text-xl opacity-90">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
