/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';

import CheckBox from '../../../shared/myCheckBox';

const MainSection = ({ job, business }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box>
          <Typography fontWeight={700} variant="h4" gutterBottom>
            {job.jobTitle}
          </Typography>
          <Typography variant="h6">
            {job.workType === 'Work From Home'
              ? 'Anywhere'
              : `${job.city}, ${job.state}`}{' '}
            - {job.job}
          </Typography>
        </Box>
        <Box display="flex" marginTop={{ xs: 2, md: 0 }}>
          <Button variant="contained" color="primary" size="large">
            Apply now
          </Button>
          <Box
            component={Button}
            variant="outlined"
            color="primary"
            size="large"
            marginLeft={2}
          >
            Refer a friend
          </Box>
        </Box>
      </Box>
      <Divider sx={{ marginY: 4 }} />
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={8}>
          <Box marginBottom={3}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Who we are
            </Typography>
            <Typography component="p">{business.bio}</Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              What we’re looking for
            </Typography>
            <Typography component="p">{job.description}</Typography>
          </Box>

          {/* Responsibilities */}
          {job.responsibilities.length === 0 ? (
            <></>
          ) : (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: '1em' }}>
                Primary Responsibilities
              </Typography>
              <Stack direction="column" spacing={2}>
                {job.responsibilities.map((jobResponsibility) => (
                  <Box
                    component={ListItem}
                    disableGutters
                    width="auto"
                    padding={0}
                    key={jobResponsibility.id}
                  >
                    <CheckBox />
                    <Typography component="p" sx={{ ml: '1em' }}>
                      {jobResponsibility.responsibility}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Qualifications */}
          {job.qualifications.length === 0 ? (
            <></>
          ) : (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: '1em' }}>
                Qualifications
              </Typography>
              <Stack direction="column" spacing={2}>
                {job.qualifications.map((jobQualfication) => (
                  <Box
                    component={ListItem}
                    disableGutters
                    width="auto"
                    padding={0}
                    key={job.qualification.id}
                  >
                    <CheckBox />
                    <Typography component="p" sx={{ ml: '1em' }}>
                      {jobQualfication.qualification}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={isMd ? 4 : 2} direction="column">
            <Grid item xs={12} data-aos="fade-up">
              <Box component={Card} bgcolor="primary.main">
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="text.primary"
                    sx={{ color: 'common.white' }}
                  >
                    You like what you’re reading?
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ color: 'common.white' }}
                  >
                    Get free online programing tips and resources delivered
                    directly to your inbox.
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
            <Grid item xs={12} data-aos="fade-up">
              <Box component={Card}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="text.primary">
                    Interactive decision support system
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={
                      <Box
                        component="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </Box>
                    }
                  >
                    View all
                  </Button>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

MainSection.propTypes = {
  job: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired,
};

export default MainSection;
