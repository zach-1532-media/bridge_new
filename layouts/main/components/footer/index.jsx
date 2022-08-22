import React from 'react';

import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Logo from '../../../../components/shared/logo';

const Footer = () => (
  <>
    <Box
      sx={{
        display: 'flex',
        width: 1,
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%',
          mb: '2em',
        }}
      >
        <Logo />
        <Stack direction="row" spacing={2}>
          <IconButton
            href="https://www.facebook.com/ConnectAtTheBridge"
            target="_blank"
            sx={{
              '&:hover': {
                background: 'transparent',
              },
            }}
          >
            <FacebookIcon />
          </IconButton>

          <IconButton
            href="https://twitter.com/_The_Bridge11"
            target="_blank"
            sx={{
              '&:hover': {
                background: 'transparent',
              },
            }}
          >
            <TwitterIcon />
          </IconButton>

          <IconButton
            href="https://www.Instagram.com/connectatthebridge/"
            target="_blank"
            sx={{
              '&:hover': {
                background: 'transparent',
              },
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
    <Box
      sx={{
        width: { xs: '100%', md: '38%' },
      }}
    >
      <Typography align="center" color="text.secondary">
        &copy; The Bridge. 2022, Meet At The Bridge Corp. All rights reserved
      </Typography>
    </Box>
  </>
);

export default Footer;
