import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const mock = {
  image:
    'https://res.cloudinary.com/dci8xvvvp/image/upload/v1663179077/blog/Change_lbhvtr.jpg',
  description:
    'A guide on what questions you need to ask yourself, how to stand out from the crowd, and what you can expect after you land your new role.',
  title: "Are you're ready for a change at work? Part 1",
  author: {
    name: 'Nolan Vannucci',
    avatar:
      'https://res.cloudinary.com/dci8xvvvp/image/upload/v1661125971/assets/nolan_gf0ss6.jpg',
  },
  date: '10 Aug 22',
};

const FeaturedArticle = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        component="a"
        href="/blog/changeAtWork"
        display="block"
        sx={{
          width: 1,
          height: 1,
          textDecoration: 'none',
          transition: 'all .2s ease-in-out',
          '&:hover': {
            transform: `translateY(-${theme.spacing(1 / 2)})`,
          },
        }}
      >
        <Card
          sx={{
            width: 1,
            height: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row-reverse' },
            backgroundImage: 'none',
          }}
        >
          <Box
            sx={{
              width: { xs: 1, md: '50%' },
              position: 'relative',
              '& .lazy-load-image-loaded': {
                height: 1,
                display: 'flex !important',
              },
            }}
          >
            <Box
              component={LazyLoadImage}
              src={mock.image}
              alt="featured story image"
              effect="blur"
              sx={{
                height: 1,
                width: 1,
                objectFit: 'cover',
                maxHeight: 360,
              }}
            />
            <Chip
              label="Featured"
              sx={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: theme.palette.background.paper,
              }}
            />
            <Box
              component="svg"
              viewBox="0 0 112 690"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{
                position: 'absolute',
                bottom: 0,
                top: '-50%',
                left: 0,
                right: 0,
                color: theme.palette.background.paper,
                transform: 'scale(2)',
                height: 1,
                width: 'auto',
                transformOrigin: 'top center',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <path
                d="M0 0h62.759v172C38.62 384 112 517 112 517v173H0V0z"
                fill="currentColor"
              />
            </Box>
          </Box>
          <CardContent
            sx={{
              position: 'relative',
              width: { xs: 1, md: '50%' },
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: '1em',
                  fontWeight: 400,
                  fontSize: '1.5rem',
                  lineHeight: 1.334,
                  letterSpacing: '0em',
                }}
              >
                {mock.title}
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {mock.description}
              </Typography>
            </Box>
            <Box>
              <Divider sx={{ marginY: 2 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={mock.author.avatar} sx={{ mr: 1 }} />
                  <Typography sx={{ color: theme.palette.text.secondary }}>
                    {mock.author.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FeaturedArticle;
