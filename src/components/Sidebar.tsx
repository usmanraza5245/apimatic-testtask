import React, { useState } from 'react';
import { Drawer, Typography, List, ListItem, ListItemText, Box, Button, useMediaQuery, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarProps } from '../types';


const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, menuItems, activeItem, downloadHandler }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navigate = useNavigate();
    const isDesktop = useMediaQuery('(min-width:1024px)')

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const goBack = () => {
        navigate("/")
    }
    return (
        <>
            {/* Menu Button for Mobile and tablet */}
            {!isDesktop && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ position: 'absolute', top: 16, left: 16 }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                // variant="permanent"
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={isDesktop || isDrawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', justifyContent: 'space-between' },
                }}
            >
                <Box sx={{ overflow: 'auto' }}>
                    <Typography
                        variant="h6"
                        sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}
                    >
                        Menu
                    </Typography>
                    <List>
                        {menuItems.map((text, index) => (
                            <ListItem component={Link} key={index} to={`/${text}`}
                                sx={{
                                    bgcolor: activeItem === text ? 'primary.main' : 'inherit',
                                    color: activeItem === text ? 'white' : 'inherit',
                                    '&:hover': {
                                        bgcolor: activeItem === text ? 'primary.dark' : 'action.hover',
                                    },
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box p={2} display={'flex'} flexDirection={'column'} gap={2}>
                    <Button variant="contained" fullWidth onClick={goBack}>Go Back</Button>
                    <Button variant='contained' fullWidth onClick={downloadHandler}>Export</Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;
