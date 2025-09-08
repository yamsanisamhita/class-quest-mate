import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import StudentDashboard from "@/components/StudentDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import Chatbot from "@/components/Chatbot";
import FloatingChatButton from "@/components/FloatingChatButton";

const Dashboard = () => {
  const { user } = useUser();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const userRole = user?.publicMetadata?.role as string || 'student';

  const handleSearch = (query: string) => {
    // Mock search functionality
    const mockCourses = [
      { id: 1, title: "Advanced Mathematics", description: "Calculus and Linear Algebra", instructor: "Dr. Smith" },
      { id: 2, title: "Physics Fundamentals", description: "Classical Mechanics and Thermodynamics", instructor: "Prof. Johnson" },
      { id: 3, title: "Chemistry Basics", description: "Atomic Structure and Chemical Bonding", instructor: "Dr. Brown" },
      { id: 4, title: "Computer Science", description: "Data Structures and Algorithms", instructor: "Prof. Davis" },
    ];

    const filtered = mockCourses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onSearch={handleSearch} />
      
      <main className="pt-4">
        {userRole === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
      </main>

      {!isChatOpen && (
        <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      )}
      
      <Chatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;