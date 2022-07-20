/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { JobCardSVG1, JobCardSVG2, modalStyle } from '../data';

const JobCard = ({ job, height, width, children }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let color;

  if (job.job === 'Full-Time') {
    color = theme.palette.primary.main;
  } else if (job.job === 'Part-Time') {
    color = theme.palette.tertiary.main;
  }

  return (
    <Box
      component={Card}
      width={width}
      height={height}
      data-aos="fade-up"
      data-aos-offset={100}
      data-aos-duration={600}
      flexDirection="column"
      display="flex"
      sx={{
        '&:hover': {
          borderRight: `${theme.spacing(1 / 2)} solid ${color}`,
        },
      }}
    >
      <CardActionArea onClick={handleOpen}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Box
            sx={{
              pt: 1 / 2,
              pb: 1 / 2,
              pl: 1,
              pr: 1,
              mb: 2,
              bgcolor: `${color}`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{ color: theme.palette.common.white }}
            >
              {job.job}
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
            {job.jobTitle}
          </Typography>
          <Box display="flex" alignItems="center" marginY={1}>
            <JobCardSVG1 />
            <Typography variant="subtitle2" color="text.secondary">
              {job.workType === 'Work From Home'
                ? 'Anywhere'
                : `${job.city}, ${job.state}`}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <JobCardSVG2 />
            <Typography variant="subtitle2" color="text.secondary">
              {job.workType}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>{children}</Box>
      </Modal>
    </Box>
  );
};

JobCard.propTypes = {
  job: PropTypes.object,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default JobCard;
