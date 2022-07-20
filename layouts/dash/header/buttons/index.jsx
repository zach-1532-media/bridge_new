import React from 'react';

import Box from '@mui/material/Box';

import HeaderSearch from './search';
import HeaderNotifications from './notifications';

const HeaderButtons = () => (
  <Box
    sx={{
      mr: 1.5,
    }}
  >
    <HeaderSearch />
    <Box
      sx={{
        mx: 0.5,
      }}
      component="span"
    >
      <HeaderNotifications />
    </Box>
    <Box
      component="span"
      sx={{
        display: { xs: 'none', sm: 'inline-block' },
      }}
    />
  </Box>
);

export default HeaderButtons;
