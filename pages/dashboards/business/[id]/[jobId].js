/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

import Dash from '../../../../layouts/dash';
import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';
import Job from '../../../../models/Job';
import User from '../../../../models/User';
import { modalStyle } from '../../../../components/shared/data';
import PDFViewer from '../../../../components/shared/pdfViewer';
import CustomNoRowsOverlay from '../../../../components/shared/noRows';

import Container from '../../../../components/front_components/container';

const ViewApplicants = ({ business, job, applicants }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 70 },
    {
      field: 'user',
      headerName: 'User',
      minWidth: 230,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Avatar sx={{ mr: '1em' }} src={params.value.avatar}>
              {!params.value.avatar ? params.value.initial : null}
            </Avatar>
            {params.value.username}
          </>
        );
      },
    },
    { field: 'email', headerName: 'E-mail', minWidth: 130, flex: 1 },
    {
      field: 'resume',
      headerName: '',
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              onClick={() => {
                setUrl(params.value.url);
                handleOpen();
              }}
            >
              View Resume
            </Button>
          </>
        );
      },
    },
  ];

  const newRows = applicants.map((applicant, i) => ({
    id: i,
    user: {
      username: `${applicant.firstName} ${applicant.lastName}`,
      avatar: applicant.avatar,
      initial: applicant.firstName[0],
    },
    email: applicant.email,
    resume: {
      url: applicant.resume,
    },
  }));

  return (
    <Dash business={business} userPage={false}>
      <Container>
        <Box sx={{ boxShadow: 2, height: 400, width: '100%' }}>
          <Typography sx={{ mb: '2em' }} variant="h3">
            Applicants for {job.jobTitle}
          </Typography>
          <DataGrid
            rows={newRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight={applicants.length !== 0}
            components={{
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.primary.lighter,
              },
            }}
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="resume-modal"
          aria-describedby="pop-up-to-view-resume"
        >
          <Box sx={{ ...modalStyle }}>
            <PDFViewer url={url} />
          </Box>
        </Modal>
      </Container>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id, jobId } }) {
  await dbConnect();

  const businesses = await Business.findById(id);
  const job = await Job.findById(jobId);
  const applicantField = await Job.findById(jobId).select('applicants');
  const applicantArray = applicantField.applicants;

  const applicants = await User.aggregate().match({
    _id: { $in: applicantArray },
  });

  return {
    props: {
      business: JSON.parse(JSON.stringify(businesses)),
      job: JSON.parse(JSON.stringify(job)),
      applicants: JSON.parse(JSON.stringify(applicants)),
    },
  };
}

ViewApplicants.propTypes = {
  business: PropTypes.object.isRequired,
  job: PropTypes.object.isRequired,
  applicants: PropTypes.array.isRequired,
};

export default ViewApplicants;
