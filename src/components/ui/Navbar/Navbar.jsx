import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setOpen(prevState => !prevState);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(item => {
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <MovieIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>;
                  })}
                </List>
              </Box>
            </Drawer>
            <Typography
              sx={{ color: 'white', textDecoration: 'none' }}
              component={RouterLink}
              variant="h4"
              to="/"
            >
              Betflix
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
