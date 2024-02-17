import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone) && !/^(\d)\1+$/.test(phone) && !/(1234567890|09876543210)/.test(phone);
}

function EnhancedTable() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [editMode, setEditMode] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  const handleDelete = (index) => {
    if (editMode && selected[0] === index) {
      return;
    }
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    setSelected(selected.filter((selectedIndex) => selectedIndex !== index));
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setSelected([index]);
    const user = users[index];
    setFormData({ ...user });
  };

  const handleSaveEdit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all input fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Invalid email');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert('Invalid phone number');
      return;
    }

    const updatedUsers = [...users];
    updatedUsers[selected[0]] = { ...formData };
    setUsers(updatedUsers);
    setEditMode(false);
    setFormData({ name: '', email: '', phone: '' });
    setSelected([]);
  };

  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all input fields');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Invalid email');
      return;
    }

    if (!isValidPhone(formData.phone)) {
      alert('Invalid phone number');
      return;
    }

    const updatedUsers = [...users];
    const newUser = {
      name: capitalizeFirstLetter(formData.name.trim()),
      email: formData.email.trim(),
      phone: formData.phone.trim()
    };
    updatedUsers.push(newUser);
    setUsers(updatedUsers);
    setFormData({ name: '', email: '', phone: '' });
    setSelected([]);
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z_]/g, '');
    setFormData({ ...formData, name: value.substr(0, 30) });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substr(0, 10);
    setFormData({ ...formData, phone: value });
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #ffffff, #f2f2f2)',
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <Paper sx={{ width: '70%', mb: 2, borderRadius: '10px' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ mt: 2 }}>
          Crud operation of Table 3
        </Typography>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                value={formData.name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                value={formData.email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Phone no."
                variant="outlined"
                value={formData.phone}
                onChange={handlePhoneChange}
              />
            </Grid>
            {editMode ? (
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                  Save
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleAdd}>
                  Add
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            size={dense ? 'small' : 'medium'}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < users.length}
                    checked={selected.length === users.length && users.length > 0}
                    onChange={(event) => {
                      if (event.target.checked) {
                        const newSelecteds = users.map((_, index) => index);
                        setSelected(newSelecteds);
                      } else {
                        setSelected([]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone no.</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                const isItemSelected = isSelected(page * rowsPerPage + index);

                return (
                  <TableRow
                    hover
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => {
                          const selectedIndex = page * rowsPerPage + index;
                          const newSelected = [...selected];
                          if (isItemSelected) {
                            newSelected.splice(newSelected.indexOf(selectedIndex), 1);
                          } else {
                            newSelected.push(selectedIndex);
                          }
                          setSelected(newSelected);
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleEdit(page * rowsPerPage + index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(page * rowsPerPage + index)} disabled={editMode && selected[0] === page * rowsPerPage + index}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        sx={{ position: 'fixed', bottom: '20px', right: '20px' }}
      />
    </Box>
  );
}

export default EnhancedTable;
