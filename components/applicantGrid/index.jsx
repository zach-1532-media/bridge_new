import React from 'react';

import PropTypes from 'prop-types';

import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useMediaQuery from '@mui/material/useMediaQuery';

import CustomNoRowsOverlay from '../shared/noRows';

const ApplicantGrid = ({
  setSelectedRows,
  applicants,
  handleOpen,
  setResumeUrl,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleMail = (email) => {
    window.location.href = `mailto:${email}?subject=Job posting follow up.`;
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'applicant',
      headerName: 'Applicant',
      minWidth: 200,
      flex: isMd ? 1 : null,
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
    {
      field: 'email',
      headerName: 'E-mail',
      renderCell: (params) => {
        return (
          <Button
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            onClick={() => {
              handleMail(params.value.email);
            }}
          >
            {isMd ? params.value.email : 'Click to email'}
          </Button>
        );
      },
      minWidth: 230,
      flex: isMd ? 1 : null,
    },
    {
      field: 'resume',
      headerName: '',
      minWidth: 90,
      flex: isMd ? 1 : null,
      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            spacing={2}
          >
            <Button
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
              onClick={() => {
                setResumeUrl(params.value.resumeUrl);
                handleOpen();
              }}
            >
              View Resume
            </Button>
            {params.value.twitter ? (
              <IconButton
                href={params.value.twitter}
                target="_blank"
                sx={{ '&:hover': { background: 'transparent' } }}
              >
                <TwitterIcon sx={{ color: '#1DA1F2' }} />
              </IconButton>
            ) : null}
            {params.value.instagram ? (
              <IconButton
                href={params.value.instagram}
                target="_blank"
                sx={{ '&:hover': { background: 'transparent' } }}
              >
                <InstagramIcon sx={{ color: '#fb3958' }} />
              </IconButton>
            ) : null}
            {params.value.linkedin ? (
              <IconButton
                href={params.value.linkedin}
                target="_blank"
                sx={{ '&:hover': { background: 'transparent' } }}
              >
                <LinkedInIcon sx={{ color: '#0072b1' }} />
              </IconButton>
            ) : null}
          </Stack>
        );
      },
    },
  ];

  const rows = applicants.map((applicant) => ({
    id: applicant._id,
    applicant: {
      username: `${applicant.firstName} ${applicant.lastName}`,
      avatar: applicant.avatar,
      initial: applicant.firstName[0],
    },
    email: { email: applicant.email },
    resume: {
      resumeUrl: applicant.resume,
      twitter: applicant.twitter,
      instagram: applicant.instagram,
      linkedin: applicant.linkedin,
    },
  }));
  return (
    <DataGrid
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
      autoHeight={applicants.length !== 0}
      onSelectionModelChange={(ids) => {
        const selectedIDs = new Set(ids);
        const sRows = rows.filter((row) => selectedIDs.has(row.id));
        setSelectedRows(sRows);
      }}
      components={{
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      sx={{
        mb: '4.5em',
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
  );
};

ApplicantGrid.propTypes = {
  setSelectedRows: PropTypes.func.isRequired,
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

export default ApplicantGrid;
