/* eslint-disable react/forbid-prop-types */
import { React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Backdrop from '../../../shared/backdrop';
import { SuccessSnack, GeneralSnack } from '../../../shared/snackbars';
import {
  usStates,
  yearsInBusiness,
  employees,
  industries,
} from '../../../shared/data';

const General = ({ business }) => {
  const [form, setForm] = useState({
    businessName: business.businessName,
    email: business.email,
    firstName: business.firstName,
    lastName: business.lastName,
    bio: business.bio,
    city: business.city,
    address: business.address,
    state: business.state,
    industry: business.industry,
    yearsInBusiness: business.yearsInBusiness,
    employees: business.employees,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const router = useRouter();

  const updateInfo = async () => {
    try {
      const updateUserInfo = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      };
      const response = await fetch(
        `/api/business/${router.query.id}`,
        updateUserInfo
      );
      const data = await response.json();
      if (data.status === 200) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.reload();
      } else if (data.status === 400) {
        setIsSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
      }
    } catch (err) {
      setIsSubmitting(false);
      setOpenBackdrop(false);
      setGeneralError(true);
    }
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        setOpenBackdrop(true);
        updateInfo();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    ).test(form.email);

    if (!form.businessName) {
      err.title = 'Company name is required';
    }
    if (!form.email) {
      err.title = 'Email is required';
    }
    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <>
      <Container>
        <Box>
          <Typography variant="h4" fontWeight={500} gutterBottom>
            Update Profile
          </Typography>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Change your profile information
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Please read our{' '}
            <Link href="/terms" passHref>
              <Button
                variant="text"
                disableRipple
                sx={{
                  ml: -0.9,
                  mr: -0.9,
                  mb: 0.2,
                  '&:hover': { background: 'transparent' },
                }}
              >
                terms of use
              </Button>
            </Link>{' '}
            to be informed how we manage your private data.
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Business Name */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Company Name
                </Typography>
                <TextField
                  variant="outlined"
                  name="businessName"
                  fullWidth
                  value={form.businessName ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* First Name */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  First Name
                </Typography>
                <TextField
                  variant="outlined"
                  name="firstName"
                  fullWidth
                  value={form.firstName ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* Last Name */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Last Name
                </Typography>
                <TextField
                  variant="outlined"
                  name="lastName"
                  fullWidth
                  value={form.lastName ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Email
                </Typography>
                <TextField
                  variant="outlined"
                  name="email"
                  fullWidth
                  value={form.email ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* Industry */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Industry
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="industry"
                    value={form.industry ?? ''}
                    onChange={handleChange}
                  >
                    {industries.map((industry) => (
                      <MenuItem value={industry.name}>{industry.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Years In Business */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Years in business
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="yearsInBusiness"
                    value={form.yearsInBusiness ?? ''}
                    onChange={handleChange}
                  >
                    {yearsInBusiness.map((years) => (
                      <MenuItem value={years.range}>{years.range}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Amount of employees */}
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Employees
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="employees"
                    value={form.employees ?? ''}
                    onChange={handleChange}
                  >
                    {employees.map((employee) => (
                      <MenuItem value={employee.range}>
                        {employee.range}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Bio */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Bio
                </Typography>
                <TextField
                  variant="outlined"
                  name="bio"
                  multiline
                  rows={5}
                  fullWidth
                  value={form.bio ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              {/* City */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  City
                </Typography>
                <TextField
                  variant="outlined"
                  name="city"
                  fullWidth
                  value={form.city ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* State */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  State
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="state"
                    value={form.state ?? ''}
                    onChange={handleChange}
                  >
                    {usStates.map((state) => (
                      <MenuItem value={state.abbreviation}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Street Address */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 2 }} fontWeight={700}>
                  Street Address
                </Typography>
                <TextField
                  variant="outlined"
                  name="address"
                  fullWidth
                  value={form.address ?? ''}
                  onChange={handleChange}
                />
              </Grid>

              {/* Bottom Menu */}
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent="space-between"
                  width={1}
                  margin="0 auto"
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant="subtitle2">
                      You may also consider to update your{' '}
                      <Link href="/profile/business/billing/zach" passHref>
                        <Button
                          variant="text"
                          disableRipple
                          sx={{
                            ml: -0.9,
                            mr: -0.9,
                            mb: 0.2,
                            '&:hover': { background: 'transparent' },
                          }}
                        >
                          billing information.
                        </Button>
                      </Link>
                    </Typography>
                  </Box>
                  <Button size="large" variant="contained" type="submit">
                    Save
                  </Button>
                  <Button size="large" variant="contained">
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          <SuccessSnack
            openSuccess={openSuccess}
            setOpenSuccess={setOpenSuccess}
            user
          />
          <GeneralSnack
            generalError={generalError}
            setGeneralError={setGeneralError}
          />
          <Backdrop openBackdrop={openBackdrop} />
        </Box>
      </Container>
    </>
  );
};

General.propTypes = {
  business: PropTypes.object.isRequired,
};

export default General;
