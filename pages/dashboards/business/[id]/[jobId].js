import { React, useState } from 'react';

import { useRouter } from 'next/router';

import Iframe from 'react-iframe';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import Dash from '../../../../layouts/dash';
import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';
import Job from '../../../../models/Job';
import User from '../../../../models/User';
import { modalStyle } from '../../../../components/shared/data';

import ApplicantGrid from '../../../../components/applicantGrid';
import {
  SuccessSnack,
  GeneralSnack,
} from '../../../../components/shared/snackbars';
import Container from '../../../../components/front_components/container';

const ViewApplicants = ({ business, job, applicants }) => {
  const [open, setOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [message, setMessage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const updateApplicants = async (data, operation) => {
    const res = await fetch(`/api/jobs/${job._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        data,
      }),
    });
    const resData = await res.json();
    if (resData.case === 1) {
      router.replace(router.asPath);
      setOpenSuccess(true);
    } else if (resData.case === 2) {
      setGeneralError(true);
    }
  };

  const emailApplicants = async (data, operation, jobTitle) => {
    const res = await fetch('/api/emails/jobs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        data,
        jobTitle,
      }),
    });
    const resData = await res.json();
    if (resData.case === 1) {
      router.replace(router.asPath);
      setMessage(resData.message);
      setOpenSuccess(true);
    } else if (resData.case === 2) {
      setGeneralError(true);
    }
  };

  const handleClick = (e) => {
    const operation = e.currentTarget.name;
    if (operation === 'Delete') {
      updateApplicants(
        selectedRows.map((row) => row.id),
        operation,
      );
      emailApplicants(
        selectedRows.map((row) => row.email.email),
        'Reject',
        job.jobTitle,
      );
    } else {
      emailApplicants(
        selectedRows.map((row) => row.email.email),
        operation,
        job.jobTitle,
      );
    }
  };

  return (
    <Dash business={business} userPage={false}>
      <Container sx={{ mt: '-3em' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Typography variant="h2" fontWeight={600} sx={{ mb: '1em' }}>
            Applicants for {job.jobTitle}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Review applicants below.
          </Typography>
        </Box>
        <Box width={1}>
          <Divider sx={{ marginY: 4 }} />
          <ApplicantGrid
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            applicants={applicants}
            handleOpen={handleOpen}
            setResumeUrl={setResumeUrl}
          />
          {selectedRows.length > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  startIcon={<ThumbDownOffAltIcon />}
                  variant="contained"
                  color="error"
                  name="Delete"
                  onClick={handleClick}
                >
                  Send Rejection Email
                </Button>
                <Button
                  startIcon={<QuestionAnswerIcon />}
                  variant="contained"
                  color="primary"
                  name="Interview"
                  onClick={handleClick}
                >
                  Send Interview Email
                </Button>
                <Button
                  startIcon={<HandshakeIcon />}
                  variant="contained"
                  color="success"
                  name="Offer"
                  onClick={handleClick}
                >
                  Send Offer Email
                </Button>
              </Stack>
            </Box>
          ) : null}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="resume-modal"
          aria-describedby="pop-up-to-view-resume"
        >
          <Box
            sx={{
              ...modalStyle,
              width: { xs: '99%', md: '75%' },
              height: { xs: '99%', md: '75%' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  mt: '-1.5em',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            {resumeUrl ? (
              <Iframe
                url={resumeUrl}
                height="100%"
                width="100%"
                position="relative"
              />
            ) : (
              <Typography>No resume supplied</Typography>
            )}
          </Box>
        </Modal>
        <SuccessSnack
          openSuccess={openSuccess}
          setOpenSuccess={setOpenSuccess}
          message={message}
        />
        <GeneralSnack
          generalError={generalError}
          setGeneralError={setGeneralError}
          message={message}
        />
      </Container>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id, jobId } }) {
  await dbConnect();

  const businesses = await Business.findById(id);
  const job = await Job.findById(jobId).select('jobTitle');
  const applicantField = await Job.findById(jobId).select('applicants');
  const applicantArray = applicantField.applicants;

  const applicants = await User.aggregate()
    .match({
      _id: { $in: applicantArray },
    })
    .project(
      'firstName lastName email avatar resume twitter instagram linkedin',
    );

  return {
    props: {
      business: JSON.parse(JSON.stringify(businesses)),
      job: JSON.parse(JSON.stringify(job)),
      applicants: JSON.parse(JSON.stringify(applicants)),
    },
  };
}

ViewApplicants.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  business: PropTypes.object.isRequired,
  job: PropTypes.shape({
    _id: PropTypes.string,
    jobTitle: PropTypes.string,
  }).isRequired,
  applicants: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      avatar: PropTypes.string,
      resume: PropTypes.string,
      twitter: PropTypes.string,
      instagram: PropTypes.string,
    }),
  ).isRequired,
};

export default ViewApplicants;
