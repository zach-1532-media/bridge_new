/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import PropTypes from 'prop-types';

import Home from '../components/home';
import dbConnect from '../lib/dbConnect';
import User from '../models/User';

const Index = ({ users }) => <Home users={users} />;

export async function getServerSideProps() {
  await dbConnect();

  const users = await User.find({});

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

Index.propTypes = {
  users: PropTypes.array.isRequired,
};

export default Index;
