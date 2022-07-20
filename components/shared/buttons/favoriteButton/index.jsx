/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoriteButton = ({
  favoriteJobs,
  setFavoriteId,
  setDeleteFavoriteId,
  id,
}) => (
  <>
    {favoriteJobs.includes(`${id}`) ? (
      <IconButton
        onClick={() => setDeleteFavoriteId(id)}
        sx={{
          mr: '2em',
          '&:hover': { background: 'transparent' },
        }}
      >
        <FavoriteIcon fontSize="large" sx={{ color: '#FE251B' }} />
      </IconButton>
    ) : (
      <IconButton
        onClick={() => setFavoriteId(id)}
        sx={{
          mr: '2em',
          '&:hover': { background: 'transparent' },
        }}
      >
        <FavoriteBorderIcon fontSize="large" />
      </IconButton>
    )}
  </>
);

FavoriteButton.propTypes = {
  favoriteJobs: PropTypes.array.isRequired,
  setFavoriteId: PropTypes.func.isRequired,
  setDeleteFavoriteId: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default FavoriteButton;
