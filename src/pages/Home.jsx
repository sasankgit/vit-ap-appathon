import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-purple-200">{'}'}</span>
              <h1 className="text-5xl font-bold drop-shadow-lg">StudyConnect</h1>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-100">
              Is a Premier Campus
              <br />
              Study Group
              <br />
              Platform
            </h2>

            <p className="bg-white/10 backdrop-blur-md border border-white/20 text-purple-100 p-6 rounded-2xl shadow-lg text-center font-medium">
              Connecting students across campus with matching subjects to form collaborative study groups with smart matching technology
            </p>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center gap-8">
            <Link to="/groups">
              <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg">
                GET STARTED
              </button>
            </Link>

            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg text-center">
                <div className="text-6xl font-bold text-white/90 drop-shadow">500+</div>
                <p className="text-sm mt-2 text-purple-200">Active Students</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-lg text-center">
                <div className="text-6xl font-bold text-white/90 drop-shadow">50+</div>
                <p className="text-sm mt-2 text-purple-200">Study Groups</p>
              </div>
            </div>

            {/* Student Avatars */}
            <div className="flex gap-4 mt-4">
              {Array(4)
                .fill('/sample.png')
                .map((src, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-inner"
                  >
                    <img src={src} alt="Student" className="w-10 h-10 rounded-full object-cover" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white/10 backdrop-blur-lg border-t border-white/20 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16 drop-shadow-lg">How It Works</h3>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center text-4xl">📚</div>
              <h4 className="text-2xl font-bold">Select Your Subjects</h4>
              <p className="text-purple-100">
                Choose the courses you're enrolled in. Our system tracks all subjects across your university.
              </p>
            </div>

            <div className="text-center space-y-4 bg-gradient-to-r from-yellow-400/30 to-pink-400/30 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <Link to="summarize">
                <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold hover:bg-white/30 transition">
                  Smart AI Summarizer
                </button>
              </Link>
            </div>

            <div className="text-center space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center text-4xl">🎯</div>
              <h4 className="text-2xl font-bold">Smart Matching</h4>
              <p className="text-purple-100">
                Find students with matching subjects and compatible study schedules for productive collaborations.
              </p>
            </div>

            <div className="text-center space-y-4 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-lg">
              <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center text-4xl">👥</div>
              <h4 className="text-2xl font-bold">Form Study Groups</h4>
              <p className="text-purple-100">
                Connect and collaborate in groups — share notes, discuss topics, and ace your exams together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="text-4xl font-bold text-center mb-16">Why Choose StudyConnect?</h3>
          <div className="space-y-8">
            {[
              ['🔗 Campus-Wide Connectivity', 'Connect with students from all departments, years, and programs who share your academic goals.'],
              ['⚡ Dynamic Attention System', 'Our attention system ensures you find motivated peers ready to study now.'],
              ['📖 Subject-Specific Focus', 'Find students tackling the same topics — share resources and grow together.'],
              ['🎓 Academic Excellence', 'Study groups lead to better academic performance. Join and boost your results.'],
              ['🔒 Safe & Verified', 'Only verified university students can join — ensuring a secure learning space.'],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-md hover:shadow-xl transition"
              >
                <h4 className="text-2xl font-bold mb-3">{title}</h4>
                <p className="text-purple-100">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/10 backdrop-blur-md py-20 border-t border-white/20">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {[
            ['95%', 'Student Satisfaction'],
            ['2500+', 'Study Sessions'],
            ['30+', 'Subjects Covered'],
            ['24/7', 'Platform Access'],
          ].map(([num, label]) => (
            <div key={num}>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-300 drop-shadow">
                {num}
              </div>
              <p className="mt-2 text-purple-200">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <h3 className="text-4xl font-bold text-center mb-16">What Students Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              ['Sarah M.', 'Computer Science, 3rd Year', 'I was struggling with Data Structures until I found a study group. Now my grades have improved!'],
              ['James K.', 'Biology, 2nd Year', 'The dynamic matching is amazing. Always find active students who really want to study!'],
            ].map(([name, course, feedback]) => (
              <div
                key={name}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src="/sample.png" alt={name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-lg">{name}</h5>
                    <p className="text-purple-200 text-sm">{course}</p>
                  </div>
                </div>
                <p className="text-purple-100 italic">"{feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white/10 backdrop-blur-md border-t border-white/20 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Study Experience?</h3>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Join hundreds of students already improving their learning with StudyConnect.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/collection"
              className="bg-white/20 backdrop-blur-md px-12 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition shadow-lg border border-white/20"
            >
              View Messages
            </Link>
            <Link
              to="/login"
              className="bg-purple-700/70 backdrop-blur-md px-12 py-4 rounded-full font-bold text-lg hover:bg-purple-600 transition border border-white/20"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-8 text-center text-purple-100">
        <p>© 2024 StudyConnect. Empowering students through collaboration.</p>
      </footer>
    </div>
  );
}
