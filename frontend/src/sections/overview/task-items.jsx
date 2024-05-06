import { useState } from 'react';
import PropTypes from 'prop-types';

// , useEffect

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TaskItem({ task, checked, onChange, onDeleteItem, onEditItem }) {
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
            control={<Checkbox checked={checked} onChange={() => onChange(task.id)} />}
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
