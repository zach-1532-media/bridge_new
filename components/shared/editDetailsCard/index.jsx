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
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';

import Backdrop from '../backdrop';
import EditBusinessFields from './components/editBusinessFields';
import EditUserFields from './components/editUserFields';

const EditDetailsCard = ({
  title,
  subtitle,
  data,
  business,
  setEdit,
  setOpenSuccess,
  setGeneralError,
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
  const [userJob, setUserJob] = useState(job);
  const [userSalary, setUserSalary] = useState(salary);
  const [userHourlyRate, setUserHourlyRate] = useState(hourlyRate);
  const [userWorkType, setUserWorkType] = useState(workType);
  const [isBusinessSubmitting, setIsBusinessSubmitting] = useState(false);
  const [isUserSubmitting, setIsUserSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [userErrors, setUserErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const router = useRouter();

  const theme = useTheme();

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
      const response = await fetch(`/api/users/${data.email}`, updateInfo);
      const editData = await response.json();
      if (editData.status === 200) {
        setIsUserSubmitting(false);
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.status === 400) {
        setIsUserSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.status === 409) {
        setIsUserSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      }
    } catch (err) {
      setIsUserSubmitting(false);
      setOpenBackdrop(false);
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
        setIsBusinessSubmitting(false);
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.replace(router.asPath);
        setEdit(false);
      } else if (editData.status === 400) {
        setIsBusinessSubmitting(false);
        setOpenBackdrop(false);
        setGeneralError(true);
        router.replace(router.asPath);
        setEdit(false);
      }
    } catch (err) {
      setIsBusinessSubmitting(false);
      setOpenBackdrop(false);
      setGeneralError(true);
      router.replace(router.asPath);
      setEdit(false);
    }
  };

  const effectErrors = business ? errors : userErrors;

  useEffect(() => {
    if (isBusinessSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateBusinessInfo();
      } else {
        setIsBusinessSubmitting(false);
      }
    } else if (isUserSubmitting) {
      if (isUserSubmitting) {
        if (Object.keys(userErrors).length === 0) {
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
    setOpenBackdrop(true);
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
        <Stack direction="row" spacing={2}>
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
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Save
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
            form={businessForm}
            setForm={setBusinessForm}
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
      <Backdrop open={openBackdrop} />
    </Card>
  );
};

EditDetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  business: PropTypes.bool,
  setEdit: PropTypes.func.isRequired,
  setOpenSuccess: PropTypes.func.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};

EditDetailsCard.defaultProps = {
  business: false,
};

export default EditDetailsCard;
