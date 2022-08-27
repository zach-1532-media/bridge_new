/* eslint-disable no-nested-ternary */
import React from 'react';

import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import Checkbox from '../myCheckBox';

const LQV = ({ job, children, bio, avatar, businessName, handleClose }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const listItems = [
    {
      text: 'Who we are:',
      value:
        !bio && router.pathname === '/dashboards/business/postAJob/[id]' ? (
          <Typography color="error">
            Please enter your business bio in your profile!
          </Typography>
        ) : !bio ? null : (
          bio
        ),
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
      <Stack direction="column" spacing={4}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Typography fontWeight={700} variant="h4" gutterBottom>
              {job.jobTitle}
            </Typography>
            <Typography variant="h6">
              {job.workType === 'Work From Home'
                ? 'Anywhere'
                : `${job.city}, ${job.state}`}{' '}
              - {job.job}
            </Typography>
          </Stack>
          <IconButton
            sx={{ '&:hover': { background: 'transparent' } }}
            onClick={handleClose}
          >
            <CloseIcon color="primary" />
          </IconButton>
        </Stack>
        {!isMd ? (
          <Stack
            direction="row"
            justifyContent={{ xs: 'space-between', md: 'left' }}
            spacing={2}
          >
            {children}
          </Stack>
        ) : null}

        {isMd ? (
          <Stack direction="row">
            <Stack
              direction="row"
              justifyContent={{ xs: 'space-between', md: 'left' }}
              spacing={2}
            >
              {children}
            </Stack>
            <Box sx={{ ml: 'auto' }}>
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
            </Box>
          </Stack>
        ) : null}
      </Stack>
      <Divider sx={{ marginY: 4 }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: '3em', mt: '-1.5em', width: '100%' }}
      >
        <Box sx={{ mt: '1em' }}>
          <Typography variant="h2">
            Job {!isMd ? <br /> : null} Details
          </Typography>
        </Box>
        {!isMd ? (
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
        ) : null}
      </Stack>
      {listItems.map((item) => (
        <Box sx={{ mb: 3 }} key={item.text}>
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
              {item.text}
            </Typography>
            <Divider sx={{ mt: '-.5em', mb: '2em', width: '75%' }} />
          </Box>
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
  handleClose: PropTypes.func.isRequired,
};

LQV.defaultProps = {
  bio: '',
  children: null,
};

export default LQV;
