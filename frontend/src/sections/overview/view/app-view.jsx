import axios from 'axios';
import { useState, useEffect } from 'react';

// import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';

// ----------------------------------------------------------------------
// Please note that Tasks and Todos are the same thing here
// Also the AnalyticsTasks from app-tasks.jsx file is called AppTasks here

async function initializeDatabase() {
  console.log('inside initializeDatabase');
  const initialValues = [
    { content: 'Keep Learning React for 4h', is_completed: false },
    { content: 'Take a Break of 2h', is_completed: true },
    { content: 'The Coursera MLOps Course for 2h', is_completed: false },
    { content: 'Go Outside & Walk for 8km', is_completed: false },
    { content: 'Take A Shower Eat', is_completed: false },
    { content: 'Enjoy Your Rest Time', is_completed: false },
    { content: 'Sleep In Time aka 10pm', is_completed: false },
  ];

  try {
    const createdTodos = await Promise.all(
      initialValues.map((todo) =>
        axios
          .post('http://localhost:8000/todos/', todo)
          .then((response) => response.data)
          .catch((error) => {
            console.error(error);
            throw error;
          })
      )
    );

    console.log('Created todos:', createdTodos);
    // Set a flag in local storage to indicate that the database has been initialized
    localStorage.setItem('databaseInitialized', 'true');
    return createdTodos;
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    return [];
  }
}

async function fetchIncompleteTodos() {
  const url = 'http://localhost:8000/todos/?filter_by_complited=false';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch incomplete todos:', error.message);
    return [];
  }
}

export default function AppView() {
  const [items, setItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Checking if the db has already been initialized
        // localStorage.setItem('databaseInitialized', 'false');
        const databaseInitialized = localStorage.getItem('databaseInitialized');
        console.log(databaseInitialized);

        if (databaseInitialized === 'false') {
          // If not initialize it
          console.log('Initializing database ...');
          await initializeDatabase();
        } else {
          console.log('Database already Initialized');
        }

        const incompleteTodos = await fetchIncompleteTodos();

        setItems(incompleteTodos);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  const handleFilter = async () => {
    try {
      if (filterStatus) {
        const response = await axios.get('http://localhost:8000/todos/?filter_by_completed=true');
        setItems(response.data);
      } else {
        const response = await axios.get('http://localhost:8000/todos/?filter_by_completed=false');
        setItems(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch filtered data:', error);
    }

    setFilterStatus((prevStatus) => !prevStatus);
  };

  const handleAddItem = (item) => {
    setItems((myItems) => [...myItems, item]);
  };

  /*
  const handleEditItem = (id, editedName) => {
    setItems((myItems) =>
      myItems.map((item) => (item.id === id ? { ...item, content: editedName } : item))
    );
  };

  */

  const handleEditItem = async (id, editedName) => {
    try {
      const taskToUpdate = items.find((task) => task.id === id);

      if (!taskToUpdate) {
        console.error(`Task with ID ${id} not found`);
        return;
      }

      const updatedContent = encodeURIComponent(editedName);

      const url = `http://localhost:8000/todos/${id}/?content=${updatedContent}`;

      const response = await axios.put(url, null, {
        headers: {
          Accept: 'application/json',
        },
      });

      // If the update was successful, update the frontend
      if (response.status === 201) {
        setItems((myItems) =>
          myItems.map((item) => (item.id === id ? { ...item, content: editedName } : item))
        );
      } else {
        console.error('Failed to update task in the database');
      }
    } catch (error) {
      console.error('Failed to update task content:', error.message);
    }
  };

  /*
  const handleDeleteItem = (id) => {
    setItems((myItems) => myItems.filter((item) => item.id !== id));
  };
*/

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/todos/${id}/`);

      setItems((myItems) => myItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete item:', error.message);
    }
  };

  return (
    // maxWidth="xl"
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5, textAlign: 'center' }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="ToDos"
            list={items}
            onAddItems={handleAddItem}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
            onFilter={handleFilter}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
