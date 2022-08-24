/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */

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
              searchBar === null ? (isMd ? 'fade-right' : 'fade-up') : null
            }
            marginBottom={4}
          >
            <Box marginBottom={2}>
              <Typography
                align={isMd ? 'left' : 'center'}
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
  searchBar: PropTypes.node,
  image: PropTypes.node,
  exploreButton: PropTypes.node,
};

JobHero.defaultProps = {
  image: null,
  exploreButton: null,
  searchBar: null,
};

export default JobHero;
