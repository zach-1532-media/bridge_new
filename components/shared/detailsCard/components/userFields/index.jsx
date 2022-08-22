/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-key */
/* eslint-disable spaced-comment */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Text from '../../../text';

const UserFields = ({ data }) => {
  const fields = [
    {
      field: 'Name',
      text: `${data.firstName ?? ''} ${data.lastName ?? ''}`,
    },
    {
      field: 'Email',
      text: `${data.email ?? ''}`,
    },
    {
      field: 'Address',
      text: `${data.address ?? ''}${data.address ? ',' : ''} ${
        data.city ?? ''
      }${data.city ? ',' : ''} ${data.state ?? ''}${data.state ? ',' : ''} ${
        data.zip ?? ''
      }`,
    },
    {
      field: 'Bio',
      text: `${data.bio ?? ''}`,
    },
    {
      field: 'Travel?',
      text: data.travel === true ? 'Yes' : data.travel === false ? 'No' : null,
    },
    {
      field: 'Benefits?',
      text:
        data.benefits === true ? 'Yes' : data.benefits === false ? 'No' : null,
    },
    {
      field: 'Work Preferences',
      text: data.job
        ? data.job.map((item) => (
            <Chip
              color="primary"
              sx={{ color: 'white', mr: '.5em' }}
              key={item}
              label={item}
            />
          ))
        : null,
    },
    {
      field: 'Work Type',
      text: data.workType
        ? data.workType.map((item) => (
            <Chip
              color="primary"
              sx={{ color: 'white', mr: '.5em' }}
              key={item}
              label={item}
            />
          ))
        : null,
    },
    {
      field: 'Salary Preferences',
      text: data.salary
        ? data.salary.map((item) => (
            <Chip
              color="primary"
              sx={{ color: 'white', mr: '.5em' }}
              key={item}
              label={item}
            />
          ))
        : null,
    },
    {
      field: 'Wage Preferences',
      text: data.hourlyRate
        ? data.hourlyRate.map((item) => (
            <Chip
              color="primary"
              sx={{ color: 'white', mr: '.5em' }}
              key={item}
              label={item}
            />
          ))
        : null,
    },
    //{
    //  field: data.job.includes('Full-Time') ? 'Salary Preferences' : null,
    //  text: data.job.includes('Full-Time')
    //    ? data.salary.map((item) => (
    //        <Chip
    //          color="primary"
    //          sx={{ color: 'white', mr: '.5em' }}
    //          key={item}
    //          label={item}
    //        />
    //      ))
    //    : null,
    //},
    //{
    //  field: data.job.includes('Part-Time') ? 'Wage Preferences' : null,
    //  text: data.job.includes('Part-Time')
    //    ? data.hourlyRate.map((item) => (
    //        <Chip
    //          color="primary"
    //          sx={{ color: 'white', mr: '.5em' }}
    //          key={item}
    //          label={item}
    //        />
    //      ))
    //    : null,
    //},
  ];

  return (
    <>
      {fields.map((field) => (
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box sx={{ pr: 3, pb: 2 }}>{field.field}</Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Text color="black">
                <b>{field.text}</b>
              </Text>
            </Grid>
          </Grid>
        </Typography>
      ))}
    </>
  );
};

UserFields.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserFields;
