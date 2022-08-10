/* eslint-disable react/no-unescaped-entities */
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const links = [
  {
    title: 'Candidate Signup',
    link: '/userSignUp',
  },
];

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item alignItems="center" xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box>
            <Typography
              variant="h1"
              color="text.primary"
              sx={{ fontWeight: 700, mb: '1em' }}
            >
              Finding work made simple
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: 'text.secondary', fontWeight: 700 }}
            >
              Get matched with you next full-time or part-time job that meet
              your requirements
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'row', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'flex-start' }}
          >
            {links.map((link) => (
              <Link href={link.link} passHref key={link.title}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  key={link.title}
                  sx={{
                    mb: '2em',
                    mr: '1em',
                  }}
                  fullWidth={!isMd}
                >
                  {link.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            height: 1,
            width: 1,
            display: 'flex',
            justifyContent: 'center',
            aligntItems: 'center',
          }}
        >
          <Box height={1} width={1} maxWidth={500}>
            <Box
              sx={{
                width: 1,
                height: 1,
                filter:
                  theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
              }}
            >
              <Image
                alt="content creator"
                src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/team.svg"
                height={400}
                width={600}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
