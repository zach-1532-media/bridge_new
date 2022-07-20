import React from 'react';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export const JobBlockWrapperGrid = ({ children }) => (
  <Box>
    <Grid container spacing={4}>
      {children}
    </Grid>
  </Box>
);

JobBlockWrapperGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export const JobBlockWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        display="block"
        width={1}
        height={1}
        sx={{
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          },
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

JobBlockWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
