import React from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Newsletter = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Typography
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
          }}
        >
          Get our stories delievered
        </Typography>
        <Typography
          align="center"
          component="p"
          sx={{
            fontWeight: 500,
            fontSize: '1.25rem',
            lineHeight: 1.6,
            letterSpacing: '0.0075em',
            color: theme.palette.text.secondary,
          }}
        >
          From us to your inbox weekly.
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: 600,
          m: '0 auto',
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiInputBase-input.MuiOutlinedInput-imput': {
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent={{ xs: 'center' }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Enter your email"
              sx={{ maxWidth: 422, height: 54 }}
            />
            <Button variant="contained" sx={{ height: 54 }}>
              Subscribe
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Newsletter;
