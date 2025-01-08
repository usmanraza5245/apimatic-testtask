import React from 'react';
import { Box, Typography, Button, Divider, TextField } from '@mui/material';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ title, isEdit, setIsEdit, handleInputChange, onSaveEditHandler }) => {
    const clickHandler = () => {
        setIsEdit(!isEdit)
    }
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} mb={2} alignItems={'center'}>
                {
                    isEdit ? <>
                        <TextField defaultValue={title} onChange={handleInputChange} sx={{ maxWidth: "500px", width: "100%" }} />
                        <Box display={'flex'} gap={2}>
                            <Button variant="outlined" color="primary" onClick={clickHandler}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={onSaveEditHandler}>
                                Save
                            </Button>
                        </Box>
                    </> : <>
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={clickHandler}>
                            Edit
                        </Button>
                    </>
                }


            </Box>
            <Divider />
        </Box>

    );
};

export default Header;
