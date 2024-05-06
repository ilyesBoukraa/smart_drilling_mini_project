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
- **Aerich Migration Tool**: A database migration tool for Tortoise ORM.
- **MySQL**: An open-source relational database management system.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ilyesBoukraa/smart_drilling_mini_project.git
   ```

2. Install frontend dependencies:
<<<<<<< HEAD

   - Navigate to the frontend and then install the dependencies

=======
    - Navigate to the frontend  and then install the dependencies
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
   ```bash
    cd smart_drilling_mini_project/frontend
    npm install
   ```

<<<<<<< HEAD
3. Install backend dependencies:

   - Navigate back to the smart_drilling_mini_project directory. and then navigate to the backend directory, and after that you can install all the dependencies

=======
4. Install backend dependencies:
    - Navigate back to the smart_drilling_mini_project directory. and then navigate to the backend directory, and after that you can install all the dependencies
   
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
   ```bash
    cd ..
    cd backend
    pip install -r requirements.txt
   ```

## Usage
<<<<<<< HEAD

1. **Initialize the Virtual Environment**:

=======
   
1. **Initialize the Virtual Environment**:
   
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
   Before running the frontend and backend servers, you need to initialize the virtual environment. Navigate to the project directory and run the following command:

   #### Linux / Ubuntu:

   ```bash
   source venv/bin/activate
   ```

   #### Windows (PowerShell):

   ```powershell
   venv\Scripts\Activate
   ```

   #### Windows (Command Prompt):

   ```cmd
   venv\Scripts\activate
   ```

2. **Set up the environment variable for Tortoise ORM**:

   #### Linux / Ubuntu / macOS:

   ```bash
   export TORTOISE_DATABASE_URL='mysql://<usernaem>:<password>@<address>/<database_name>'
   ```

   #### Windows (PowerShell):

   ```bash
   $env:TORTOISE_DATABASE_URL='mysql://<usernaem>:<password>@<address>/<database_name>'
   ```

   ### Windows (Command Prompt):

   ```bash
   set TORTOISE_DATABASE_URL=mysql://<usernaem>:<password>@<address>/<database_name>
   ```

<<<<<<< HEAD
=======
    ```cmd
    venv\Scripts\activate
    ```
2. **Set up the environment variable for Tortoise ORM**:
    #### Linux / Ubuntu / macOS:
    
    ```bash
    export TORTOISE_DATABASE_URL='mysql://<usernaem>:<password>@<address>/<database_name>'
    ```
    #### Windows (PowerShell):
    
    ``` bash
    $env:TORTOISE_DATABASE_URL='mysql://<usernaem>:<password>@<address>/<database_name>'
    ```
    ### Windows (Command Prompt):
    ``` bash 
    set TORTOISE_DATABASE_URL=mysql://<usernaem>:<password>@<address>/<database_name>
    ```


>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
3. **Database Migrations with Aerich**:

   Aerich is a migration tool for Tortoise ORM that allows you to manage database schema changes and apply them to your database. Here's how you can use Aerich with your Smart Drilling Mini Project:

   - **Initialization**: Before using Aerich, you need to initialize it with your Tortoise ORM configuration.
<<<<<<< HEAD

   - First make sure you are in the smart_drilling_mini_project directory if you are inside any of the backend/frontend folders you can go back using:

   ```bash
     cd ..
   ```

   then run the following command:

   ```bash
   aerich init -t backend.config.TORTOISE_ORM
   ```

   > Notes:
   > This command will initialize Aerich with your Tortoise ORM configuration.
   > Make sure to run this command only once at the beginning of your project setup.
   > Make sure that you already **activated the venv** before running this command.
=======
   
   -  First make sure you are in the smart_drilling_mini_project directory if you are inside any of the backend/frontend folders you can go back using:
    ```bash
      cd ..
    ```
     then run the following command:
     ```bash
     aerich init -t backend.config.TORTOISE_ORM
     ```
    > Notes:
    > This command will initialize Aerich with your Tortoise ORM configuration.
    > Make sure to run this command only once at the beginning of your project setup.
    > Make sure that you already **activated the venv** before running this command.
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31

   - **Initialize Database**: After initializing Aerich, you need to initialize the database. Run the following command:
     ```bash
     aerich init-db
     ```
   - **Creating Migrations**: After initializing Aerich, you can create migrations to represent database schema changes. For example, if you modify your models in `models.py`, you can generate a migration to apply those changes. Run the following command:

     ```bash
     aerich migrate
     ```

   - **Applying Migrations**: Once you have created migrations, you need to apply them to your database to update the schema. Use the following command to apply pending migrations:
     ```bash
     aerich upgrade
     ```
<<<<<<< HEAD
   - **Rollback**: once you applied the migrations if you find that you made some mistakes you can just rollback using:
     ```bash
     aerich downgrade
     ```

4. **Run the Frontend and Backend Servers**:
   - **Backend:**
     ```bash
     cd smart_drilling_mini_project
     uvicorn backend.main:app
     ```
   - **Frontend:**
     First you need to run that using another terminal. assuming you are in the smart_drilling_mini_project directory, you need to navigate to the frontend dir first.
=======
    - **Rollback**: once you applied the migrations if you find that you made some mistakes you can just rollback using:
         ```bash
         aerich downgrade
         ```

3. **Run the Frontend and Backend Servers**:
   - **Backend:**
     ```bash
     cd smart_drilling_mini_project
     uvicorn backend.main:app 
     ```
   - **Frontend:**
     First you need to run that using another terminal. assuming you are in the smart_drilling_mini_project directory, you need to navigate to the frontend dir first. 
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
     ```bash
     cd frontend
     npm run dev
     ```
<<<<<<< HEAD
5. **Access the application at [http://localhost:3030](http://localhost:3030) in your web browser**.
6. **Use the interface to add, edit, and delete tasks**.
7. **Optionally, use the filter feature to view tasks based on completion status**.
=======
   
4. **Access the application at [http://localhost:3030](http://localhost:3030) in your web browser**.
5. **Use the interface to add, edit, and delete tasks**.
6. **Optionally, use the filter feature to view tasks based on completion status**.
>>>>>>> a049c06813b56812a8c84f627c4ba7980e329a31
