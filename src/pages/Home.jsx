import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-400 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-purple-200">{'}'}</span>
              <h1 className="text-5xl text-shadow-blue-50 font-bold">StudyConnect</h1>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              Is a Premier Campus
              <br />
              Study Group
              <br />
              Platform
            </h2>
            <p class="bg-purple-600 text-purple-400 p-6 rounded-lg shadow-lg text-center font-medium">
  Connecting students across campus with matching subjects to form collaborative study groups with smart matching technology
</p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-8">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
              GET STARTED
            </button>
            
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 border border-purple-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-900 bg-clip-text text-transparent">
                  500+
                </div>
                <p className="text-sm mt-2 text-purple-200">Active Students</p>
              </div>
              
              <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 border border-purple-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-900 bg-clip-text text-transparent">
                  50+
                </div>
                <p className="text-sm mt-2 text-purple-200">Study Groups</p>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="w-12 h-12 bg-purple-300 rounded-full flex items-center justify-center">
                <img src="/sample.png" alt="Student" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center">
                <img src="/sample.png" alt="Student" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="w-12 h-12 bg-red-300 rounded-full flex items-center justify-center">
                <img src="/sample.png" alt="Student" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                <img src="/sample.png" alt="Student" className="w-10 h-10 rounded-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-400 bg-opacity-20 backdrop-blur-lg rounded-xl border border-blue-300 shadow-lg py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-4xl">📚</span>
              </div>
              <h4 className="text-2xl font-bold">Select Your Subjects</h4>
              <p className="text-purple-200">
                Choose the courses you're currently enrolled in and need help with. Our system tracks all subjects across your university.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-pink-500 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
              <h4 className="text-2xl font-bold">Smart Matching</h4>
              <p className="text-purple-200">
                Our intelligent algorithm finds students with matching subjects and compatible study schedules, ensuring productive collaborations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-purple-400 rounded-2xl mx-auto flex items-center justify-center">
                <span className="text-4xl">👥</span>
              </div>
              <h4 className="text-2xl font-bold">Form Study Groups</h4>
              <p className="text-purple-200">
                Connect with matched students and create or join study groups. Collaborate, share notes, and ace your exams together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-16">Why Choose StudyConnect?</h3>
            
            <div className="space-y-8">
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
                <h4 className="text-2xl font-bold mb-4">🔗 Campus-Wide Connectivity</h4>
                <p className="text-purple-100">
                  Break out of your immediate circle and connect with students from different departments, years, and programs who share your academic interests. Expand your network while improving your grades.
                </p>
              </div>

              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
                <h4 className="text-2xl font-bold mb-4">⚡ Dynamic Attention System</h4>
                <p className="text-purple-100">
                  Our unique attention mechanism ensures you're matched with students who are actively seeking study partners right now. No more ghost members or inactive groups - connect with motivated peers ready to study.
                </p>
              </div>

              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
                <h4 className="text-2xl font-bold mb-4">📖 Subject-Specific Focus</h4>
                <p className="text-purple-100">
                  Whether it's Calculus, Organic Chemistry, or Software Engineering, find students struggling with or excelling in the same topics. Share resources, discuss concepts, and prepare for exams together.
                </p>
              </div>

              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
                <h4 className="text-2xl font-bold mb-4">🎓 Academic Excellence</h4>
                <p className="text-purple-100">
                  Studies show that students who participate in study groups perform better academically. Our platform makes it easy to find the right study partners, schedule sessions, and track your progress together.
                </p>
              </div>

              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
                <h4 className="text-2xl font-bold mb-4">🔒 Safe & Verified</h4>
                <p className="text-purple-100">
                  Only verified students from your university can join. Connect with confidence knowing everyone on the platform is a legitimate member of your academic community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black bg-opacity-30 backdrop-blur-md py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                95%
              </div>
              <p className="mt-2 text-purple-200">Student Satisfaction</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                2500+
              </div>
              <p className="mt-2 text-purple-200">Study Sessions</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                30+
              </div>
              <p className="mt-2 text-purple-200">Subjects Covered</p>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="mt-2 text-purple-200">Platform Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">What Students Say</h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/sample.png" alt="Student" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h5 className="font-bold text-lg">Sarah M.</h5>
                  <p className="text-purple-200 text-sm">Computer Science, 3rd Year</p>
                </div>
              </div>
              <p className="text-purple-100">
                "I was struggling with Data Structures until I found a study group through this app. Now we meet twice a week and my grades have improved dramatically!"
              </p>
            </div>

            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
              <div className="flex items-center gap-4 mb-4">
                <img src="/sample.png" alt="Student" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h5 className="font-bold text-lg">James K.</h5>
                  <p className="text-purple-200 text-sm">Biology, 2nd Year</p>
                </div>
              </div>
              <p className="text-purple-100">
                "The dynamic matching is incredible. I always find active students who actually want to study, not just chat. Best academic tool I've used!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Buttons */}
      <div className="bg-black bg-opacity-40 backdrop-blur-md py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Study Experience?</h3>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Join hundreds of students already using StudyConnect to improve their grades and make meaningful academic connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/signup" 
              className="bg-white text-purple-900 px-12 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors shadow-lg"
            >
              Sign Up Now
            </Link>
            
            <Link 
              to="/login" 
              className="bg-purple-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-purple-700 transition-colors border-2 border-white shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-50 py-8">
        <div className="container mx-auto px-6 text-center text-purple-200">
          <p>© 2024 StudyConnect. Empowering students through collaboration.</p>
        </div>
      </footer>
    </div>
  );
}