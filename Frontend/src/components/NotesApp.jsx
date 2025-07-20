import { useContext, useState, useEffect } from "react";
import {NoteContext} from "../contexts/NoteContexts"
import { useTheme } from "../contexts/ThemeContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "../lib/axios";

const NotesApp = () => {
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-white");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const { notes, addNote, updateNote, deleteNote, toggleComplete, changeNoteColor } = useContext(NoteContext);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate()

  // Enhanced color palette with dark mode variants
  const colors = [
    { light: "bg-white", dark: "bg-gray-800" },
    { light: "bg-red-100", dark: "bg-red-900" },
    { light: "bg-blue-100", dark: "bg-blue-900" },
    { light: "bg-green-100", dark: "bg-green-900" },
    { light: "bg-yellow-100", dark: "bg-yellow-900" },
    { light: "bg-purple-100", dark: "bg-purple-900" },
    { light: "bg-pink-100", dark: "bg-pink-900" }
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addNote({ 
      note: newNote, 
      color: selectedColor,
      completed: false,
      createdAt: new Date().toISOString()
    });
    setNewNote("");
    setSelectedColor("bg-white");
  };

  const startEditing = (note) => {
    setEditingId(note.id);
    setEditText(note.note);
  };

  const handleUpdate = (id) => {
    if (!editText.trim()) return;
    updateNote(id, editText);
    setEditingId(null);
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout', {}, {
        withCredentials: true,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  // Get the appropriate color class based on current theme
  const getColorClass = (color, isDark = theme === 'dark') => {
    const colorObj = colors.find(c => c.light === color);
    return isDark ? colorObj?.dark || 'bg-gray-700' : color;
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors duration-200`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Notes App</h1>
          <div className="flex justify-center items-center gap-2">

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <MoonIcon />
              ) : (
                <SunIcon />
              )}
            </button>
            <button 
            onClick={handleLogout}
            className="bg-amber-600 px-4 py-2 rounded-2xl hover:bg-amber-500 duration-200 ease-in-out font-bold">
              Log Out
            </button>
          </div>
        </div>
        
        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400 mb-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
            rows="3"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {colors.map((color) => (
              <button
                key={color.light}
                type="button"
                className={`w-8 h-8 rounded-full ${color.light} dark:${color.dark} border-2 ${selectedColor === color.light ? 'border-blue-500 dark:border-yellow-400' : 'border-transparent'} transition-colors duration-200`}
                onClick={() => setSelectedColor(color.light)}
              />
            ))}
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Add Note
          </button>
        </form>
        
        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div 
              key={note.id} 
              className={`${getColorClass(note.color)} p-4 rounded-lg shadow-md border-l-4 ${note.completed ? 'border-green-500 dark:border-green-400' : 'border-gray-300 dark:border-gray-600'} transition-colors duration-200`}
            >
              {editingId === note.id ? (
                <div className="mb-4">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200"
                    rows="3"
                  />
                  <button
                    onClick={() => handleUpdate(note.id)}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-3 py-1 rounded mr-2 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-3 py-1 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className={`text-gray-800 dark:text-gray-200 mb-3 ${note.completed ? 'line-through' : ''}`}>
                    {note.note}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleComplete(note.id)}
                  className={`text-xs px-2 py-1 rounded ${note.completed ? 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'} text-white transition-colors duration-200`}
                >
                  {note.completed ? 'Undo' : 'Complete'}
                </button>
                
                {editingId !== note.id && (
                  <button
                    onClick={() => startEditing(note)}
                    className="text-xs bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-2 py-1 rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                )}
                
                <button
                  onClick={() => deleteNote(note.id)}
                  className="text-xs bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-2 py-1 rounded transition-colors duration-200"
                >
                  Delete
                </button>
                
                <div className="flex flex-wrap gap-1 ml-auto">
                  {colors.map((color) => (
                    <button
                      key={color.light}
                      type="button"
                      className={`w-4 h-4 rounded-full ${color.light} dark:${color.dark} border ${note.color === color.light ? 'border-black dark:border-white' : 'border-transparent'} transition-colors duration-200`}
                      onClick={() => changeNoteColor(note.id, color.light)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Icon components
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700 dark:text-gray-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-yellow-300"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

export default NotesApp;