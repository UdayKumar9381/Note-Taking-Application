import { useState, useEffect } from 'react';

function NoteForm({ onSubmit, initialData = { title: '', content: '' } }) {
  const [note, setNote] = useState(initialData);

  useEffect(() => {
    setNote(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(note);
    if (!initialData._id) { // Only reset if not in edit mode
      setNote({ title: '', content: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({...note, title: e.target.value})}
        placeholder="Title"
        required
      />
      <textarea
        value={note.content}
        onChange={(e) => setNote({...note, content: e.target.value})}
        placeholder="Content"
        required
      />
      <button type="submit">
        {initialData._id ? 'Update Note' : 'Save Note'}
      </button>
      {initialData._id && (
        <button type="button" onClick={() => setNote({ title: '', content: '' })}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;