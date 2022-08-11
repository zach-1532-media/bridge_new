import { React, useEffect } from 'react';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Container from '../../../front_components/container';

const Hero = () => {
  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    jarallaxInit();
  }, []);

  return (
    <Box
      className="jarallax"
      data-jarallax
      data-speed="0.2"
      id="columbus-scroll"
      sx={{
        position: 'relative',
        minHeight: { xs: 400, sm: 500, md: 600 },
        display: 'flex',
        alignItems: 'center',
        mt: -13,
        pt: 13,
      }}
    >
      <Box
        className="jarallax-img"
        sx={{
          position: 'absolute',
          objectFit: 'cover',
          fontFamily: 'object-fit: cover;',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage:
            'url(https://res.cloudinary.com/dci8xvvvp/image/upload/v1660152419/assets/columbus_1_wimjtq.jpg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: 1,
          height: 1,
          background: alpha('#161c2d', 0.4),
          zIndex: 1,
        }}
      />
      <Container position="relative" zIndex={2}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: '3.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
            color: 'white',
            textTransform: 'uppercase',
            mb: '1em',
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h4"
          color="text.primary"
          sx={{
            fontWeight: 700,
            color: 'white',
            fontSize: '1.5rem',
            lineHeight: 1.334,
            letterSpacing: '0em',
          }}
        >
          Founded by a couple cool dudes who love FlavorTown and the Buckeyes.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
