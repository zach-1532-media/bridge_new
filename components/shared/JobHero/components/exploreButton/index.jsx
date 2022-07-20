import React from 'react';

import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ExploreButton = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <>
      <Box marginBottom={3}>
        <Typography variant="h6" component="span" color="text.secondary">
          We use individuallized data points that only match you with what fits
          your needs
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'stretched', sm: 'flex-start' }}
      >
        <Link href="/jobSearch" passHref>
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            fullWidth={!isMd}
          >
            Explore
          </Box>
        </Link>
      </Box>
    </>
  );
};

export default ExploreButton;
