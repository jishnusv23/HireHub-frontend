HireHub Interview Platform
HireHub is a cutting-edge platform designed to streamline the hiring process by connecting companies with developers through real-time technical interviews. Our platform allows interviewers to conduct collaborative coding interviews, assess candidates, and provide feedback in a single environment.

Table of Contents
Features
Technology Stack
Getting Started
Prerequisites
Installation
Usage
System Architecture
Contributing
License
Features
Real-time Collaboration: Conduct live coding interviews with integrated text chat, video/audio calls, and code collaboration using WebRTC.
Role-based Access: Role-specific dashboards for interviewers, interviewees, and admins, ensuring a seamless experience for each user.
Collaborative Coding: Integrated coding environment for conducting live technical assessments with real-time compilation.
Microservices Architecture: Scalability and maintainability powered by a microservices architecture using clean design principles.
Feedback System: Interviewers can provide structured feedback for each candidate after the interview.
Cloud-Native Deployment: Dockerized services, deployed on AWS with Kubernetes for dynamic scaling.
Technology Stack
Frontend: React.js, Redux, WebRTC
Backend: Node.js, Express.js, gRPC
Database: MongoDB, PostgreSQL (for user authentication)
Messaging: RabbitMQ
Containerization: Docker
Orchestration: Kubernetes (AWS)
Getting Started
Prerequisites
Node.js (v14 or later)
npm (v6 or later)
MongoDB (v4 or later)
Docker
Kubernetes CLI (kubectl)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/jishnusv23/hirehub-backend.git
Navigate to the project frontend directory:

bash
Copy code
cd hirehub-frontend
npm install
npm run dev
Usage
Access the application at http://localhost:5173 . Register as a candidate, interviewer, or admin to explore the platform's features and conduct interviews