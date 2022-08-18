/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item alignItems="center" xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Typography
              color="text.primary"
              sx={{
                fontWeight: 700,
                fontSize: '3.75rem',
                lineHeight: 1.2,
                letterSpacing: '-0.00833em',
                mb: '.5em',
              }}
            >
              We make hiring simple
            </Typography>

            <Typography
              variant="h6"
              component="p"
              sx={{
                color: 'text.secondary',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: 1.75,
                letterSpacing: '0.00938em',
                mt: '3em',
              }}
            >
              Find your next part-time or full-time employee now
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: 1,
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            aligntItems: 'center',
          }}
        >
          <Box height={1} width={1} maxWidth={500}>
            <Box
              sx={{
                width: 1,
                height: 1,
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
              }}
            >
              <Image
                alt="interview"
                src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660842308/assets/interview_rooyiw.svg"
                height={400}
                width={600}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
