/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BusinessFields = ({ data }) => {
  const fields = [
    {
      field: 'Business name',
      text: `${data.businessName ?? ''}`,
    },
    {
      field: 'Email',
      text: `${data.email ?? ''}`,
    },
    {
      field: 'Name',
      text: `${data.firstName ?? ''} ${data.lastName ?? ''}`,
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
      field: 'Industry',
      text: `${data.industry ?? ''}`,
    },
    {
      field: 'Years in business',
      text: `${data.yearsInBusiness ?? ''}`,
    },
    {
      field: 'Employees',
      text: `${data.employees ?? ''}`,
    },
  ];

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {fields.map((field) => (
        <Grid container spacing={0} key={field.field}>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            <Box sx={{ pr: 3, pb: 2 }}>
              {' '}
              <Typography variant="h6" sx={{ fontWeight: 600, mt: '1em' }}>
                {field.field} {isXs ? <Divider /> : null}
              </Typography>
            </Box>
          </Grid>
          <Typography variant="subtitle2">
            {isXs ? (
              <Stack direction="column" spacing={1}>
                {field.text}
              </Stack>
            ) : (
              <Box sx={{ pt: 1.5 }}>{field.text}</Box>
            )}
          </Typography>
        </Grid>
      ))}
    </>
  );
};

BusinessFields.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BusinessFields;
