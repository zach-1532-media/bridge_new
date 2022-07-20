/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const JobHero = ({ searchBar, image, exploreButton }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box bgcolor="alternate.main" padding={{ xs: 2, md: 4 }} borderRadius={2}>
      <Grid container spacing={4}>
        <Grid
          item
          container
          xs={12}
          md={6}
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <Box
            data-aos={
              searchBar === <></> ? (isMd ? 'fade-right' : 'fade-up') : null
            }
            marginBottom={4}
          >
            <Box marginBottom={2}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                }}
              >
                Find your dream job
              </Typography>
            </Box>
            {exploreButton}
          </Box>
          {searchBar}
        </Grid>
        {image}
      </Grid>
    </Box>
  );
};

JobHero.propTypes = {
  searchBar: PropTypes.node.isRequired,
  image: PropTypes.node.isRequired,
  exploreButton: PropTypes.node.isRequired,
};

export default JobHero;
