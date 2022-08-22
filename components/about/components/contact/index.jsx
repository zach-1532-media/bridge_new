import React from 'react';

import Iframe from 'react-iframe';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Container from '../../../front_components/container';

const contacts = [
  {
    label: 'Phone',
    value: '614-937-8563',
    icon: <LocalPhoneIcon />,
  },
  {
    label: 'Email',
    value: 'support@connectatthebridge.com',
    icon: <EmailIcon />,
  },
  {
    label: 'Address',
    value: 'Columbus, Ohio',
    icon: <LocationOnIcon />,
  },
];

const Contact = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                position: 'relative',
              }}
            >
              <Box width={1} order={{ xs: 2, md: 1 }}>
                <Container>
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, mb: '1em' }}
                      >
                        Contact Us
                      </Typography>
                      {/* <Typography sx={{ color: theme.palette.text.secondary }}>
                        Rather than worrying about switching offices every
                        couple years, you can instead stay in the same location
                        and grow-up from your shared coworking space to an
                        office that takes up an entire floor.
                      </Typography> */}
                    </Box>
                    <Stack
                      direction="column"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      {contacts.map((item) => (
                        <Box
                          key={item.label}
                          component={ListItem}
                          disableGutters
                          width="auto"
                          padding={0}
                        >
                          <Box
                            component={ListItemAvatar}
                            minWidth="auto !important"
                            marginRight={2}
                          >
                            <Box
                              component={Avatar}
                              bgcolor={theme.palette.secondary.main}
                              width={40}
                              height={40}
                            >
                              {item.icon}
                            </Box>
                          </Box>
                          <ListItemText
                            primary={item.label}
                            secondary={item.value}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Container>
              </Box>
              <Box
                sx={{
                  flex: { xs: '0 0 100%', md: '0 0 50%' },
                  position: 'relative',
                  maxWidth: { xs: '100%', md: '50%' },
                  order: { xs: 1, md: 2 },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 1, md: '50vw' },
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                        left: '0%',
                        width: 1,
                        height: 1,
                        position: { xs: 'relative', md: 'absolute' },
                      }}
                    >
                      <Iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src="https://maps.google.com/maps?width=100%&height=100%&hl=en&q=Columbus&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                        styles={{
                          minHeight: 300,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
          <Divider />
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
