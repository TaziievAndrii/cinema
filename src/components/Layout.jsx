import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/Footer';
import Navbar from './ui/Navbar';

export default function Layout() {
  return (
    <Container
      maxWidth="xl"
      fixed
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Box sx={{ p: 5 }} />
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
}
