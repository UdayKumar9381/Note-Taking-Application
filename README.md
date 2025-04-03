# Note-Taking Application

![Screenshot 2025-04-03 181738](https://github.com/user-attachments/assets/77bb114a-959b-4e97-bd42-be7eae8e9021)


A full-stack note-taking application built with React, FastAPI, and MongoDB that allows users to create, edit, and organize notes with secure authentication.

## Features

- 📝 Create, edit, and delete notes
- 🔐 JWT authentication (login/register)
- 🎨 Responsive design with beautiful note cards
- 🔄 Real-time updates
- 📱 Mobile-friendly interface

## Tech Stack

**Frontend:**
- React.js
- React Router
- Axios for API calls
- Context API for state management
- CSS-in-JS for styling

**Backend:**
- FastAPI (Python)
- MongoDB (Database)
- Motor (Async MongoDB driver)
- JWT (Authentication)

## Installation

### Prerequisites
- Node.js (v14+)
- Python (3.7+)
- MongoDB Atlas account or local MongoDB instance

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
5. Update `.env` with your MongoDB URI and JWT secret

6. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your backend API URL

5. Run the frontend:
   ```bash
   npm start
   ```

## Project Structure

```
note-taking-app/
├── backend/                  # FastAPI backend
│   ├── app/                  # Application code
│   │   ├── __init__.py
│   │   ├── main.py           # API routes
│   │   ├── models.py         # DB models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── auth.py           # Auth logic
│   │   └── database.py       # DB connection
│   ├── requirements.txt      # Python dependencies
│   └── .env                  # Environment config
│
frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Notes/
│   │   │   ├── NoteList.jsx
│   │   │   └── NoteForm.jsx
│   │   └── Layout/
│   │       └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── auth.js
│   ├── App.jsx
│   ├── index.jsx
│   └── App.css
```

## API Documentation

The backend provides a RESTful API with the following endpoints:

- `POST /register` - User registration
- `POST /login` - User login
- `GET /notes` - Get user's notes
- `POST /notes` - Create new note
- `PUT /notes/{id}` - Update note
- `DELETE /notes/{id}` - Delete note

Interactive API documentation available at `http://localhost:8000/docs` when the backend is running.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

For questions or feedback, please open an issue on GitHub or contact:

Name - Narapureddy Uday Kumar
Email - udayreddi28@gmail.com
Project Link: 

## Screenshots

![Login Screen] ![Screenshot 2025-04-03 181753](https://github.com/user-attachments/assets/cb65f051-9875-4abc-87ef-ea7d954ffa28)
![Register Screen] ![Screenshot 2025-04-03 181802](https://github.com/user-attachments/assets/7fa1b6e5-a5e6-47ba-8f00-8b39ae88e6d1)
![Dasboard Screen] ![Screenshot 2025-04-03 182526](https://github.com/user-attachments/assets/f6fa6e52-f3d9-4cb0-8f0e-6acf388a0f86)
![Tab Screen] ![Screenshot 2025-04-03 182545](https://github.com/user-attachments/assets/dd526e83-e5c8-40f5-b6ca-cff521953f08)
