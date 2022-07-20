import React from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';

const JobCard = ({ businessName, email, id }) => (
  <Card
    sx={{
      minWidth: 245,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      background: '#F5F5F5',
    }}
  >
    <CardContent>
      <Typography variant="h6">{businessName}</Typography>
      <br />
      <Typography variant="body2">{email}</Typography>
      <Link href={`/dashboards/business/${id}`} passHref>
        <Button sx={{ m: '1em' }} variant="outlined">
          Profile
        </Button>
      </Link>
    </CardContent>
  </Card>
);

JobCard.propTypes = {
  businessName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default JobCard;
