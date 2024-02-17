import React, { useState } from 'react';
import backgroundImage from './nature-background.jpg';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button, TextField } from '@mui/material';

export default function App() {
    const [id] = useState(101);
    const [count, setCount] = useState(0);
    const [name] = useState('Malavan');
    const [salary] = useState(10000);
    const [address, setAddress] = useState({ Street: '', village: '', district: '' });
    const [updatedDistrictMessage, setUpdatedDistrictMessage] = useState('');

    const handleAddressChange = (key, value) => {
        setAddress(prevAddress => ({
            ...prevAddress,
            [key]: value
        }));
    };

    const handleDistrictUpdate = () => {
        setUpdatedDistrictMessage('Address updated successfully!');
    };

    return (
        <div>
            <style>
                {`
                    body {
                        background-image: url(${backgroundImage});
                        background-size: cover;
                        background-position: center;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .MuiTableRow-root:nth-of-type(even) {
                        background-color: #e0e0e0; 
                    }

                    .MuiTableRow-root:nth-of-type(odd) {
                        background-color: #ffffff; 
                    }

                    .MuiTableRow-root:hover {
                        background-color: #f0f0f0; 
                    }
                `}
            </style>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Employee_Id</TableCell>
                            <TableCell>{id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Salary</TableCell>
                            <TableCell>{salary}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>
                                <TextField
                                    value={address.Street}
                                    onChange={(e) => handleAddressChange('Street', e.target.value)}
                                    label="Street"
                                    variant="outlined"
                                />
                                <TextField
                                    value={address.village}
                                    onChange={(e) => handleAddressChange('village', e.target.value)}
                                    label="Village"
                                    variant="outlined"
                                />
                                <TextField
                                    value={address.district}
                                    onChange={(e) => handleAddressChange('district', e.target.value)}
                                    label="District"
                                    variant="outlined"
                                />
                                <Button variant="contained" onClick={handleDistrictUpdate}>Update Address</Button>
                                {updatedDistrictMessage && <p>{updatedDistrictMessage}</p>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>No of Days Working</TableCell>
                            <TableCell>{count}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <Button variant="contained" onClick={() => setCount(count + 1)}>Present</Button>
                <Button variant="contained" onClick={() => setCount(count - 1)}>Absent</Button>
            </div>
        </div>
    );
}
