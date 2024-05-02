# Smart Drilling Mini Project

# Description
Smart Drilling Mini Project is a full-stack web application developed using React, Material UI
for the frontend, and FastAPI with Tortoise ORM and Aerich migration tool for the backend.
MySQL is used as the database management system.

# Features

- **Add, Edit, and Delete Tasks**: Users can easily add, edit, and delete tasks from the application.
- **Filter Tasks by Completion Status**: The application allows users to filter tasks based on their completion status, making it easier to manage tasks.
- **User-Friendly Interface**: The frontend interface is designed with Material UI components, providing a sleek and intuitive user experience.
- **Efficient Backend**: Powered by FastAPI and Tortoise ORM, the backend ensures fast and reliable performance for handling tasks and data.
- **Secure Data Management**: MySQL is used as the database management system, ensuring secure storage and retrieval of task data.

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework for creating responsive and customizable UI components.

### Backend
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Tortoise ORM**: An easy-to-use asyncio ORM inspired by Django.
- **Aerich Migration Tool**: A database migration tool for Tortoise ORM (still didn't finish that part).
- **MySQL**: An open-source relational database management system.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ilyesBoukraa/smart_drilling_mini_project.git
    ```

2. Install frontend dependencies:
    ```bash
    cd smart_drilling_mini_project/frontend
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd smart_drilling_mini_project/backend
    pip install -r requirements.txt
    ```

4. Configure the database settings in the backend configuration files.

5. Run the frontend and backend servers:
   - **Frontend:**
     ```bash
     cd smart_drilling_mini_project/frontend
     npm start
     ```
   - **Backend:**
     ```bash
     cd smart_drilling_mini_project/backend
     uvicorn main:app --reload
     ```

## Usage
1. Run the frontend and backend servers:
   - **Frontend:**
     ```bash
     cd smart_drilling_mini_project/frontend
     npm start
     ```
   - **Backend:**
     ```bash
     cd smart_drilling_mini_project/backend
     uvicorn main:app --reload
     ```

2. Access the application at [http://localhost:3000](http://localhost:3000) in your web browser.
3. Use the interface to add, edit, and delete tasks.
4. Optionally, use the filter feature to view tasks based on completion status.
