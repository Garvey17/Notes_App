import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotesApp from './components/NotesApp';
import { NoteContextProvider } from "./contexts/NoteContexts";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <NoteContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<NotesApp />} />
        </Routes>
      </NoteContextProvider>
    </ThemeProvider>
  );
}

export default App;