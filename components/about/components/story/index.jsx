import React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Team = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column'}>
        <Grid item container alignItems="center" xs={12} md={6}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: '1em' }}>
              Our Story
            </Typography>
            <Typography
              component="p"
              sx={{ color: theme.palette.text.secondary }}
            >
              Our foucs is always on finding the right job for the great
              citizens of FlavorTown. Your bar is high when job seeking - ours
              is high when matching you with the right openings.
              <br />
              <br />
              Our focus is not just on curating the best jobs in Columbus, but
              making the experiance as seamless as possible.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={6}
        >
          <Box sx={{ maxWidth: 500, width: 1 }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660153269/assets/deskDude_g0antu.svg"
              sx={{
                width: 1,
                height: 1,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
