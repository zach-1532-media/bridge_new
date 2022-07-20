/* eslint-disable object-shorthand */
/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

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

import { SuccessSnack, GeneralSnack } from '../../../shared/snackbars';
import Backdrop from '../../../shared/backdrop';
import JobCard from '../../../shared/jobCard';
import Listing from './components/listing';
import Selector from './components/selector';
import { steps } from '../../../shared/data';
import LQV from '../../../shared/listingQuickView';

const JobStepper = ({ business }) => {
  const router = useRouter();
  const { id } = router.query;

  const [activeStep, setActiveStep] = useState(0);
  const [responsibilities, setResponsibilities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [completed, setCompleted] = useState({});
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
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const jobs = {
    ...form,
    responsibilities: responsibilities,
    qualifications: qualifications,
    business: [business],
  };

  const createJob = async () => {
    try {
      const newJob = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          dateCreated: new Date(),
          businessID: id,
          responsibilities: responsibilities,
          qualifications: qualifications,
        }),
      };
      const response = await fetch('/api/jobs', newJob);
      const data = await response.json();
      if (data.status === 200) {
        setOpenBackdrop(false);
        setOpenSuccess(true);
        router.push(`/dashboards/business/postedJobs/${id}`);
      } else if (data.status === 400) {
        setOpenBackdrop(false);
        setGeneralError(true);
      }
    } catch (err) {
      setOpenBackdrop(false);
      setGeneralError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    createJob();
  };

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Selector form={form} setForm={setForm} />;
      case 1:
        return (
          <Listing
            responsibilities={responsibilities}
            setResponsibilities={setResponsibilities}
            qualifications={qualifications}
            setQualifications={setQualifications}
            form={form}
            setForm={setForm}
            business={business}
          />
        );
      case 2:
        return (
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
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <JobCard job={jobs} height={1} width={1}>
                  <LQV job={jobs} />
                </JobCard>
              </Box>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Button variant="contained" onClick={handleSubmit}>
            Pay And Post
          </Button>
        );
      default:
        return <></>;
    }
  };

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;

    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
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
              completed={completed[index]}
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
              <>
                <StepButton onClick={handleStep(index)}>
                  {isMd ? step.label : ''}
                </StepButton>
              </>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button variant="contained" disableRipple onClick={handleReset}>
                Submit
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                mt: 2,
                mb: 1,
                p: 2,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
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
              <Button disableRipple variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
      />
      <SuccessSnack
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}
        message="jobPost"
      />
      <Backdrop openBackdrop={openBackdrop} />
    </Container>
  );
};

JobStepper.propTypes = {
  business: PropTypes.object.isRequired,
};

export default JobStepper;
