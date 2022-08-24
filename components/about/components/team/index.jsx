import React from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const Partners = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const teamMembers = [
    {
      name: 'Nolan Vannucci',
      title: 'Founder',
      avatar:
        'https://res.cloudinary.com/dci8xvvvp/image/upload/v1661125971/assets/nolan_gf0ss6.jpg',
      writeUp: (
        <Typography
          align={isMd ? 'left' : 'center'}
          color="text.secondary"
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
          }}
        >
          A native of Huber Heights, Ohio, Nolan Vannucci moved to Columbus
          after graduating from the University of Mount Union in 2007.
          <br />
          <br />
          He's spent the last fifteen years serving the 614 community in a
          variety of ways—both literally and figuratively. He was a bartender
          and restaurant operator at some of Columbus' most popular dining
          destinations for nearly a decade. He also helped found and operated a
          Medical Marijuanna consultancy that currently operates four clinics
          across the state.
          <br />
          <br />
          In September 2021, Nolan quit his day job in Finance Operations at
          J.P. Morgan Chase to finally embrace his entrepreneurial leanings
          full-time. The Bridge is the result.
          <br />
          <br />
          When he's not working or tweeting about coffee, he can be spotted
          enjoying all that Central Ohio has to offer—from restaurants and live
          music to trail-running and (most importantly) municipal golf.
        </Typography>
      ),
    },
    {
      name: 'Zach Livingston',
      title: 'Co-Founder',
      avatar:
        'https://res.cloudinary.com/dci8xvvvp/image/upload/v1661178615/assets/543492D2-8019-4539-9797-8D07740B26D3_buooz9.png',
      writeUp: (
        <Typography
          align={isMd ? 'left' : 'center'}
          color="text.secondary"
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
          }}
        >
          Zach Livingston is a 2011 Ohio State graduate and an Army Veteran.
          After college, Zach worked in a number of different finance roles in
          both Columbus and New York City.
          <br />
          <br />
          His areas of expertise include application development, holistic
          systems design, and user experiance.
          <br />
          <br />
          Zach is originally from New Jersey and currently lives in Raleigh, NC
          with his wife and two boys. Outside of work and family, he has three
          primary passions in life. They are as follows (listed in ascending
          order)—playing guitar, eating cheesecake, and watching Buckeye
          football.
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          align="center"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 700,
            color: theme.palette.text.secondary,
          }}
        >
          Our team
        </Typography>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            mt: theme.spacing(1),
          }}
        >
          Small team. Big hearts.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-around"
        alignContent="center"
        spacing={6}
      >
        {teamMembers.map((team) => (
          <Stack
            key={team.name}
            direction="column"
            spacing={4}
            justifyContent="flex-start"
            alignItems="center"
          >
            {' '}
            <Card
              variant="elevation"
              sx={{
                boxShadow: 0,
                background: theme.palette.tertiary.lighter,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <ListItem component="div" sx={{ p: 0, mb: '1em' }}>
                  <ListItemAvatar sx={{ mr: 3 }}>
                    <Avatar
                      src={team.avatar}
                      variant="rounded"
                      sx={{ width: 100, height: 100, borderRadius: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ m: 0 }}
                    primary={team.name}
                    secondary={team.title}
                    primaryTypographyProps={{
                      variant: 'h6',
                      fontWeight: 700,
                    }}
                    secondaryTypographyProps={{ variant: 'subtitle1' }}
                  />
                </ListItem>
              </CardContent>
            </Card>
            {team.writeUp}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Partners;
