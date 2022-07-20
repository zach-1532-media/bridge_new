import React from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';

const UserCard = ({ firstName, lastName, email, id }) => {
  const name = `${firstName} ${lastName}`;

  return (
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
      <Link href={`/dashboards/user/${id}`} passHref>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">{name}</Typography>
            <br />
            <Typography variant="body2">{email}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

UserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default UserCard;
