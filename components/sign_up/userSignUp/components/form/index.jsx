/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';

import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';

const Form = ({ form, setForm, errors }) => {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setForm({
      ...form,
      showPassword: !form.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {/* Fields */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          required
          fullWidth
          id="first-name"
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleChange}
          error={errors.firstName ? true : null}
          helperText={errors.firstName ? errors.firstName : null}
        />
        <TextField
          required
          fullWidth
          id="last-name"
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleChange}
          error={errors.lastName ? true : null}
          helperText={errors.lastName ? errors.lastName : null}
        />
      </Stack>
      <TextField
        required
        id="email"
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        error={errors.email ? true : errors.regEmail ? true : null}
        helperText={
          errors.email ? errors.email : errors.regEmail ? errors.regEmail : null
        }
      />
      <FormControl>
        <InputLabel htmlFor="outined-adornment-password">Password *</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          label="Password *"
          name="password"
          type={form.showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          error={errors.password ? true : errors.regPassword ? true : null}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {form.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password || errors.regPassword ? (
          <FormHelperText error id="outlined-adornment-password-error">
            {errors.password
              ? errors.password
              : errors.regPassword
              ? errors.regPassword
              : null}
          </FormHelperText>
        ) : null}
      </FormControl>
    </>
  );
};

export default Form;
