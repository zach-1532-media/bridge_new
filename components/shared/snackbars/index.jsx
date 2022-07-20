/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable import/prefer-default-export */
import React from 'react';

import PropTypes from 'prop-types';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const SuccessSnack = ({ openSuccess, setOpenSuccess, message }) => {
  const handleSuccessClose = () => setOpenSuccess(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={openSuccess}
      autoHideDuration={6000}
      onClose={handleSuccessClose}
    >
      <Alert severity="success">
        {message === 'user'
          ? 'Your account has been created!'
          : message === 'newsletter'
          ? "You're all signed up!"
          : message === 'edit'
          ? 'Profile has been updated'
          : message === 'jobPost'
          ? 'Job has been posted!'
          : null}
      </Alert>
    </Snackbar>
  );
};

SuccessSnack.propTypes = {
  openSuccess: PropTypes.bool.isRequired,
  setOpenSuccess: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export const ExistingUserSnack = ({
  existingUserError,
  setexistingUserError,
}) => {
  const handleExistingUserErrorClose = () => setexistingUserError(false);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={existingUserError}
      autoHideDuration={6000}
      onClose={handleExistingUserErrorClose}
    >
      <Alert severity="error">User already exists!</Alert>
    </Snackbar>
  );
};

ExistingUserSnack.propTypes = {
  existingUserError: PropTypes.bool.isRequired,
  setexistingUserError: PropTypes.func.isRequired,
};

export const ExistingBusinessSnack = ({
  existingBusinessError,
  setexistingBusinessError,
}) => {
  const handleExistingBusinessErrorClose = () =>
    setexistingBusinessError(false);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={existingBusinessError}
      autoHideDuration={6000}
      onClose={handleExistingBusinessErrorClose}
    >
      <Alert severity="error">Business already exists!</Alert>
    </Snackbar>
  );
};

ExistingBusinessSnack.propTypes = {
  existingBusinessError: PropTypes.bool.isRequired,
  setexistingBusinessError: PropTypes.func.isRequired,
};

export const ExistingNewsletterSnack = ({
  existingNewsletterError,
  setExistingNewsletterError,
}) => {
  const handleExistingNewsletterErrorClose = () =>
    setExistingNewsletterError(false);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={existingNewsletterError}
      autoHideDuration={6000}
      onClose={handleExistingNewsletterErrorClose}
    >
      <Alert severity="error">Already signed up!</Alert>
    </Snackbar>
  );
};

ExistingNewsletterSnack.propTypes = {
  existingNewsletterError: PropTypes.bool.isRequired,
  setExistingNewsletterError: PropTypes.func.isRequired,
};

export const NoUserSnack = ({ openNoUser, setOpenNoUser }) => {
  const handleNoUserClose = () => setOpenNoUser(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={openNoUser}
      autoHideDuration={6000}
      onClose={handleNoUserClose}
    >
      <Alert severity="error">No user with that email exists!</Alert>
    </Snackbar>
  );
};

NoUserSnack.propTypes = {
  openNoUser: PropTypes.bool.isRequired,
  setOpenNoUser: PropTypes.func.isRequired,
};

export const GeneralSnack = ({ generalError, setGeneralError }) => {
  const handleGeneralErrorClose = () => setGeneralError(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={generalError}
      autoHideDuration={6000}
      onClose={handleGeneralErrorClose}
    >
      <Alert severity="error">
        There was an error connecting - please try again later.
      </Alert>
    </Snackbar>
  );
};

GeneralSnack.propTypes = {
  generalError: PropTypes.bool.isRequired,
  setGeneralError: PropTypes.func.isRequired,
};
