'use client';

import { useState, useEffect } from 'react';

export default function Challenge() {
  const [completed, setCompleted] = useState<boolean[]>(Array(21).fill(false));
  // const [streak, setStreak] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const savedProgress = localStorage.getItem('challengeProgress');
    if (savedProgress) {
      const progressArray = JSON.parse(savedProgress);
      setCompleted(progressArray);
      // setStreak(progressArray.filter(Boolean).length);
    }
  }, []);

  const toggleDay = (index: number) => {
    const updated = [...completed];
    updated[index] = !updated[index];
    setCompleted(updated);
    localStorage.setItem('challengeProgress', JSON.stringify(updated));

    const newStreak = updated.filter(Boolean).length;
    // setStreak(newStreak);
    updateMessage(newStreak);
  };

  const updateMessage = (streak: number) => {
    if (streak === 21) {
      setMessage('🎉 Congratulations! You completed the 21-day challenge! Keep up the great work! 🚀');
    } else if (streak % 5 === 0 && streak !== 0) {
      setMessage(`🔥 Amazing! You've completed ${streak} days! Keep pushing forward!`);
    } else {
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">21 Days Challenge</h1>
      {message && <p className="text-xl font-semibold text-green-600 mb-3">{message}</p>}
      <div className="grid grid-cols-4 gap-4 max-w-md">
        {completed.map((isDone, index) => (
          <button
            key={index}
            className={`p-4 w-20 h-20 border-2 rounded-lg text-lg font-semibold shadow-md transition-all ${
              isDone ? 'bg-green-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => toggleDay(index)}
          >
             Day {index + 1} 
          </button>
        ))}
      </div>
    </div>
  );
}