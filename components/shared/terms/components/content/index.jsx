/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import terms from '../data/data';

const Content = () => {
  const theme = useTheme();

  return (
    <Box>
      {terms.map((item, i) => (
        <Box key={i}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1.5rem',
              lineHeight: 1.337,
              letterSpacing: '0em',
            }}
          >
            {`${i + 1}. `} {item.title}
          </Typography>
          <br />
          <br />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.5,
              letterSpacing: '0.00938em',
              color: theme.palette.text.secondary,
            }}
          >
            {item.content}
          </Typography>
          <br />
        </Box>
      ))}
    </Box>
  );
};

export default Content;
