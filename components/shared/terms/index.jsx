/* eslint-disable react/function-component-definition */
import React from 'react';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from '../../front_components/container';
import Content from './components/content';

const TermsAndConditions = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box boxShadow={4} borderRadius={2}>
        <Box bgcolor={theme.palette.primary.main} borderRadius={2}>
          <Container paddingX={{ xs: 2, sm: 4 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: '2.125rem',
                lineHeight: 1.235,
                letterSpacing: '0.00735em',
                color: theme.palette.common.white,
              }}
            >
              The Bridge Terms and Conditions
            </Typography>
            <Typography
              gutterBottom
              sx={{
                color: theme.palette.common.white,
              }}
            >
              Last modified on <strong>June 3rd, 2022</strong>
            </Typography>
          </Container>
          <Box
            component="svg"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 1920 100.1"
            sx={{
              width: 1,
              mb: -1,
            }}
          >
            <path
              fill={theme.palette.background.default}
              d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
            />
          </Box>
        </Box>
        <Container
          paddingTop="0 !important"
          paddingX={{ xs: 2, sm: 4 }}
          position="relative"
          top={0}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              mt: '2em',
            }}
          >
            <Content />
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
