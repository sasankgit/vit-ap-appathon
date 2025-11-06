import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function ClassGroupCreator() {
  const [step, setStep] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [classroomNumber, setClassroomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const buildings = [
    { id: 'building-a', name: 'Academic Building 1', icon: '🏛️' },
    { id: 'building-b', name: 'Central Block', icon: '🏢' },
    { id: 'building-c', name: 'Academic Building 2', icon: '🏫' }
  ];

  const floors = [
    { id: 'floor-1', name: 'Ground Floor', number: 1 },
    { id: 'floor-2', name: 'First Floor', number: 2 },
    { id: 'floor-3', name: 'Second Floor', number: 3 }
  ];

  const handleBuildingSelect = (buildingId) => {
    setSelectedBuilding(buildingId);
    setStep(2);
    setMessage('');
  };

  const handleFloorSelect = (floorNumber) => {
    setSelectedFloor(floorNumber);
    setStep(3);
    setMessage('');
  };

  const handleCreateGroup = async () => {
    if (!subjectName.trim() || !classroomNumber.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await supabase
        .from('class_groups')
        .insert([
          {
            building_id: selectedBuilding,
            floor_number: selectedFloor,
            subject_name: subjectName.trim(),
            classroom_number: classroomNumber.trim(),
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      setMessage('Class group created successfully! 🎉');
      
      setTimeout(() => {
        setStep(1);
        setSelectedBuilding('');
        setSelectedFloor('');
        setSubjectName('');
        setClassroomNumber('');
        setMessage('');
      }, 2000);

    } catch (error) {
      console.error('Error creating class group:', error);
      setMessage('Error creating class group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      setSelectedFloor('');
    } else if (step === 2) {
      setStep(1);
      setSelectedBuilding('');
    }
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-400 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl font-bold text-purple-200">{'}'}</span>
            <h1 className="text-4xl font-bold">StudyConnect</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Create Your Class Group</h2>
          <p className="text-purple-200">Select building, floor, and add class details</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-purple-900' : 'bg-purple-400 text-white'} font-bold transition-colors`}>
                1
              </div>
              <span className="text-sm mt-2">Building</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-white' : 'bg-purple-400'} transition-colors`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-purple-900' : 'bg-purple-400 text-white'} font-bold transition-colors`}>
                2
              </div>
              <span className="text-sm mt-2">Floor</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-white' : 'bg-purple-400'} transition-colors`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-purple-900' : 'bg-purple-400 text-white'} font-bold transition-colors`}>
                3
              </div>
              <span className="text-sm mt-2">Details</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center mb-8">Select Your Academic Building</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {buildings.map((building) => (
                  <button
                    key={building.id}
                    onClick={() => handleBuildingSelect(building.id)}
                    className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 hover:border-white hover:bg-opacity-40 transition-all transform hover:scale-105"
                  >
                    <div className="text-6xl mb-4">{building.icon}</div>
                    <h4 className="text-xl font-bold">{building.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <button
                onClick={handleBack}
                className="text-purple-200 hover:text-white flex items-center gap-2 mb-4"
              >
                ← Back to Buildings
              </button>
              <h3 className="text-2xl font-bold text-center mb-8">Select Floor</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    onClick={() => handleFloorSelect(floor.number)}
                    className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 hover:border-white hover:bg-opacity-40 transition-all transform hover:scale-105"
                  >
                    <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {floor.number}
                    </div>
                    <h4 className="text-xl font-bold">{floor.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <button
                onClick={handleBack}
                className="text-purple-200 hover:text-white flex items-center gap-2 mb-4"
              >
                ← Back to Floors
              </button>
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-8">Enter Class Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-purple-200">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      placeholder="e.g., Data Structures, Calculus, Physics"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border-2 border-purple-300 text-black placeholder-purple-200 focus:outline-none focus:border-white transition-colors"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-purple-200">
                      Classroom Number
                    </label>
                    <input
                      type="text"
                      value={classroomNumber}
                      onChange={(e) => setClassroomNumber(e.target.value)}
                      placeholder="e.g., 101, A-205, Lab-3"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border-2 border-purple-300 text-black placeholder-purple-200 focus:outline-none focus:border-white transition-colors"
                      disabled={loading}
                    />
                  </div>

                  {message && (
                    <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-500 bg-opacity-30' : 'bg-red-500 bg-opacity-30'} border border-white`}>
                      <p className="text-center font-semibold">{message}</p>
                    </div>
                  )}

                  <button
                    onClick={handleCreateGroup}
                    disabled={loading}
                    className="w-full bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating Group...' : 'Create Class Group'}
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-purple-300">
                  <h4 className="text-sm font-semibold mb-3 text-purple-200">Selected:</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-purple-200">Building:</span>{' '}
                      <span className="font-semibold">
                        {buildings.find(b => b.id === selectedBuilding)?.name}
                      </span>
                    </p>
                    <p>
                      <span className="text-purple-200">Floor:</span>{' '}
                      <span className="font-semibold">
                        {floors.find(f => f.number === selectedFloor)?.name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
            <h4 className="text-xl font-bold mb-4">💡 How It Works</h4>
            <ul className="space-y-3 text-purple-100">
              <li className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <span>Select the building where your class is located</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <span>Choose the floor where your classroom is situated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <span>Enter your subject name and classroom number to create a study group</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✨</span>
                <span>Once created, students in the same class can find and join your group!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}