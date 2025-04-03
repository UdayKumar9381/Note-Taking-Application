export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div style={{
      maxHeight: '70vh',  // Adjust height dynamically for all screen sizes
      overflowY: 'auto',   // Enable scrolling
      padding: '15px',
      border: '1px solid rgb(216, 171, 171)',
      borderRadius: '8px',
      marginTop: '30px',
      backgroundColor: '#f9f9f9',
      width: '100%',
      maxWidth: '1200px',  // Prevents over-expansion on large screens
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'flex',
      flexDirection: 'column',
      scrollbarWidth: 'thin',
      scrollbarColor: '#a8a8a8 #f1f1f1'
    }}>
      {/* Title (Scrolls with notes) */}
      <h2 style={{ 
        margin: '0 0 20px 0',
        color: '#34495e',
        fontSize: '22px',
        backgroundColor: '#f9f9f9',
        padding: '5px 0',
        textAlign: 'center' // Centers the title on smaller screens
      }}>
        Your Notes
      </h2>

      {/* Responsive Grid for Notes */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',  // Responsive card width
        gap: '20px',
        width: '100%',  // Ensures it adapts to screen size
        padding: '5px'
      }}>
        {notes.length === 0 ? (
          <p style={{ 
            textAlign: 'center',
            color: '#7f8c8d',
            fontStyle: 'italic',
            padding: '20px'
          }}>
            No notes yet. Create your first note above!
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              wordBreak: 'break-word',
              maxWidth: '100%' // Ensures cards don’t overflow
            }}>
              <h3 style={{ 
                margin: '0 0 10px 0',
                color: '#2c3e50',
                fontSize: '18px',
                borderBottom: '1px solid #eee',
                paddingBottom: '8px'
              }}>
                {note.title}
              </h3>

              <p style={{ 
                color: '#34495e',
                margin: '0 0 20px 0',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: '1.5',
                maxHeight: '150px',
                overflowY: 'auto',
                paddingRight: '5px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#d4d4d4 transparent'
              }}>
                {note.content}
              </p>

              <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px',
                marginTop: 'auto'
              }}>
                <button 
                  onClick={() => onEdit(note)}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Edit
                </button>

                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this note?')) {
                      onDelete(note._id);
                    }
                  }}
                  style={{
                    padding: '8px 15px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
