import axios from "axios";
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  TextField, 
  Button, 
  Checkbox, 
  IconButton, 
  Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './index.css';

function App() {

  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddItem = () => {
    if (isEditing) {
      // Update existing item
      setData(prevState => {
        const updatedData = [...prevState];
        updatedData[editIndex] = newItem;
        return updatedData;
      });
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new item
      setData(prevState => [...prevState, newItem]);
    }
    setNewItem({ id: '', name: '', description: '' });
  };

  const handleEditItem = (index) => {
    setNewItem(data[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    setData(prevState => prevState.filter((_, i) => i !== index));
  };

  const handleSelectAll = (event) => {
    setSelectAll(event.target.checked);
    setData(data.map(item => ({ ...item, selected: event.target.checked })));
  };

  const handleCheckboxChange = (index) => {
    setData(prevState => {
      const updatedData = [...prevState];
      updatedData[index].selected = !prevState[index].selected;
      return updatedData;
    });
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>CRUD Operation Using Hooks concept Table2</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
        <TextField
          label="ID"
          name="id"
          value={newItem.id}
          onChange={handleInputChange}
        />
        <TextField
          label="Name"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleAddItem} style={{ marginLeft: '10px' }}>{isEditing ? 'Update' : 'Add'}</Button>
      </div>

      <TableContainer component={Paper} style={{ width: '80%', marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell style={{textAlign:'center'}}>ID</TableCell>
              <TableCell style={{textAlign:'center'}}>Name</TableCell>
              <TableCell style={{textAlign:'center'}}>Description</TableCell>
              <TableCell style={{textAlign:'center'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="checkbox-cell">
                  <Checkbox
                    checked={item.selected || false}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.id}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.name}</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{item.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditItem(index)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteItem(index)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography style={{ position: 'fixed', bottom: 10, right: 10 }}>
        {data.length} rows
      </Typography>
    </div>
  );
}

export default App;
