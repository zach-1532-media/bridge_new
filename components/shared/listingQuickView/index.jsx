/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import Checkbox from '../myCheckBox';

const LQV = ({ job, children }) => {
  const listItems = [
    {
      text: 'Who we are:',
      value: job.business[0].bio,
    },
    {
      text: "What we're looking for: ",
      value: job.description,
    },
    {
      text: 'Responsibilities',
      value: job.responsibilities.map((item) => (
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
      value: job.qualifications.map((item) => (
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
      {listItems.map((item) => (
        <Box sx={{ mb: 3 }}>
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
  job: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default LQV;
