/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import {
  usStates,
  industries,
  employees,
  yearsInBusiness,
} from '../../../data';

const EditBusinessFields = ({ businessForm, setBusinessForm, errors }) => {
  const handleChange = (e) => {
    setBusinessForm({
      ...businessForm,
      [e.target.name]: e.target.value,
    });
  };
  const fields = [
    {
      fieldName: 'Business name',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.businessName ?? ''}
          size="small"
          variant="standard"
          name="businessName"
          onChange={handleChange}
          error={errors.businessName ? true : null}
          helperText={errors.businessName ? errors.businessName : null}
        />
      ),
    },
    {
      fieldName: 'Email',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.email ?? ''}
          size="small"
          variant="standard"
          name="email"
          onChange={handleChange}
          error={errors.email ? true : errors.regEmail ? true : null}
          helperText={
            errors.email
              ? errors.email
              : errors.regEmail
              ? errors.regEmail
              : null
          }
        />
      ),
    },
    {
      fieldName: 'Site',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.site ?? ''}
          size="small"
          variant="standard"
          name="site"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'First name',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.firstName ?? ''}
          size="small"
          variant="standard"
          name="firstName"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Last name',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.lastName ?? ''}
          size="small"
          variant="standard"
          name="lastName"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Street address',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.address ?? ''}
          size="small"
          variant="standard"
          name="address"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'City',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.city ?? ''}
          size="small"
          variant="standard"
          name="city"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'State',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.state ?? ''}
          select
          size="small"
          variant="standard"
          name="state"
          onChange={handleChange}
        >
          {usStates.map((state) => (
            <MenuItem key={state.name} value={state.abbreviation}>
              {state.abbreviation}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Zip',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.zip ?? ''}
          size="small"
          variant="standard"
          name="zip"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Bio',
      field: (
        <TextField
          multiline
          maxRows={10}
          sx={{ width: '75%', mb: '1em' }}
          value={businessForm.bio ?? ''}
          size="small"
          variant="standard"
          name="bio"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Industry',
      field: (
        <TextField
          sx={{ width: '75%' }}
          select
          value={businessForm.industry ?? ''}
          size="small"
          variant="standard"
          name="industry"
          onChange={handleChange}
        >
          {industries.map((industry) => (
            <MenuItem key={industry.name} value={industry.name}>
              {industry.name}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Years in business',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.yearsInBusiness ?? ''}
          select
          size="small"
          variant="standard"
          name="yearsInBusiness"
          onChange={handleChange}
        >
          {yearsInBusiness.map((years) => (
            <MenuItem key={years.range} value={years.range}>
              {years.range}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Employees',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={businessForm.employees ?? ''}
          select
          size="small"
          variant="standard"
          name="employees"
          onChange={handleChange}
        >
          {employees.map((employee) => (
            <MenuItem key={employee.range} value={employee.range}>
              {employee.range}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Typography variant="subtitle2">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
              <Box sx={{ pr: 3, pb: 2 }}>{field.fieldName}</Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              {field.field}
            </Grid>
          </Grid>
        </Typography>
      ))}
    </>
  );
};

EditBusinessFields.propTypes = {
  businessForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  setBusinessForm: PropTypes.func.isRequired,
};

export default EditBusinessFields;
