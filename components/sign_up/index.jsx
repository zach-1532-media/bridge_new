import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from '../../layouts/main';
import Container from '../front_components/container';

const SignUp = ({ image, children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 247px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
        }}
      >
        <Container>
          <Grid container spacing={6}>
            <Grid
              item
              container
              xs={12}
              sm={6}
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </Grid>
            {isMd ? (
              <Grid
                item
                container
                xs={12}
                sm={6}
                sx={{ justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    height: 1,
                    width: 1,
                    maxWidth: 500,
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    sx={{
                      width: 1,
                      height: 1,
                    }}
                  />
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

SignUp.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SignUp;
