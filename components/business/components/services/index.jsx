import React from 'react';

import Link from 'next/link';

import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Stack from '@mui/material/Stack';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const mock = [
  {
    title: 'Register for an account and create your profile',
    icon: <PersonAddIcon />,
  },
  {
    title: 'Post a job anytime. We will notify matches within 24-48 hours',
    icon: <PostAddIcon />,
  },
  {
    title: 'Manage the applicants on our easy to use business platform',
    icon: <ManageAccountsIcon />,
  },
];

const Services = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        {mock.map((item, i) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Box
              width={1}
              height={1}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              data-aos-offset={100}
              data-aos-duration={600}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  component={Avatar}
                  width={60}
                  height={60}
                  marginBottom={2}
                  bgcolor={alpha(theme.palette.primary.main, 0.1)}
                  color={theme.palette.primary.main}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    letterSpacing: '0.00938em',
                  }}
                  align="center"
                >
                  {item.title}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack
        sx={{ mt: '4em' }}
        spacing={4}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-around"
        alignItems="center"
      >
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '50%' },
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 400,
              fontSize: '1rem',
              lineHeight: 1.5,
              letterSpacing: '0.00938em',
            }}
          >
            The Bridge was createdto save you time in the hiring process so you
            can spend more time interviewing your next hire.{' '}
          </Typography>
        </Box>
        <Link href="/signUp/business" passHref>
          <Button
            endIcon={<ArrowRightAltIcon />}
            variant="contained"
            size="large"
          >
            Start Now
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default Services;
