import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItem from '@mui/material/ListItem';

import CheckBox from '../../../../../shared/myCheckBox';

import {
  hourlyRateBands,
  salaryBands,
  usStates,
  yesNo,
} from '../../../../../shared/data';

const JobInformation = ({
  form,
  setForm,
  errors,
  bio,
  responsibilities,
  setResponsibilities,
  qualifications,
  setQualifications,
}) => {
  const addResponsibility = (id) => {
    setResponsibilities([
      ...responsibilities,
      { id: responsibilities.length + 1, responsibility: '' },
    ]);
  };

  const deleteResponsibility = () => {
    const values = [...responsibilities];
    values.splice(-1, 1);
    setResponsibilities([...values]);
  };

  // eslint-disable-next-line no-unused-vars
  const addQualification = (id) => {
    setQualifications([
      ...qualifications,
      { id: qualifications.length + 1, qualification: '' },
    ]);
  };

  const deleteQualification = () => {
    const values = [...qualifications];
    values.splice(-1, 1);
    setQualifications([...values]);
  };

  const handleChangeResponsibility = (i, e) => {
    const values = [...responsibilities];
    values[i][e.target.name] = e.target.value;
    setResponsibilities(values);
  };

  const handleChangeQualifications = (i, e) => {
    const values = [...qualifications];
    values[i][e.target.name] = e.target.value;
    setQualifications(values);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fullTime = form.job === 'Full-Time' ? true : false;

  const fields = [
    {
      fieldName: 'Job Title',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.jobTitle ?? ''}
          size="small"
          variant="standard"
          name="jobTitle"
          onChange={handleChange}
          error={errors.jobTitle ? true : null}
          helperText={errors.jobTitle ? errors.jobTitle : null}
        />
      ),
    },
    {
      fieldName: fullTime ? 'Salary' : 'Hourly Rate',
      field: fullTime ? (
        <TextField
          sx={{ width: '75%' }}
          value={form.salary ?? ''}
          select
          size="small"
          variant="standard"
          name="salary"
          onChange={handleChange}
          error={errors.salary ? true : null}
          helperText={errors.salary ? errors.salary : null}
        >
          {salaryBands.map((salary) => (
            <MenuItem key={salary.range} value={salary.range}>
              {salary.range}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          sx={{ width: '75%' }}
          value={form.hourlyRate ?? ''}
          select
          size="small"
          variant="standard"
          name="hourlyRate"
          onChange={handleChange}
          error={errors.hourlyRate ? true : null}
          helperText={errors.hourlyRate ? errors.hourlyRate : null}
        >
          {hourlyRateBands.map((rate) => (
            <MenuItem key={rate.range} value={rate.range}>
              {rate.range}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'City',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.city ?? ''}
          size="small"
          variant="standard"
          name="city"
          onChange={handleChange}
          error={errors.city ? true : null}
          helperText={errors.city ? errors.city : null}
        />
      ),
    },
    {
      fieldName: 'State',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.state ?? ''}
          select
          size="small"
          variant="standard"
          name="state"
          onChange={handleChange}
          error={errors.state ? true : null}
          helperText={errors.state ? errors.state : null}
        >
          {usStates.map((state) => (
            <MenuItem key={state.name} value={state.name}>
              {state.abbreviation}
            </MenuItem>
          ))}
        </TextField>
      ),
    },
    {
      fieldName: 'Travel',
      field: (
        <TextField
          sx={{ width: '75%' }}
          value={form.travel ?? ''}
          select
          size="small"
          variant="standard"
          name="travel"
          onChange={handleChange}
          error={errors.travel ? true : null}
          helperText={errors.travel ? errors.travel : null}
        >
          {yesNo.map((bool) => (
            <MenuItem key={bool.text} value={bool.value}>
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
          sx={{ width: '75%', mb: '1em' }}
          value={form.benefits ?? ''}
          select
          size="small"
          variant="standard"
          name="benefits"
          onChange={handleChange}
          error={errors.benefits ? true : null}
          helperText={errors.benefits ? errors.benefits : null}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </TextField>
      ),
    },
    {
      fieldName: 'Who we are',
      field: (
        <Typography variant="body1" sx={{ mb: '1em' }}>
          {bio}
        </Typography>
      ),
    },
    {
      fieldName: "What we're looking for",
      field: (
        <TextField
          sx={{ width: '75%', mb: '1em' }}
          value={form.description ?? ''}
          size="small"
          variant="standard"
          multiline
          name="description"
          onChange={handleChange}
          error={errors.description ? true : null}
          helperText={errors.description ? errors.description : null}
        />
      ),
    },
    {
      fieldName: 'Responsibilities',
      field: (
        <Box marginBottom={3}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              mb: '1em',
            }}
          >
            <IconButton
              onClick={addResponsibility}
              disableRipple
              sx={{
                '&:hover': {
                  background: 'transparent',
                },
              }}
            >
              <AddIcon />
            </IconButton>
            {responsibilities.length === 0 ? (
              <></>
            ) : (
              <IconButton
                onClick={deleteResponsibility}
                disableRipple
                sx={{
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <Stack direction="column" spacing={2}>
            {responsibilities.map((responsibility, i) => (
              <Box
                component={ListItem}
                disableGutters
                width="auto"
                padding={0}
                key={i}
              >
                <CheckBox />
                <TextField
                  sx={{ width: '75%', ml: '1em' }}
                  variant="standard"
                  size="small"
                  size="small"
                  name="responsibility"
                  value={responsibility.responsibility}
                  onChange={(e) => handleChangeResponsibility(i, e)}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },
    {
      fieldName: 'Qualifications',
      field: (
        <Box marginBottom={3}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              mb: '1em',
            }}
          >
            <IconButton
              onClick={addQualification}
              disableRipple
              sx={{
                '&:hover': {
                  background: 'transparent',
                },
              }}
            >
              <AddIcon />
            </IconButton>
            {qualifications.length === 0 ? (
              <></>
            ) : (
              <IconButton
                onClick={deleteQualification}
                disableRipple
                sx={{
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <Stack direction="column" spacing={2}>
            {qualifications.map((qualification, i) => (
              <Box
                component={ListItem}
                disableGutters
                width="auto"
                padding={0}
                key={i}
              >
                <CheckBox />
                <TextField
                  sx={{ width: '75%', ml: '1em' }}
                  variant="standard"
                  size="small"
                  name="qualification"
                  value={qualification.qualification}
                  onChange={(e) => handleChangeQualifications(i, e)}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      ),
    },
  ];

  return (
    <>
      {fields.map((field, i) => (
        <Typography variant="subtitle2" key={i}>
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

JobInformation.propTypes = {
  form: PropTypes.object,
  setForm: PropTypes.func,
  errors: PropTypes.object,
  bio: PropTypes.string,
  responsibilities: PropTypes.array,
  qualifications: PropTypes.array,
  setResponsibilities: PropTypes.func,
  setQualifications: PropTypes.func,
};

export default JobInformation;
