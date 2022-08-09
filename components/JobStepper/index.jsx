/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState, useContext } from 'react';

import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import PostAJobContext from '../contexts/postAJob';
import JobCard from '../shared/jobCard';
import JobWorkType from './components/jobWorkType';
import JobInformation from './components/listing';
import { steps } from '../shared/data';
import LQV from '../shared/listingQuickView';
import ProfileCard from '../shared/profileCard';

const JobStepper = ({ bio }) => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const formCtx = useContext(PostAJobContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [responsibilities, setResponsibilities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [form, setForm] = useState({
    job: '',
    city: '',
    state: '',
    salary: '',
    benefits: '',
    workType: '',
    description: '',
    hourlyRate: '',
    travel: '',
    jobTitle: '',
  });

  useEffect(() => {
    window.localStorage.setItem('jobForm', JSON.stringify(form));
  }, [form]);

  const jobs = {
    ...form,
    responsibilities,
    qualifications,
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const validate1 = () => {
    const err = {};

    if (!form.job) {
      err.job = 'Please select job.';
    }

    if (!form.workType) {
      err.workType = 'Please select work type';
    }

    return err;
  };

  const validate2 = () => {
    const err = {};

    if (!form.jobTitle) {
      err.jobTitle = 'Please enter a job title';
    }

    if (form.job === 'Full-Time') {
      if (!form.salary) {
        err.salary = 'Please select a salary range';
      }
    }

    if (form.job === 'Part-Time') {
      if (!form.hourlyRate) {
        form.hourlyRate = 'Please select an hourly rate range';
      }
    }

    if (!form.city) {
      err.city = 'Please enter a city';
    }

    if (!form.state) {
      err.state = 'Please select a State';
    }

    if (form.travel === false) {
      // do nothing
    } else if (!form.travel) {
      err.travel = 'Please select yes or no';
    }

    if (form.benefits === false) {
      // do nothing
    } else if (!form.benefits) {
      err.benefits = 'Please select yes or no';
    }

    if (!form.description) {
      err.description = 'Please describe this job';
    }

    return err;
  };

  const checkout = () => {
    router.replace(`/dashboards/business/checkout/${id}`);
    formCtx.newForm({ ...jobs });
  };

  useEffect(() => {
    if (isSubmitting) {
      if (activeStep === 0) {
        if (Object.keys(errors).length === 0) {
          handleNext();
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
        }
      } else if (activeStep === 1) {
        if (Object.keys(errors).length === 0) {
          handleNext();
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
        }
      } else if (activeStep === 2) {
        setIsSubmitting(false);
        formCtx.newForm({ ...jobs });
        router.replace(`/dashboards/business/checkout/${id}`);
      }
    } else {
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleErrors = (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      setErrors(validate1);
      setIsSubmitting(true);
    }
    if (activeStep === 1) {
      setErrors(validate2);
      setIsSubmitting(true);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ProfileCard title="Select Job and WorkType">
            <JobWorkType form={form} setForm={setForm} errors={errors} />
          </ProfileCard>
        );
      case 1:
        return (
          <ProfileCard
            title="Job Details"
            subtitle="Please fill out the job details below"
          >
            <JobInformation
              responsibilities={responsibilities}
              setResponsibilities={setResponsibilities}
              qualifications={qualifications}
              setQualifications={setQualifications}
              setForm={setForm}
              form={form}
              bio={bio}
              errors={errors}
            />
          </ProfileCard>
        );
      case 2:
        return (
          <ProfileCard
            title="Review Your Listing"
            subtitle="Review and confirm your listing before you checkout"
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  display="block"
                  width={1}
                  height={1}
                  sx={{
                    mb: '2em',
                    textDecoration: 'none',
                    transition: 'all .2s ease-in-out',
                    '&:hover': {
                      transform: `translateY(-${theme.spacing(1 / 2)})`,
                    },
                  }}
                >
                  <JobCard job={jobs} height={1} width={1}>
                    <LQV job={jobs} bio={bio} />
                  </JobCard>
                </Box>
              </Grid>
            </Grid>
          </ProfileCard>
        );
      default:
        return null;
    }
  };

  return (
    <Container sx={{ mt: '2em' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h2" fontWeight={600} gutterBottom>
          Post A Job
        </Typography>
        <Typography variant="body1" gutterBottom fontWeight={500}>
          Go through the stepper and post your job.
        </Typography>
      </Box>
      <Divider sx={{ mb: '2em', mt: '2em' }} />
      <Box width={1}>
        <Stepper
          activeStep={activeStep}
          sx={{ bgcolor: theme.palette.background.default }}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                width: '100%',
                '& .MuiButtonBase-root': {
                  position: 'relative',
                  bgcolor:
                    activeStep === index
                      ? theme.palette.primary.main
                      : theme.palette.background.default,
                  height: theme.spacing(6),
                  padding: theme.spacing(0, 3),
                  zIndex: 1,
                },
                '& .MuiStepLabel-label.Mui-active': {
                  color: theme.palette.common.white,
                },
                '& .MuiSvgIcon-root.Mui-active': {
                  color: theme.palette.common.white,
                  '& .MuiStepIcon-text': {
                    fill: theme.palette.primary.main,
                  },
                },
              }}
            >
              <StepButton onClick={handleStep(index)}>
                {isMd ? step.label : ''}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box
          sx={{
            mt: 2,
            mb: 1,
            p: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'cetner',
          }}
        >
          {getStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            variant="outlined"
            disableRipple
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button
            disableRipple
            variant="contained"
            onClick={activeStep === 2 ? checkout : handleErrors}
          >
            {activeStep === 2 ? 'Checkout' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

JobStepper.propTypes = {
  bio: PropTypes.string,
};

JobStepper.defaultProps = {
  bio: '',
};

export default JobStepper;
