import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from '../../../layouts/main';
import Container from '../../front_components/container';

const ServerError = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleMail = () => {
    window.location.href =
      'mailto:support@connectatthebridge.com?subject=Server Error';
  };

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
                    Oops! Looks like there has been a server error.
                    <br />
                    If you'd like to let us know, please{' '}
                    <Button
                      sx={{
                        ml: '-0.7em',
                        mb: '0.2em',
                        fontSize: '1.25rem',
                        '&:hover': { background: 'transparent' },
                      }}
                      onClick={handleMail}
                    >
                      email us
                    </Button>
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      mt: 4,
                    }}
                  >
                    <Link href="/" passHref>
                      <Button variant="contained" color="primary" size="large">
                        Back Home
                      </Button>
                    </Link>
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
                src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1661438950/assets/500_hacp5j.svg"
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

export default ServerError;
