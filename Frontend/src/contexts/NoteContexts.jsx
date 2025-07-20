import { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();
//note context provider
export const NoteContextProvider = ({ children }) => {

//the context itself... every components given the context will have access to the following functions, methods 
  const [notes, setNotes] = useState(() => {

    //for fetching the saved notes from local storage. the value fro the saved notes become the default value of the notes state. if there is no data in the local storage the logic returns an empty string
    if (typeof window !== 'undefined') {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    }
    return [];
  });

  // Save notes to localStorage whenever a new note is added ie. onchange of the array note
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // the method for adding a note to the array of notes 
  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now().toString() }]);
  };

  // this method edits notes 
  const updateNote = (id, newText) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, note: newText } : note
    ));
  };
//this method deletes a note by the filter operation which creates a new array excluding the note to be deleted
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  //this method toggles the value of completed from true to false and vice versa
  const toggleComplete = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, completed: !note.completed } : note
    ));
  };

  //ckanges notes color 
  const changeNoteColor = (id, color) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, color } : note
    ));
  };

  return (
    <NoteContext.Provider 
      value={{ 
        notes, 
        addNote, 
        updateNote, 
        deleteNote, 
        toggleComplete, 
        changeNoteColor 
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};