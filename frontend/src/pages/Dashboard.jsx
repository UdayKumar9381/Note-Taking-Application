import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import NoteList from '../components/Notes/NoteList';
import NoteForm from '../components/Notes/NoteForm';

export default function Dashboard() {
  const [userId, setUserId] = useState('');
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = useCallback(async (userEmail) => {
    try {
      const response = await api.get('/notes', {
        params: { user_id: userEmail }
      });
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        setUserId(tokenData.sub);
        fetchNotes(tokenData.sub);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate, fetchNotes]);

  const handleCreateNote = async (noteData) => {
    try {
      await api.post('/notes', { 
        ...noteData, 
        user_id: userId 
      });
      fetchNotes(userId);
    } catch (err) {
      console.error('Failed to create note:', err);
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    try {
      await api.put(`/notes/${noteId}`, updatedData);
      fetchNotes(userId);
      setEditingNote(null);
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/${noteId}`);
      fetchNotes(userId);
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2c3e50',
        marginBottom: '30px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px'
      }}>
        Notes Dashboard
      </h1>
      
      <NoteForm 
        onSubmit={editingNote ? 
          (data) => handleUpdateNote(editingNote._id, data) : 
          handleCreateNote}
        initialData={editingNote || { title: '', content: '' }}
      />
      
      <NoteList 
        notes={notes} 
        onEdit={setEditingNote}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}