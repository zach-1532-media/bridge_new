/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import BusinessFields from './components/businessFields';
import UserFields from './components/userFields';

const DetailsCard = ({ title, subtitle, data, business, setEdit }) => (
  <Card>
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
      <Button
        disableRipple
        variant="text"
        onClick={() => setEdit(true)}
        startIcon={<EditTwoToneIcon />}
        sx={{
          '&:hover': {
            background: 'transparent',
          },
        }}
      >
        Edit
      </Button>
    </Box>
    <Divider />

    <CardContent
      sx={{
        p: 4,
      }}
    >
      {business ? <BusinessFields data={data} /> : <UserFields data={data} />}
    </CardContent>
  </Card>
);

DetailsCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  business: PropTypes.bool,
  setEdit: PropTypes.func.isRequired,
};

DetailsCard.defaultProps = {
  business: false,
};

export default DetailsCard;
