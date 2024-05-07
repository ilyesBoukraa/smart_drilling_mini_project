import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// , useEffect

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Iconify from '../../components/iconify'; // 'src/components/iconify';

import TaskItem from './task-items';

// ----------------------------------------------------------------------

// Please note that Tasks and Todos are the same thing here
/**
 * useEffect(() => {
    // Filter the list to get only items with is_completed as true
    const completedItems = list.filter((item) => item.is_completed);

    // Extract the IDs of completed items
    const completedItemIds = completedItems.map((item) => item.id);

    // Set the selected state with the IDs of completed items
    setSelected(completedItemIds);
  }, [list]);

 * / */

export default function AnalyticsTasks({
  title,
  subheader,
  list,
  onAddItems,
  onDeleteItem,
  onEditItem,
  onFilter,
  ...other
}) {
  useEffect(() => {
    // Filter the list to get only items with is_completed as true
    const completedItems = list.filter((item) => {
      if (Array.isArray(item.is_completed)) {
        item.is_completed = item.is_completed[0];
      }
      if (item.is_completed === false) {
        return false;
      }
      return true;
    });
    // Extract the IDs of completed items
    const completedItemIds = completedItems.map((item) => item.id);

    // Set the selected state with the IDs of completed items
    setSelected(completedItemIds);
  }, [list]);

  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  // list
  const handleClickComplete = async (taskId) => {
    try {
      const taskToUpdate = list.find((task) => task.id === taskId);
      console.log('the task we are checking:', taskToUpdate);
      if (!taskToUpdate) {
        console.error(`Task with ID ${taskId} not found`);
        return;
      }

      // Update the task in the db
      const updatedIsCompleted = !taskToUpdate.is_completed;

      console.log('inside onChange is_completed:', taskToUpdate.is_completed);
      const content = encodeURIComponent(taskToUpdate.content);
      const isCompleted = updatedIsCompleted;

      const url = `http://localhost:8000/todos/${taskId}/?content=${content}&is_completed=${isCompleted}`;

      const response = await axios.put(url, null, {
        headers: {
          Accept: 'application/json',
        },
      });

      // update the UI ( make it rerender)
      const tasksCompleted = selected.includes(taskId)
        ? selected.filter((value) => value !== taskId)
        : [...selected, taskId];

      setSelected(tasksCompleted);

      console.log('response', response.data);
    } catch (error) {
      console.error('Failed to update task completion status:', error.message);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleSubmit(event) {
    /*
    event.preventDefault();
    
    if (inputValue.trim() !== '') {
      const newItem = { id: crypto.randomUUID(), content: inputValue };
      onAddItems(newItem);
      setInputValue('');
    }
    */
    event.preventDefault();

    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/todos/', {
          content: inputValue,
          is_completed: false,
        });
        console.log(response.data);
        onAddItems(response.data);

        // Reset the input value
        setInputValue('');
      } catch (error) {
        console.error('Failed to add todo item:', error.message);
      }
    }
  }

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Card {...other}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={4}
        marginBottom={4}
      >
        <Typography variant="h5" gutterBottom>
          What do you want to do today?
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <form className="add-form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Item..."
              variant="outlined"
              value={inputValue}
              onChange={handleChange}
              sx={{ width: '300px', height: '50px' }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: '2px', marginLeft: 1, height: '50px' }}
            >
              Add
            </Button>
          </form>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ marginRight: 2 }}>
        <Button
          onClick={handleMenuOpen}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'right',
            marginBottom: 2,
          }}
        >
          <Typography color="textPrimary">Filter</Typography>
        </Button>

        <Popover
          open={Boolean(menuAnchorEl)}
          anchorEl={menuAnchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={onFilter}>
            <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
            Filter By Completed
          </MenuItem>
        </Popover>
      </Stack>

      {list.length !== 0 && <CardHeader title={title} subheader={subheader} />}

      {list.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          checked={selected.includes(task.id)} // selected.includes(task.id)// task.is_completed
          onChange={handleClickComplete}
          onDeleteItem={onDeleteItem}
          onEditItem={onEditItem}
        />
      ))}
    </Card>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  onAddItems: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onFilter: PropTypes.func,
};
