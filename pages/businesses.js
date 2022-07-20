/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import dbConnect from '../lib/dbConnect';
import Business from '../models/Business';
import BusinessCard from '../components/BusinessCard';

const Businesses = ({ businesses }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '50%',
        mt: '10em',
      }}
    >
      <Grid container spacing={4}>
        {businesses.map((business) => (
          <Grid item xs={12} sm={6} md={4} key={businesses.businessName}>
            <BusinessCard
              id={business._id}
              businessName={business.businessName}
              email={business.email}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);

export async function getServerSideProps() {
  await dbConnect();

  const businesses = await Business.find({});

  return {
    props: {
      businesses: JSON.parse(JSON.stringify(businesses)),
    },
  };
}

Businesses.propTypes = {
  businesses: PropTypes.array.isRequired,
};

export default Businesses;
