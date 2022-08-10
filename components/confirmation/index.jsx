import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import Container from '../front_components/container';

const Confirmation = () => {
  const router = useRouter();
  const { id } = router.query;

  const items = [
    {
      name: 'facebook',
      href: 'https://www.facebook.com/ConnectAtTheBridge',
      icon: <FacebookIcon sx={{ color: ' #4267B2' }} />,
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/_The_Bridge11',
      icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
    },
    {
      name: 'instagram',
      href: 'https://www.instagram.com/connectatthebridge/',
      icon: <InstagramIcon sx={{ color: '#fb3958' }} />,
    },
  ];

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckIcon sx={{ fontSize: '5em', color: '#00FF00', mb: '.5em' }} />
        <Typography
          align="center"
          sx={{
            fontSize: '6.5em',
            fontWeight: '600',
            mb: '.5em',
          }}
        >
          Thank You!
        </Typography>
        <Box
          sx={{
            width: '50%',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              color: 'gray',
              mb: '4em',
            }}
          >
            Your job has been successfully posted! You'll recieve a confirmation
            email shortly. Check it out by clicking the button below!
          </Typography>
        </Box>
        <Link href={`/dashboards/business/postedJobs/${id}`} passHref>
          <Button
            size="large"
            variant="contained"
            sx={{ width: { xs: '80%', md: '40%' }, mb: '4em' }}
          >
            Go to your posted jobs
          </Button>
        </Link>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Stack direction="row" spacing={2}>
            {items.map((item) => (
              <IconButton href={item.href} target="_blank" key={`${item.name}`}>
                {item.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Confirmation;
