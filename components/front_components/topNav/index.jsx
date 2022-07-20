import React from 'react';

import Box from '@mui/material/Box';

import ThemeModeToggler from '../themeModeToggler';

const TopNav = () => (
  <Box display="flex" justifyContent="flex-end" alignItems="center">
    <Box>
      <ThemeModeToggler />
    </Box>
  </Box>
);

export default TopNav;
