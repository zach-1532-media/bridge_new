/* eslint-disable react/function-component-definition */
import React from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

const CheckBox = () => {
  const theme = useTheme();

  return (
    <Box
      component={Avatar}
      bgcolor={theme.palette.tertiary.main}
      width={20}
      height={20}
    >
      <svg
        width={12}
        height={12}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </Box>
  );
};

export default CheckBox;
