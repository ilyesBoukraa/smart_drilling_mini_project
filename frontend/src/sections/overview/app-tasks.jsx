import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

// Please note that Tasks and Todos are the same thing here

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
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // Filter the list to get only items with is_completed as true
    const completedItems = list.filter((item) => item.is_completed);

    // Extract the IDs of completed items
    const completedItemIds = completedItems.map((item) => item.id);

    // Set the selected state with the IDs of completed items
    setSelected(completedItemIds);
  }, [list]);

  const handleClickComplete = async (taskId) => {
    try {
      const taskToUpdate = list.find((task) => task.id === taskId);

      if (!taskToUpdate) {
        console.error(`Task with ID ${taskId} not found`);
        return;
      }

      // Update the task in the db
      const updatedIsCompleted = !taskToUpdate.is_completed;
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

      console.log('response', response);
    } catch (error) {
      console.error('Failed to update task completion status:', error.message);
    }
  };

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    /*
    if (inputValue.trim() !== '') {
      const newItem = { id: crypto.randomUUID(), content: inputValue };
      onAddItems(newItem);
      setInputValue('');
    }
    */
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/todos/', {
          content: inputValue,
          is_completed: false,
        });
        onAddItems(response.data);

        // Reset the input value
        setInputValue('');
      } catch (error) {
        console.error('Failed to add todo item:', error.message);
      }
    }
  }

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
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
          <MenuItem onClick={() => onFilter()}>
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
          checked={selected.includes(task.id)} // task.is_completed
          onChange={() => handleClickComplete(task.id)}
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

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange, onDeleteItem, onEditItem }) {
  const [open, setOpen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [originalName, setOriginalName] = useState(task.name);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleMarkComplete = () => {
    handleCloseMenu();
    onChange(task.id);
    console.info('MARK COMPLETE', task.id);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setIsEditing(true);
    setOriginalName(task.content);
    setEditedName(task.content);
    console.info('EDIT', task.id);
  };

  const handleSave = () => {
    onEditItem(task.id, editedName);
    setIsEditing(false);
  };

  const handleQuit = () => {
    setIsEditing(false);
    setEditedName(originalName);
  };

  const handleInputChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleDelete = () => {
    handleCloseMenu();
    onDeleteItem(task.id);
    console.info('DELETE', task.id);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        {isEditing ? (
          <>
            <form className="save-form" onSubmit={handleSave}>
              <TextField
                value={editedName}
                onChange={handleInputChange}
                sx={{ width: '300px', height: '50px' }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '2px', marginLeft: 1, height: '50px' }}
              >
                Save
              </Button>
            </form>
            <div className="form-quit">
              <Button
                onClick={handleQuit}
                type="submit"
                variant="outlined"
                sx={{ marginTop: '2px', marginLeft: 1, height: '50px' }}
              >
                Quit
              </Button>
            </div>
          </>
        ) : (
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} />}
            label={task.content}
            sx={{ flexGrow: 1, m: 0 }}
          />
        )}

        {!isEditing && (
          <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
      </Stack>

      {!isEditing && (
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMarkComplete}>
            <Iconify icon="eva:checkmark-circle-2-fill" sx={{ mr: 2 }} />
            Mark Complete
          </MenuItem>

          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" sx={{ mr: 2 }} />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Popover>
      )}
    </>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
};
