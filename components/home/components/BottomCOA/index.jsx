import React from 'react';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BottomCOA = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={6} justifyContent="space-evenly">
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Box maxWidth={500} margin="0 auto">
            <Typography
              align={isMd ? 'left' : 'center'}
              variant="h3"
              sx={{ fontWeight: 700 }}
            >
              Find your next job faster than it takes to make a cup of coffee
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-evenly"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Box>
            <Box marginBottom={2}>
              <Link href="/signUp/user" passHref>
                <Button variant="contained" size="large">
                  Join Now
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BottomCOA;
