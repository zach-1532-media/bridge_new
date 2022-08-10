import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Checkbox from '../myCheckBox';

const LQV = ({ job, children, bio, avatar, businessName }) => {
  const listItems = [
    {
      text: 'Who we are:',
      value: !bio ? job.business.bio : bio,
    },
    {
      text: "What we're looking for: ",
      value: job.description,
    },
    {
      text: 'Responsibilities',
      value: !job.responsibilities
        ? null
        : job.responsibilities.map((item) => (
            <Box
              component={ListItem}
              disableGutters
              width="auto"
              padding={0}
              key={item.id}
              sx={{ mb: '1em' }}
            >
              <Checkbox />
              <Typography variant="body1" sx={{ ml: '1em' }}>
                {item.responsibility}
              </Typography>
            </Box>
          )),
    },
    {
      text: 'Qualifications',
      value: !job.qualifications
        ? null
        : job.qualifications.map((item) => (
            <Box
              component={ListItem}
              disableGutters
              width="auto"
              padding={0}
              key={item.id}
              sx={{ mb: '1em' }}
            >
              <Checkbox />
              <Typography variant="body1" sx={{ ml: '1em' }}>
                {item.qualification}
              </Typography>
            </Box>
          )),
    },
  ];
  return (
    <Box id="LQV-Box">
      <Box
        id="LQVHeader-Box"
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
          {children}
        </Box>
      </Box>
      <Divider sx={{ marginY: 4 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: '3em', mt: '-1.5em', width: '100%' }}
      >
        <Typography variant="h2">Job Details: </Typography>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {avatar ? (
            <Avatar variant="rounded" alt="business logo" src={avatar} />
          ) : null}
          <Typography variant="body1">{businessName}</Typography>
        </Stack>
      </Stack>
      {listItems.map((item) => (
        <Box sx={{ mb: 3 }} key={item.text}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
            {item.text}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

LQV.propTypes = {
  job: PropTypes.shape({
    jobTitle: PropTypes.string,
    job: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    workType: PropTypes.string,
    description: PropTypes.string,
    avatar: PropTypes.string,
    businessName: PropTypes.string,
    responsibilities: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    ),
    qualifications: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    ),
  }).isRequired,
  bio: PropTypes.string,
  children: PropTypes.node,
};

LQV.defaultProps = {
  bio: '',
  children: null,
};

export default LQV;
