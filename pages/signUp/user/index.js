/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import SignUp from '../../../components/sign_up';
import SignUpForm from '../../../components/sign_up/form';

const UserSignUp = () => {
  return (
    <SignUp image="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660228349/assets/contentCreator_e1khoe.svg">
      <SignUpForm />
    </SignUp>
  );
};

export default UserSignUp;
