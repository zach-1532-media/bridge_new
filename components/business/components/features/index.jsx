/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import { colors } from '@mui/material';
import Stack from '@mui/material/Stack';
import PostAddIcon from '@mui/icons-material/PostAdd';
import EmailIcon from '@mui/icons-material/Email';
import DashboardIcon from '@mui/icons-material/Dashboard';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import Container from '../../../front_components/container';

const mock = [
  {
    color: colors.lightBlue[500],
    title: 'Job Posting Tool',
    subtitle: (
      <List>
        Post jobs on the bridge in three simple steps:
        <ListItem>Fill out the details</ListItem>
        <ListItem>Preview for Accuracy</ListItem>
        <ListItem>Checkout (job goes live right away)</ListItem>
      </List>
    ),
    icon: <PostAddIcon />,
  },
  {
    color: colors.purple[500],
    title: 'Email Template Tool',
    subtitle: (
      <List>
        With a few clicks, email a candidate to:
        <ListItem>Setup an Interview</ListItem>
        <ListItem>Make an Offer</ListItem>
        <ListItem>Send a rejection letter</ListItem>
      </List>
    ),
    icon: <EmailIcon />,
  },
  {
    color: colors.orange[500],
    title: 'Candidate Dashboard',
    subtitle: (
      <List>
        Easily view and manage candidates all in one place:
        <ListItem>View and download resumes</ListItem>
        <ListItem>Use the email template tool</ListItem>
        <ListItem>View a Candidate's Social Media or Website </ListItem>
        <ListItem>
          <caption>** If the candidate includes them</caption>
        </ListItem>
      </List>
    ),
    icon: <DashboardIcon />,
  },
];

const Features = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontWeight: 300,
            fontSize: '3.75rem',
            lineHeight: 1.2,
            letterSpacing: '-0.00833em',
          }}
        >
          Features for Business Users
        </Typography>
      </Box>
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 6 }}
        >
          {mock.map((item, i) => (
            <Box
              key={i}
              sx={{
                minHeight: '25em',
                width: 1,
                display: 'block',
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Card sx={{ p: 4, width: 1, height: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 2,
                      bgcolor: alpha(item.color, 0.1),
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Typography
                    gutterBottom="true"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      lineHeight: 1.6,
                      letterSpacing: '0.0075em',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Box>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Features;
