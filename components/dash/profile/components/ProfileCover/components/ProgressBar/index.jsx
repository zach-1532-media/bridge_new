import React from 'react';

import PropTypes from 'prop-types';

import { LinearProgress, linearProgressClasses } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { alpha, useTheme, styled } from '@mui/material/styles';

const ProfileLinearProgress = styled(LinearProgress)(
  ({ theme }) => `
          height: 8px;
          border-radius: ${theme.general.borderRadiusLg};
  
          &.${linearProgressClasses.colorPrimary} {
              background-color: ${alpha(theme.palette.tertiary.main, 0.1)};
          }
          
          & .${linearProgressClasses.bar} {
              border-radius: ${theme.general.borderRadiusLg};
              background-color: ${theme.palette.tertiary.main};
          }
      `,
);

const ProgressBar = ({ percent }) => {
  const theme = useTheme();

  return (
    <Card sx={{ minWidth: { xs: '100%', md: '75%' } }}>
      <Box p={2.5} flexGrow={1}>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography color="text.primary" variant="h4" gutterBottom>
              Profile Progress
            </Typography>
          </Box>
        </Box>
        <ProfileLinearProgress variant="determinate" value={percent} />
        <Box
          display="flex"
          sx={{
            mt: 0.6,
          }}
          alignItems="center"
          justifyContent="right"
        >
          <Typography
            sx={{
              color: `${theme.colors.alpha.black[50]}`,
            }}
            variant="subtitle2"
          >
            {`${percent}% Complete`}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

ProgressBar.propTypes = {
  percent: PropTypes.number.isRequired,
};

export default ProgressBar;
