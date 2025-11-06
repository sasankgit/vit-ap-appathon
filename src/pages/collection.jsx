import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function ClassGroupCreator() {
  const [step, setStep] = useState(1);
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [facultyName, setFacultyName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const buildings = [
    { id: 'AB1', name: 'AB1', icon: '🏛️' },
    { id: 'CB', name: 'CB', icon: '🏢' },
    { id: 'AB2', name: 'AB2', icon: '🏛️' }
    
  ];

  const slots = [
    { id: 'A1', name: 'A1 (08:00-08:50)', time: '08:00-08:50' },
    { id: 'F1', name: 'F1 (08:00-08:50)', time: '08:00-08:50' },
    { id: 'D1', name: 'D1 (08:00-08:50)', time: '08:00-08:50' },
    { id: 'TB1', name: 'TB1 (08:00-08:50)', time: '08:00-08:50' },
    { id: 'TG1', name: 'TG1 (08:00-08:50)', time: '08:00-08:50' },
    { id: 'A2', name: 'A2 (08:51-09:40)', time: '08:51-09:40' },
    { id: 'F2', name: 'F2 (08:51-09:40)', time: '08:51-09:40' },
    { id: 'D2', name: 'D2 (08:51-09:40)', time: '08:51-09:40' },
    { id: 'TB2', name: 'TB2 (08:51-09:40)', time: '08:51-09:40' },
    { id: 'TG2', name: 'TG2 (08:51-09:40)', time: '08:51-09:40' },
    { id: 'B1', name: 'B1 (09:50-10:40)', time: '09:50-10:40' },
    { id: 'G1', name: 'G1 (09:50-10:40)', time: '09:50-10:40' },
    { id: 'E1', name: 'E1 (09:50-10:40)', time: '09:50-10:40' },
    { id: 'TC1', name: 'TC1 (09:50-10:40)', time: '09:50-10:40' },
    { id: 'TAA1', name: 'TAA1 (09:50-10:40)', time: '09:50-10:40' },
    { id: 'B2', name: 'B2 (10:41-11:30)', time: '10:41-11:30' },
    { id: 'G2', name: 'G2 (10:41-11:30)', time: '10:41-11:30' },
    { id: 'E2', name: 'E2 (10:41-11:30)', time: '10:41-11:30' },
    { id: 'TC2', name: 'TC2 (10:41-11:30)', time: '10:41-11:30' },
    { id: 'TAA2', name: 'TAA2 (10:41-11:30)', time: '10:41-11:30' },
    { id: 'C1', name: 'C1 (11:40-12:30)', time: '11:40-12:30' },
    { id: 'TE1', name: 'TE1 (11:40-12:30)', time: '11:40-12:30' },
    { id: 'TD1', name: 'TD1 (11:40-12:30)', time: '11:40-12:30' },
    { id: 'TBB1', name: 'TBB1 (11:40-12:30)', time: '11:40-12:30' },
    { id: 'C2', name: 'C2 (12:31-13:20)', time: '12:31-13:20' },
    { id: 'TE2', name: 'TE2 (12:31-13:20)', time: '12:31-13:20' },
    { id: 'TD2', name: 'TD2 (12:31-13:20)', time: '12:31-13:20' },
    { id: 'TBB2', name: 'TBB2 (12:31-13:20)', time: '12:31-13:20' },
    { id: 'V3', name: 'V3 (14:10-16:00)', time: '14:10-16:00' },
    { id: 'V4', name: 'V4 (16:10-18:00)', time: '16:10-18:00' },
    { id: 'V5', name: 'V5 (18:10-20:00)', time: '18:10-20:00' },
    { id: 'V6', name: 'V6 (20:10-22:00)', time: '20:10-22:00' },
    { id: 'V7', name: 'V7 (08:00-09:40)', time: '08:00-09:40' },
    { id: 'V8', name: 'V8 (09:50-11:30)', time: '09:50-11:30' },
    { id: 'V9', name: 'V9 (11:40-13:20)', time: '11:40-13:20' },
    { id: 'V10', name: 'V10 (14:10-15:50)', time: '14:10-15:50' },
    { id: 'V11', name: 'V11 (16:00-17:40)', time: '16:00-17:40' },
    { id: 'V12', name: 'V12 (17:50-19:30)', time: '17:50-19:30' }
  ];

  const handleBuildingSelect = (buildingId) => {
    setSelectedBuilding(buildingId);
    setStep(2);
    setMessage('');
  };

  const handleSlotSelect = (slotId) => {
    setSelectedSlot(slotId);
    setStep(3);
    setMessage('');
  };

  const handleCreateGroup = async () => {
    if (!facultyName.trim() || !roomNumber.trim()) {
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
            slot: selectedSlot,
            faculty_name: facultyName.trim(),
            room_number: roomNumber.trim(),
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) throw error;

      setMessage('Class group created successfully! 🎉');
      
      setTimeout(() => {
        setStep(1);
        setSelectedBuilding('');
        setSelectedSlot('');
        setFacultyName('');
        setRoomNumber('');
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
      setSelectedSlot('');
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
          <p className="text-purple-200">Select building, slot, and add class details</p>
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
              <span className="text-sm mt-2">Slot</span>
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
              <h3 className="text-2xl font-bold text-center mb-8">Select Your Building</h3>
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
              <h3 className="text-2xl font-bold text-center mb-8">Select Time Slot</h3>
              <div className="grid md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto px-2">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot.id)}
                    className="bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-300 hover:border-white hover:bg-opacity-40 transition-all transform hover:scale-105"
                  >
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                      {slot.id}
                    </div>
                    <h4 className="text-sm">{slot.time}</h4>
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
                ← Back to Slots
              </button>
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-center mb-8">Enter Class Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-purple-200">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                      placeholder="e.g., Dr. Smith, Prof. Kumar"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border-2 border-purple-300 text-black placeholder-purple-200 focus:outline-none focus:border-white transition-colors"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-purple-200">
                      Room Number
                    </label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
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
                      <span className="font-semibold">{selectedBuilding}</span>
                    </p>
                    <p>
                      <span className="text-purple-200">Slot:</span>{' '}
                      <span className="font-semibold">
                        {slots.find(s => s.id === selectedSlot)?.name}
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
                <span>Select the building where your class is located (SMV, SJT, CDMM, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <span>Choose your class time slot (A1, B2, V3, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <span>Enter your faculty name and room number to create a study group</span>
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