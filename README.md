This is a full-stack task management application built using the MERN stack, featuring a robust REST API and complete CRUD functionality. The app is designed to help users manage tasks efficiently across various stages of progress.
Key Features:
Authentication: Secure user registration and login with passwords hashed using bcrypt and stored in the database.
Task Management: Users can create, edit, and delete tasks. Each task includes:
Heading
Sub-tasks count
Due date
Priority (High, Moderate, Low)
Assigned user (optional)
Task Sections: Tasks are organized into four categories:
Backlog
To-do
In-progress
Done
Analytics Dashboard:
Total number of tasks
Count of tasks by due date
Distribution of tasks across sections
Priority-based breakdown (High, Moderate, Low)
User Settings: Allows users to update their name or password securely.
Tech Stack:
Frontend: React.js (with functional components and hooks)
Backend: Node.js with Express.js
Database: MongoDB (with Mongoose)
Authentication: JSON Web Tokens (JWT), bcrypt for password hashing
API: RESTful architecture for user and task operations
