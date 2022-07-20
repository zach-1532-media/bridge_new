/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { workTypes, jobs } from '../../../../../shared/data';

const Selector = ({ form, setForm }) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        width: '50vw',
      }}
    >
      {/* Job Select */}
      <FormControl fullWidth>
        <InputLabel id="job-select">Select Job</InputLabel>
        <Select
          labelId="job-select-label"
          id="job-select"
          value={form.job ?? ''}
          name="job"
          label="Select Job"
          onChange={handleChange}
          sx={{ mb: '1em' }}
        >
          {jobs.map((job) => (
            <MenuItem key={job.job} value={job.job}>
              {job.job}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Work Type */}
      <FormControl fullWidth>
        <InputLabel id="work-type-label">Work Type</InputLabel>
        <Select
          labelId="work-type-label"
          id="work-type-select"
          label="Work Type"
          name="workType"
          value={form.workType ?? ''}
          onChange={handleChange}
        >
          {workTypes.map((workType) => (
            <MenuItem key={workType.type} value={workType.type}>
              {workType.type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

Selector.propTypes = {
  form: PropTypes.object.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default Selector;
