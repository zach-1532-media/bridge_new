/* eslint-disable react/no-array-index-key */
import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

import Container from '../../../front_components/container';

const mock = [
  {
    title: 'Part-Time',
    price: '49',
    features: [
      {
        title: 'Job Posting Tool',
        isIncluded: true,
      },
      {
        title: 'Email Template Tool',
        isIncluded: true,
      },
      {
        title: 'Candidate Dashboard',
        isIncluded: true,
      },
    ],
    isHighlighted: true,
    btnText: 'Signup',
  },
  {
    title: 'Full-Time',
    price: '149',
    features: [
      {
        title: 'Job Posting Tool',
        isIncluded: true,
      },
      {
        title: 'Email Template Tool',
        isIncluded: true,
      },
      {
        title: 'Candidate Dashboard',
        isIncluded: true,
      },
    ],
    isHighlighted: true,
    btnText: 'Signup',
  },
];

const Pricing = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          {mock.map((item, i) => (
            <Card
              key={i}
              sx={{
                height: 1,
                display: 'flex',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardContent
                sx={{
                  p: { sm: 4 },
                }}
              >
                <Box
                  sx={{
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    guterbottom="true"
                    sx={{
                      fontWeight: 500,
                      fontSize: '1.25rem',
                      lineHeight: 1.6,
                      letterSpacing: '0.0075em',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Typography
                      color="primary"
                      sx={{
                        fontWeight: 400,
                        fontSize: '2.125rem',
                        lineHeight: 1.235,
                        letterSpacing: '0.00735em',
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontWeight: 600,
                          mr: 1 / 2,
                        }}
                      >
                        $
                      </Box>
                    </Typography>
                    <Typography
                      color="primary"
                      sx={{
                        fontWeight: 300,
                        fontSize: '3.75rem',
                        lineHeight: 1.2,
                        letterSpacing: '-0.00833em',
                      }}
                    >
                      {item.price}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      lineHeight: 1.57,
                      letterSpacing: '0.00714em',
                    }}
                    color="text.secondary"
                  >
                    Per Post
                  </Typography>
                </Box>
                <Grid container spacing={1}>
                  {item.features.map((feature, j) => (
                    <Grid item xs={12} key={j}>
                      <Typography
                        component="p"
                        align="center"
                        style={{
                          textDecoration: !feature.isIncluded
                            ? 'line-through'
                            : 'none',
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default Pricing;
