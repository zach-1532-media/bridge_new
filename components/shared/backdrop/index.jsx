import React from 'react';

import PropTypes from 'prop-types';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackDrop = ({ openBackdrop }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBackdrop}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

BackDrop.propTypes = {
  openBackdrop: PropTypes.bool.isRequired,
};

export default BackDrop;
