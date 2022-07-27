/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PostedJobs = ({
  handleChange,
  value,
  children,
  title,
  subTitle,
  tabLabels,
}) => (
  <Container sx={{ mt: '2em' }}>
    <Box marginBottom={4}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h2" fontWeight={600} sx={{ mb: '.5em' }}>
          {title}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {subTitle}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          {tabLabels.map((label, i) => (
            <Tab disableRipple key={label} label={label} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
    </Box>
    {children}
  </Container>
);

PostedJobs.propTypes = {
  jobs: PropTypes.array,
  business: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  tabLabels: PropTypes.array,
  children: PropTypes.node,
  handleChange: PropTypes.func,
  value: PropTypes.number,
  setValue: PropTypes.func,
};

export default PostedJobs;
