import { React, useState } from 'react';

import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

import Dash from '../../../../layouts/dash';
import dbConnect from '../../../../lib/dbConnect';
import Business from '../../../../models/Business';
import Job from '../../../../models/Job';
import User from '../../../../models/User';
import { modalStyle } from '../../../../components/shared/data';
import CustomNoRowsOverlay from '../../../../components/shared/noRows';

import Container from '../../../../components/front_components/container';
import PDFViewer from '../../../../components/pdf/singlePage';

const ViewApplicants = ({ business, job, applicants }) => {
  const [open, setOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
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
                setResumeUrl(params.value.resumeUrl);
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
      resumeUrl: applicant.resume,
    },
  }));

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
          <Typography variant="h2" fontWeight={600}>
            Applicants for {job.jobTitle}
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            Review applicants below.
          </Typography>
        </Box>
        <Box width={1}>
          <Divider sx={{ marginY: 4 }} />
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
              boxShadow: `0 3px 5px 2px rgba(128, 128, 128, .3)`,
              background: `linear-gradient(45deg, ${theme.palette.primary.lighter} 20%, ${theme.palette.tertiary.lighter} 90%)`,
              '& .MuiDataGrid-row:hover': {
                backgroundColor: theme.palette.alternate.main,
              },
              '& .MuiDataGrid-row:selected': {
                backgroundColor: theme.palette.tertiary.main,
              },
              '& .MuiDataGrid-row': {
                '&.Mui-selected': {
                  backgroundColor: theme.palette.alternate.main,
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.alternate.main,
                },
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
          <Box sx={{ ...modalStyle, width: 'auto' }}>
            <PDFViewer pdf={resumeUrl} />
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
