import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

const teamMembers = [
  {
    name: 'Nolan Vannucci',
    title: 'CEO',
    avatar: 'https://assets.maccarianagency.com/avatars/img4.jpg',
  },
  {
    name: 'Zach Livingston',
    title: 'CTO',
    avatar: 'https://assets.maccarianagency.com/avatars/img5.jpg',
  },
];

const Partners = () => {
  const theme = useTheme();

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
        <Typography
          variant="h6"
          align="center"
          sx={{ color: theme.palette.text.secondary }}
        >
          Our focus is always on finding the best people to work with. Our bar
          is high, but you look ready to take on the challenge.
        </Typography>
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-evenly"
        alignContent="center"
        spacing={2}
      >
        {teamMembers.map((team) => (
          <Card
            key={team.name}
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
                  primaryTypographyProps={{ variant: 'h6', fontWeight: 700 }}
                  secondaryTypographyProps={{ variant: 'subtitle1' }}
                />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Partners;
