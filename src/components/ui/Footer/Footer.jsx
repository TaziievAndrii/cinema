import { Stack, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: { sm: 'row' },
        justifyContent: { sm: 'space-between' },
        alignItems: { sm: 'center' },
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} &laquo;Some text&raquo; 18+ <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, culpa.{' '}
        <br />
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </Typography>
      <Typography variant="h4" color="primary.main">
        betflix
      </Typography>
    </Stack>
  );
}
