/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import CheckBox from '../../../../../shared/myCheckBox';
import {
  salaryBands,
  hourlyRateBands,
  usStates,
} from '../../../../../shared/data';

const Listing = ({
  responsibilities,
  setResponsibilities,
  qualifications,
  setQualifications,
  form,
  setForm,
  business,
}) => {
  // eslint-disable-next-line no-unused-vars
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'column', sm: 'row' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        width="100%"
      >
        <Stack
          direction="column"
          spacing={2}
          display="flex"
          sx={{
            width: '100%',
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* Job Title */}
            <TextField
              fullWidth
              label="Job Title"
              name="jobTitle"
              variant="outlined"
              value={form.jobTitle ?? ''}
              onChange={handleChange}
            />

            {/* Comp Select */}
            <FormControl fullWidth>
              <InputLabel id="comp-select-label">
                {form.job === 'Full-Time' ? 'Salary' : 'Hourly Rate'}
              </InputLabel>
              <Select
                labelId="comp-select-label"
                id="comp-select"
                label={form.job === 'Full-Time' ? 'Salary' : 'Hourly Rate'}
                name={form.job === 'Full-Time' ? 'salary' : 'hourlyRate'}
                value={
                  form.job === 'Full-Time'
                    ? form.salary ?? ''
                    : form.hourlyRate ?? ''
                }
                onChange={handleChange}
              >
                {form.job === 'Full-Time'
                  ? salaryBands.map((salaryBand, i) => (
                      <MenuItem value={salaryBand.range} key={i}>
                        {salaryBand.range}
                      </MenuItem>
                    ))
                  : hourlyRateBands.map((hourlyRateBand, i) => (
                      <MenuItem value={hourlyRateBand.range} key={i}>
                        {hourlyRateBand.range}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Stack>

          {form.workType === 'Work From Home' ? (
            <></>
          ) : (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                name="city"
                value={form.city ?? ''}
                onChange={handleChange}
              />

              {/* State */}
              <FormControl fullWidth>
                <InputLabel id="state-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  label="State"
                  name="state"
                  value={form.state ?? ''}
                  onChange={handleChange}
                >
                  {usStates.map((state, i) => (
                    <MenuItem key={i} value={state.name}>
                      {state.abbreviation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* Travel */}
            <FormControl fullWidth>
              <InputLabel id="travel-label">Travel</InputLabel>
              <Select
                labelId="travel-label"
                id="travel-select"
                label="Travel"
                name="travel"
                value={form.travel ?? ''}
                onChange={handleChange}
              >
                <MenuItem value={false} key={0}>
                  No
                </MenuItem>
                <MenuItem value key={1}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>

            {/* Benefits */}
            <FormControl fullWidth>
              <InputLabel id="benefits-label">Benefits</InputLabel>
              <Select
                labelId="benefits-label"
                id="benefits-select"
                label="Benefits"
                name="benefits"
                value={form.benefits ?? ''}
                onChange={handleChange}
              >
                <MenuItem value={false} key={0}>
                  No
                </MenuItem>
                <MenuItem value key={1}>
                  Yes
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ marginY: 4 }} />
      <Box marginBottom={3}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: '1em' }}>
          Who we are
        </Typography>
        <Typography component="span">{business.bio}</Typography>
      </Box>
      <Box marginBottom={3}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: '1em' }}>
          What we’re looking for
        </Typography>

        {/* Job Description */}
        <TextField
          fullWidth
          id="description"
          label="Job Description"
          variant="outlined"
          multiline
          minRows={2}
          value={form.description ?? ''}
          name="description"
          onChange={handleChange}
        />
      </Box>

      {/* Responsibilites List */}
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
          <Typography variant="h5" fontWeight={700}>
            Primary Responsibilities
          </Typography>
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
              <OutlinedInput
                fullWidth
                sx={{
                  ml: '1em',
                }}
                size="small"
                name="responsibility"
                value={responsibility.responsibility}
                onChange={(e) => handleChangeResponsibility(i, e)}
              />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Qualifications List */}
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
          <Typography variant="h5" fontWeight={700}>
            Qualifications
          </Typography>
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
              <OutlinedInput
                fullWidth
                sx={{
                  ml: '1em',
                }}
                size="small"
                name="qualification"
                value={qualification.qualification}
                onChange={(e) => handleChangeQualifications(i, e)}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Listing;
