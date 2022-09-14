import { React, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useTheme, alpha } from '@mui/material/styles';

import Container from '../../../../front_components/container';

const Hero = ({ subtitle, cover, avatar, title, date, author }) => {
  const theme = useTheme();

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
  });

  return (
    <Box
      className="jarallax"
      data-jarallax
      data-speed="0.2"
      id="agency__portfolio-item--js-scroll"
      sx={{
        position: 'relative',
        minHeight: { xs: 400, sm: 500, md: 600 },
        display: 'flex',
        mt: -13,
        pt: 13,
        alignItems: 'center',
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
          backgroundImage: `url(${cover})`,
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
          background: alpha('#161c2d', 0.6),
          zIndex: 1,
        }}
      />
      <Container position="relative" zIndex={2}>
        <Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '3rem',
              lineHeight: 1.167,
              letterSpacing: '0em',
              color: theme.palette.common.white,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: '1.25rem',
              color: theme.palette.common.white,
              mb: 2,
            }}
          >
            {subtitle}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ width: 60, height: 60, mr: 2 }} src={avatar} />
            <ListItemText
              sx={{
                m: 0,
              }}
              primary={author}
              secondary={date}
              primaryTypographyProps={{
                sx: {
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  lineHeight: 1.6,
                  letterSpacing: '0.0075em',
                  color: theme.palette.common.white,
                },
              }}
              secondaryTypographyProps={{
                sx: { color: alpha('#ffffff', 0.8) },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
