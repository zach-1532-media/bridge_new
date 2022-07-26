/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-regex-literals */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

import EditBusinessFields from './components/editBusinessFields';
import EditUserFields from './components/editUserFields';

const EditDetailsCard = ({
  title,
  subtitle,
  data,
  setEdit,
  setOpenSuccess,
  setGeneralError,
  setMessage,
}) => {
  const [businessForm, setBusinessForm] = useState({
    businessName: data.businessName,
    site: data.site,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    bio: data.bio,
    industry: data.industry,
    yearsInBusiness: data.yearsInBusiness,
    employees: data.employees,
  });
  const [userForm, setUserForm] = useState({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    bio: data.bio,
    salary: data.salary,
    workType: data.workType,
    hourlyRate: data.workType,
    travel: data.travel,
    benefits: data.benefits,
  });
  const job = data.job ? data.job : [];
  const salary = data.salary ? data.salary : [];
  const hourlyRate = data.hourlyRate ? data.hourlyRate : [];
  const workType = data.workType ? data.workType : [];
  const [isLoading, setIsLoading] = useState(false);
  const [userJob, setUserJob] = useState(job);
  const [userSalary, setUserSalary] = useState(salary);
  const [userHourlyRate, setUserHourlyRate] = useState(hourlyRate);
  const [userWorkType, setUserWorkType] = useState(workType);
  const [isBusinessSubmitting, setIsBusinessSubmitting] = useState(false);
  const [isUserSubmitting, setIsUserSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [userErrors, setUserErrors] = useState({});
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();

  const business = router.pathname === '/dashboards/business/[id]';

  const updateUserInfo = async () => {
    try {
      const updateInfo = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userForm,
          job: userJob,
          salary: userSalary,
          hourlyRate: userHourlyRate,
          workType: userWorkType,
        }),
      };
      const response = await fetch(`/api/users/${data._id}`, updateInfo);
      const editData = await response.json();
      if (editData.code === 2) {
        setIsLoading(false);
        setIsUserSubmitting(false);
        setOpenSuccess(true);
        router.replace(router.asPath);
        setMessage(editData.message);
        setEdit(false);
      } else if (editData.code === 3) {
        setIsLoading(false);
        setIsUserSubmitting(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.code === 1) {
        setIsLoading(false);
        setIsUserSubmitting(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setMessage(editData.message);
        setEdit(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsUserSubmitting(false);
      setGeneralError(true);
      router.replace(router.asPath);
      setEdit(false);
    }
  };

  const updateBusinessInfo = async () => {
    try {
      const updateInfo = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessForm),
      };
      const response = await fetch(`/api/business/${data._id}`, updateInfo);
      const editData = await response.json();
      if (editData.status === 200) {
        setIsLoading(false);
        setIsBusinessSubmitting(false);
        setOpenSuccess(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.status === 400) {
        setIsLoading(false);
        setIsBusinessSubmitting(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsBusinessSubmitting(false);
      setGeneralError(true);
      router.replace(router.asPath);
      setEdit(false);
    }
  };

  const effectErrors = business ? errors : userErrors;

  useEffect(() => {
    if (isBusinessSubmitting) {
      if (Object.keys(errors).length === 0) {
        setIsLoading(true);
        updateBusinessInfo();
      } else {
        setIsBusinessSubmitting(false);
      }
    } else if (isUserSubmitting) {
      if (isUserSubmitting) {
        if (Object.keys(userErrors).length === 0) {
          setIsLoading(true);
          updateUserInfo();
        } else {
          setIsUserSubmitting(false);
        }
      }
    }
  }, [effectErrors]);

  const businessValidate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(businessForm.email);

    if (!businessForm.businessName) {
      err.businessName = 'Company name is required';
    }
    if (!businessForm.email) {
      err.email = 'Email is required';
    }
    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }

    return err;
  };

  const userValidate = () => {
    const err = {};
    const regEmail = new RegExp(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    ).test(userForm.email);

    if (!userForm.email) {
      err.email = 'Email is required';
    }
    if (!regEmail) {
      err.regEmail = 'Please enter a valid email address';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (business) {
      setIsBusinessSubmitting(true);
      setErrors(businessValidate());
    } else if (!business) {
      setIsUserSubmitting(true);
      setUserErrors(userValidate());
    }
  };

  return (
    <Card>
      <Box
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Box>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ ml: { xs: '1em' } }}
          spacing={2}
        >
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            loading={isLoading}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
          <Button
            sx={{
              color: theme.colors.error.main,
              '&:hover': {
                background: theme.colors.error.lighter,
              },
            }}
            onClick={() => setEdit(false)}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
      <Divider />

      <CardContent
        sx={{
          p: 4,
        }}
      >
        {business ? (
          <EditBusinessFields
            businessForm={businessForm}
            setBusinessForm={setBusinessForm}
            errors={errors}
          />
        ) : (
          <EditUserFields
            userForm={userForm}
            setUserForm={setUserForm}
            userJob={userJob}
            setUserJob={setUserJob}
            userSalary={userSalary}
            setUserSalary={setUserSalary}
            userHourlyRate={userHourlyRate}
            setUserHourlyRate={setUserHourlyRate}
            userWorkType={userWorkType}
            setUserWorkType={setUserWorkType}
            userErrors={userErrors}
          />
        )}
      </CardContent>
      {isXs ? (
        <Box
          sx={{
            display: 'flex',
            width: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            loading={isLoading}
            sx={{
              width: '75%',
              mb: '1em',
            }}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
        </Box>
      ) : null}
    </Card>
  );
};

EditDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  setEdit: PropTypes.func.isRequired,
  setOpenSuccess: PropTypes.func.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};

export default EditDetailsCard;
