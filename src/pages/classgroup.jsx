import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase';
import {Link} from 'react-router-dom'

export default function GroupChat() {
  const [classGroups, setClassGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (username) {
      fetchClassGroups();
    }
  }, [username]);

  useEffect(() => {
    if (selectedGroup) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [selectedGroup]);

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
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedGroup) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('class_group_id', selectedGroup.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel(`messages:${selectedGroup.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `class_group_id=eq.${selectedGroup.id}`
        },
        (payload) => {
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedGroup || !username) return;

    setSendingMessage(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            class_group_id: selectedGroup.id,
            username: username,
            message: newMessage.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setShowUsernameModal(false);
    }
  };

  if (showUsernameModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-400 text-white flex items-center justify-center px-6">
        <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-300 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-4xl font-bold text-purple-200">{'}'}</span>
              <h1 className="text-3xl font-bold">StudyConnect</h1>
            </div>
            
            
            <h2 className="text-2xl font-bold mb-2">Enter Your Name</h2>
            <p className="text-purple-200">Choose a display name for the chat</p>
          </div>
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm border-2 border-purple-300 text-black placeholder-purple-200 focus:outline-none focus:border-white transition-colors mb-6"
          />
          
          <button
            onClick={handleUsernameSubmit}
            disabled={!username.trim()}
            className="w-full bg-white text-purple-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-400 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-purple-200">{'}'}</span>
            <h1 className="text-3xl font-bold">StudyConnect</h1>
          </div>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-2 border border-purple-300">
            <span className="text-purple-200">👤 {username}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
          {/* Class Groups List */}
          <div className="lg:col-span-1 bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-300 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Class Groups</h2>
            
            {loading ? (
              <div className="text-center text-purple-200">Loading groups...</div>
            ) : classGroups.length === 0 ? (
              <div className="text-center text-purple-200">No class groups yet</div>
            ) : (
              <div className="space-y-3">
                {classGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedGroup?.id === group.id
                        ? 'bg-white bg-opacity-20 border-2 border-white'
                        : 'bg-white bg-opacity-10 border-2 border-purple-300 hover:bg-opacity-15'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-1">{group.subject_name}</h3>
                    <p className="text-sm text-purple-200">
                      Room: {group.classroom_number}
                    </p>
                    <p className="text-xs text-purple-300 mt-1">
                      {group.building_id.replace('building-', 'Building ').toUpperCase()} - Floor {group.floor_number}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl border-2 border-purple-300 flex flex-col overflow-hidden">
            {selectedGroup ? (
              <>
                {/* Chat Header */}
                <div className="p-6 border-b border-purple-300">
                  <h2 className="text-2xl font-bold">{selectedGroup.subject_name}</h2>
                  <p className="text-purple-200 text-sm">
                    {selectedGroup.building_id.replace('building-', 'Building ').toUpperCase()} - 
                    Floor {selectedGroup.floor_number} - 
                    Room {selectedGroup.classroom_number}
                  </p>
                </div>
                

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-purple-200 mt-8">
                      <p className="text-lg">No messages yet</p>
                      <p className="text-sm">Be the first to start the conversation!</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                            msg.username === username
                              ? 'bg-white text-purple-900'
                              : 'bg-purple-500 bg-opacity-40 text-white'
                          }`}
                        >
                          <p className="font-semibold text-sm mb-1">
                            {msg.username === username ? 'You' : msg.username}
                          </p>
                          <p className="break-words">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.created_at).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-6 border-t border-purple-300">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={sendingMessage}
                      className="flex-1 px-4 py-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border-2 border-purple-300 text-black placeholder-purple-200 focus:outline-none focus:border-white transition-colors disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sendingMessage}
                      className="bg-white text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-purple-100 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sendingMessage ? '...' : 'Send'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-2xl font-bold mb-2">Select a Class Group</h3>
                  <p className="text-purple-200">Choose a group to start chatting</p>
                </div>
              </div>
              
             
            )}
          </div>
        </div>
      </div>
    </div>
  );
}