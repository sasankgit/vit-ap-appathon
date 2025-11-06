import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export default function ChatSummarizer() {
  const [classGroups, setClassGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [error, setError] = useState('');
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    fetchClassGroups();
  }, []);

  const fetchClassGroups = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('class_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClassGroups(data || []);
    } catch (error) {
      console.error('Error fetching class groups:', error);
      setError('Failed to load class groups');
    } finally {
      setLoading(false);
    }
  };

  const fetchLastMessages = async (groupId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('class_group_id', groupId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const generateSummary = async (messages) => {
    if (messages.length === 0) {
      return "No messages found in this group chat yet. Start a conversation to get a summary!";
    }

    const chatText = messages
      .reverse()
      .map(msg => `${msg.username}: ${msg.message}`)
      .join('\n');

    const prompt = `Please provide a concise summary of the following chat conversation between students. Focus on the main topics discussed, key points, questions asked, and any important information shared. Keep it brief and organized.

Chat conversation:
${chatText}

Summary:`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate summary from Gemini API');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary. Please try again.');
    }
  };

  const handleSelectGroup = async (group) => {
    setSelectedGroup(group);
    setSummary('');
    setError('');
    setSummarizing(true);

    try {
      const messages = await fetchLastMessages(group.id);
      setLastMessages(messages.reverse());
      
      const summaryText = await generateSummary(messages);
      setSummary(summaryText);
    } catch (err) {
      setError(err.message || 'Failed to generate summary');
    } finally {
      setSummarizing(false);
    }
  };

  const handleRefreshSummary = async () => {
    if (!selectedGroup) return;
    
    setSummary('');
    setError('');
    setSummarizing(true);

    try {
      const messages = await fetchLastMessages(selectedGroup.id);
      setLastMessages(messages.reverse());
      
      const summaryText = await generateSummary(messages);
      setSummary(summaryText);
    } catch (err) {
      setError(err.message || 'Failed to generate summary');
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-400 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl font-bold text-purple-200">{'}'}</span>
            <h1 className="text-4xl font-bold">StudyConnect</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Chat Summarizer</h2>
          <p className="text-purple-200">AI-powered summaries of your class discussions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Class Groups Selection */}
          <div className="lg:col-span-1">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>📚</span> Select Class
              </h3>
              
              {loading ? (
                <div className="text-center text-purple-200 py-8">Loading classes...</div>
              ) : classGroups.length === 0 ? (
                <div className="text-center text-purple-200 py-8">
                  <p>No class groups yet</p>
                  <p className="text-sm mt-2">Create a class group to get started</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {classGroups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => handleSelectGroup(group)}
                      disabled={summarizing}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedGroup?.id === group.id
                          ? 'bg-white bg-opacity-20 border-2 border-white'
                          : 'bg-white bg-opacity-10 border-2 border-purple-300 hover:bg-opacity-15'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <h4 className="font-bold text-lg mb-1">{group.subject_name}</h4>
                      <p className="text-sm text-purple-200">
                        Room: {group.classroom_number}
                      </p>
                      <p className="text-xs text-purple-300 mt-1">
                        {group.building_id.replace('building-', 'Building ').toUpperCase()} - 
                        Floor {group.floor_number}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Summary Display */}
          <div className="lg:col-span-2">
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 min-h-[600px] flex flex-col">
              {!selectedGroup ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <h3 className="text-2xl font-bold mb-2">Select a Class to Summarize</h3>
                    <p className="text-purple-200">Choose a class group to get an AI-powered summary of recent discussions</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6 pb-6 border-b border-purple-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{selectedGroup.subject_name}</h3>
                        <p className="text-purple-200 text-sm">
                          Last 5 messages summary
                        </p>
                      </div>
                      <button
                        onClick={handleRefreshSummary}
                        disabled={summarizing}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        🔄 Refresh
                      </button>
                    </div>
                  </div>

                  {/* Summary Content */}
                  <div className="flex-1 overflow-y-auto">
                    {summarizing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="animate-spin text-5xl mb-4">⚡</div>
                          <p className="text-xl font-semibold">Generating Summary...</p>
                          <p className="text-purple-200 text-sm mt-2">AI is analyzing the conversation</p>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="bg-red-500 bg-opacity-30 border-2 border-red-400 rounded-xl p-6 text-center">
                        <div className="text-4xl mb-3">⚠️</div>
                        <p className="font-semibold text-lg mb-2">Error</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    ) : summary ? (
                      <div className="space-y-6">
                        <div className="bg-white bg-opacity-10 rounded-xl p-6 border border-purple-300">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">✨</span>
                            <h4 className="text-xl font-bold">AI Summary</h4>
                          </div>
                          <div className="text-red-900 whitespace-pre-wrap leading-relaxed">
                            {summary}
                          </div>
                        </div>

                        {lastMessages.length > 0 && (
                          <div className="bg-white bg-opacity-10 rounded-xl p-6 border border-purple-300">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl">💬</span>
                              <h4 className="text-xl font-bold">Recent Messages</h4>
                            </div>
                            <div className="space-y-3">
                              {lastMessages.map((msg, index) => (
                                <div 
                                  key={msg.id || index}
                                  className="bg-purple-500 bg-opacity-30 rounded-lg p-3 border border-purple-400"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm">{msg.username}</span>
                                    <span className="text-xs text-purple-300">
                                      {new Date(msg.created_at).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-purple-100">{msg.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border border-purple-300">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span> How It Works
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-purple-100">
              <div>
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="font-semibold mb-1">Select a Class</p>
                <p>Choose any class group from the sidebar to analyze its recent chat history</p>
              </div>
              <div>
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="font-semibold mb-1">AI Analysis</p>
                <p>Gemini AI processes the last 5 messages and identifies key topics and important points</p>
              </div>
              <div>
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="font-semibold mb-1">Get Summary</p>
                <p>Receive a concise summary highlighting main discussions, questions, and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}