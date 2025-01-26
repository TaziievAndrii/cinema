import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ErrorMessage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
    >
      <Typography variant="h6">
        Yikes, the system just had a little tantrum!
      </Typography>
    </Box>
  );
}
