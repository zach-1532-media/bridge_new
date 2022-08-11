import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';

const ArticleCard = ({ data }) => {
  const theme = useTheme();

  return (
    <Box
      component="a"
      href="/blogArticle"
      sx={{
        display: 'block',
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
        boxShadow={4}
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'none',
        }}
      >
        <CardMedia
          image={data.image}
          title={data.title}
          sx={{
            height: { xs: 300, md: 360 },
            position: 'relative',
          }}
        >
          <Box
            component="svg"
            viewBox="0 0 2880 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            sx={{
              position: 'absolute',
              bottom: 0,
              color: theme.palette.background.paper,
              transform: 'scale(2)',
              height: 'auto',
              width: 1,
              transformOrigin: 'top center',
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2160 0C1440 240 720 240 720 240H0v240h2880V0h-720z"
              fill="currentColor"
            />
          </Box>
        </CardMedia>
        <CardContent sx={{ position: 'relative' }}>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '1.25rem',
              lineHeight: 1.6,
              letterSpacing: '0.0075em',
              mb: '1em',
            }}
          >
            {data.title}
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            {data.description}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Divider />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar src={data.author.avatar} sx={{ mr: 1 }} />
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  {data.author.name}
                </Typography>
              </Box>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {data.date}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

ArticleCard.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      Avatar: PropTypes.string,
    }),
    date: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
