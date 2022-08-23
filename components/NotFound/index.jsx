import React from 'react';

import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from '../../layouts/main';
import Container from '../front_components/container';

const NotFound = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Main>
      <Box
        sx={{
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
      >
        <Container sx={{ px: 0, py: 0, maxWidth: { sm: 1, md: 1236 } }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              position: 'relative',
            }}
          >
            <Box
              sx={{
                width: 1,
                order: { xs: 2, md: 1 },
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 0, md: '10em' },
              }}
            >
              <Container>
                <Box>
                  <Typography
                    align={isMd ? 'left' : 'center'}
                    component="p"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      fontSize: '1.25rem',
                      lineHeight: 1.6,
                      letterSpacing: '0.0075em',
                    }}
                  >
                    Oops! Looks like you followed a bad link.
                    <br />
                    If you think this is a problem with us, please{' '}
                    <Link href="/" underline="none">
                      tell us
                    </Link>
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      mt: 4,
                    }}
                  >
                    <Button variant="contained" color="primary" size="large">
                      Back Home
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
            <Box
              sx={{
                flex: { xs: '0 0 100%', md: '0 0 50%' },
                position: 'relative',
                maxWidth: { xs: '100%', md: '50%' },
                order: { xs: 1, md: 2 },
                minHeight: { xs: 'auto', md: 'calc(100vh - 58px)' },
                mt: { xs: 0, md: '3em' },
              }}
            >
              <Image
                src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1661266583/assets/404_acrvja.svg"
                alt="404"
                height={600}
                width={900}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Main>
  );
};

export default NotFound;
