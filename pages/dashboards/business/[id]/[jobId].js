import { React, useState } from 'react';

import { useRouter } from 'next/router';

import { getSession } from 'next-auth/client';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import HandshakeIcon from '@mui/icons-material/Handshake';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import Dash from '../../../../layouts/dash';
import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';
import Jobs from '../../../../models/Jobs';
import User from '../../../../models/User';

import MenuItems from '../../../../components/shared/layoutLinks/items';
import UserBoxLinks from '../../../../components/shared/layoutLinks/links';
import ApplicantList from '../../../../components/applicantList';
import {
  SuccessSnack,
  GeneralSnack,
} from '../../../../components/shared/snackbars';
import Container from '../../../../components/front_components/container';

const ViewApplicants = ({ sessionData, job, applicants }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();
  const { id } = router.query;

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
      setSelectedRows([]);
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
      setSelectedRows([]);
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
        selectedRows.map((row) => row.email),
        operation,
        job.jobTitle,
      );
    } else {
      emailApplicants(
        selectedRows.map((row) => row.email),
        operation,
        job.jobTitle,
      );
    }
  };

  return (
    <Dash
      data={sessionData}
      items={<MenuItems id={id} type="business" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={sessionData.avatar}
          sessionName={sessionData.sessionName}
          type="business"
          businessName={sessionData.businessName}
        />
      }
    >
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

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ApplicantList
              applicants={applicants}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
            />
          </Box>

          {selectedRows.length > 0 ? (
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              justifyContent={{ xs: 'center', md: 'right' }}
              sx={{ mt: '2em' }}
              spacing={2}
            >
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
                color="warning"
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
          ) : null}
        </Box>
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

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (session.type === 'user') {
    return {
      redirect: {
        destination: `/dashboards/user/${session.id}`,
        permanent: false,
      },
    };
  }

  const { id, jobId } = ctx.query;

  await dbConnect();

  const businesses = await Business.findById(id);
  const job = await Jobs.findById(jobId).select('jobTitle');
  const applicantField = await Jobs.findById(jobId).select('applicants');
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
      sessionData: JSON.parse(JSON.stringify(businesses)),
      job: JSON.parse(JSON.stringify(job)),
      applicants: JSON.parse(JSON.stringify(applicants)),
    },
  };
}

ViewApplicants.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  sessionData: PropTypes.object.isRequired,
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
