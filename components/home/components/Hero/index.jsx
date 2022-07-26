/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item alignItems="center" xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box>
            <Typography
              align={isMd ? 'left' : 'center'}
              color="text.primary"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '4.5rem', md: '3.75rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.00833em',
              }}
            >
              Finding {isMd ? null : <br />} work {isMd ? null : <br />} made{' '}
              {isMd ? null : <br />} simple
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography
              align={isMd ? 'left' : 'center'}
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
              Get matched with your next full-time or part-time job that meets
              your requirements
            </Typography>
          </Box>
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
                alt="content creator"
                src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660227923/assets/team_pedegf.svg"
                height={400}
                width={600}
                priority
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
