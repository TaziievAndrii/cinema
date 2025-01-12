import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <Container fixed>
      <Outlet />
    </Container>
  );
}
