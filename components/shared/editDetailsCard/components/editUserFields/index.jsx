/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-key */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';

import {
  usStates,
  jobs,
  workTypes,
  salaryBands,
  hourlyRateBands,
  yesNo,
} from '../../../data';

const EditUserFields = ({
  userForm,
  setUserForm,
  userJob,
  setUserJob,
  userSalary,
  setUserSalary,
  userHourlyRate,
  setUserHourlyRate,
  userWorkType,
  setUserWorkType,
  userErrors,
}) => {
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserJob(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleSalaryChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserSalary(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleHourlyChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserHourlyRate(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleWorkTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserWorkType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const fields = [
    {
      fieldName: 'First name',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={userForm.firstName ?? ''}
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
          value={userForm.lastName ?? ''}
          size="small"
          variant="standard"
          name="lastName"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Email',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={userForm.email ?? ''}
          size="small"
          variant="standard"
          name="email"
          onChange={handleChange}
          error={userErrors.email ? true : userErrors.regEmail ? true : null}
          helperText={
            userErrors.email
              ? userErrors.email
              : userErrors.regEmail
              ? userErrors.regEmail
              : null
          }
        />
      ),
    },
    {
      fieldName: 'Address',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={userForm.address ?? ''}
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
          value={userForm.city ?? ''}
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
          value={userForm.state ?? ''}
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
          value={userForm.zip ?? ''}
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
          sx={{ width: '75%' }}
          value={userForm.bio ?? ''}
          size="small"
          variant="standard"
          name="bio"
          onChange={handleChange}
        />
      ),
    },
    {
      fieldName: 'Travel',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={userForm.travel ?? ''}
          select
          size="small"
          variant="standard"
          name="travel"
          onChange={handleChange}
        >
          {yesNo.map((bool) => (
            <MenuItem key={bool.value} value={bool.value}>
              {bool.text}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Benefits',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={userForm.benefits ?? ''}
          select
          size="small"
          variant="standard"
          name="benefits"
          onChange={handleChange}
        >
          {yesNo.map((bool) => (
            <MenuItem key={bool.value} value={bool.value}>
              {bool.text}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Work Preferences',
      field: (
        <FormControl sx={{ mb: '1em', width: '75%' }}>
          <Select
            labelId="demo-multiple-chip-label"
            variant="standard"
            id="demo-multiple-chip"
            multiple
            value={userJob ?? ''}
            onChange={handleJobChange}
            input={<Input variant="standard" id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    sx={{ color: 'white' }}
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {jobs.map((job) => (
              <MenuItem key={job.job} value={job.job}>
                {job.job}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      fieldName: 'Work Type',
      field: (
        <FormControl sx={{ mb: '1em', width: '75%' }}>
          <Select
            labelId="demo-multiple-chip-label"
            variant="standard"
            id="demo-multiple-chip"
            multiple
            value={userWorkType ?? ''}
            onChange={handleWorkTypeChange}
            input={<Input variant="standard" id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    sx={{ color: 'white' }}
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {workTypes.map((type) => (
              <MenuItem key={type.type} value={type.type}>
                {type.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      fieldName: userJob.includes('Full-Time') ? 'Salary Preferences' : null,
      field: userJob.includes('Full-Time') ? (
        <FormControl sx={{ mb: '1em', width: '75%' }}>
          <Select
            labelId="demo-multiple-chip-label"
            variant="standard"
            id="demo-multiple-chip"
            multiple
            value={userSalary ?? ''}
            onChange={handleSalaryChange}
            input={<Input variant="standard" id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    sx={{ color: 'white' }}
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {salaryBands.map((salary) => (
              <MenuItem key={salary.range} value={salary.range}>
                {salary.range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      ),
    },
    {
      fieldName: userJob.includes('Part-Time') ? 'Wage Preferences' : null,
      field: userJob.includes('Part-Time') ? (
        <FormControl sx={{ mb: '1em', width: '75%' }}>
          <Select
            labelId="demo-multiple-chip-label"
            variant="standard"
            id="demo-multiple-chip"
            multiple
            value={userHourlyRate ?? ''}
            onChange={handleHourlyChange}
            input={<Input variant="standard" id="select-multiple-chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    color="primary"
                    sx={{ color: 'white' }}
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {hourlyRateBands.map((rate) => (
              <MenuItem key={rate.range} value={rate.range}>
                {rate.range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      ),
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
            <Box sx={{ pr: 3, pb: 2 }}>
              {' '}
              <Typography variant="h6" sx={{ fontWeight: 600, mt: '1em' }}>
                {field.fieldName}{' '}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={9}>
            {field.field}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

EditUserFields.propTypes = {
  userForm: PropTypes.object.isRequired,
  setUserForm: PropTypes.func.isRequired,
  userJob: PropTypes.array.isRequired,
  setUserJob: PropTypes.func.isRequired,
  userSalary: PropTypes.array.isRequired,
  setUserSalary: PropTypes.func.isRequired,
  userHourlyRate: PropTypes.array.isRequired,
  setUserHourlyRate: PropTypes.func.isRequired,
  userWorkType: PropTypes.array.isRequired,
  setUserWorkType: PropTypes.func.isRequired,
  userErrors: PropTypes.object.isRequired,
};

export default EditUserFields;
