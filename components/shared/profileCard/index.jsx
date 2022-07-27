/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

const ProfileCard = ({ children, title, subtitle, button, noHeader }) => (
  <Card sx={{ minWidth: '95%' }}>
    <Box
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Box>
      {button}
    </Box>
    {!noHeader ? <Divider /> : <></>}

    <CardContent
      sx={{
        p: 4,
      }}
    >
      {children}
    </CardContent>
  </Card>
);

ProfileCard.propTypes = {
  children: PropTypes.node.isRequired,
  button: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  data: PropTypes.object,
  business: PropTypes.bool,
  setEdit: PropTypes.func,
};

ProfileCard.defaultProps = {
  business: false,
};

export default ProfileCard;
