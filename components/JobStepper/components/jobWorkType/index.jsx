import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { workTypes, jobs } from '../../../shared/data';

const JobWorkType = ({ form, setForm, errors }) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fields = [
    {
      fieldName: 'Select Job',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.job ?? ''}
          select
          size="small"
          variant="standard"
          name="job"
          onChange={handleChange}
          error={errors.job ? true : null}
          helperText={errors.job ? errors.job : null}
        >
          {jobs.map((job) => (
            <MenuItem key={job.job} value={job.job}>
              {job.job}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Select WorkType',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.workType ?? ''}
          select
          size="small"
          variant="standard"
          name="workType"
          onChange={handleChange}
          error={errors.workType ? true : null}
          helperText={errors.workType ? errors.workType : null}
        >
          {workTypes.map((type) => (
            <MenuItem key={type.type} value={type.type}>
              {type.type}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <Typography variant="subtitle2" key={field.fieldName}>
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

JobWorkType.propTypes = {
  form: PropTypes.shape({
    job: PropTypes.string,
    workType: PropTypes.string,
  }).isRequired,
  setForm: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    job: PropTypes.string,
    workType: PropTypes.string,
  }),
};

JobWorkType.defaultProps = {
  errors: {
    job: '',
    workType: '',
  },
};

export default JobWorkType;
