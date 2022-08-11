import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Logo from '../../../../components/shared/logo';

const Footer = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 1,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box display="flex" href="/" title="The Bridge" width={80}>
          <Box
            sx={{
              height: 1,
              width: 1,
            }}
          >
            <Logo />
          </Box>
        </Box>
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
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Typography
        align="center"
        variant="subtitle2"
        component="span"
        color="text.secondary"
        gutterBottom
      >
        &copy; The Bridge. 2022, Meet At The Bridge Corp. All rights reserved
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
