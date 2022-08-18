/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import SignUp from '../../../components/sign_up';
import SignUpForm from '../../../components/sign_up/form';

const BusinessSignIn = () => {
  return (
    <SignUp image="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660244688/assets/business_flognq.svg">
      <SignUpForm businessName />
    </SignUp>
  );
};

export default BusinessSignIn;
