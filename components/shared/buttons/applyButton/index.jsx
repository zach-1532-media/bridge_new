/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';

const ApplyButton = ({ appliedJobs, id, setApplyId }) => (
  <>
    {appliedJobs.includes(`${id}`) ? (
      <Button variant="contained">Applied!</Button>
    ) : (
      <Button variant="contained" onClick={() => setApplyId(id)}>
        Apply
      </Button>
    )}
  </>
);

ApplyButton.propTypes = {
  appliedJobs: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  setApplyId: PropTypes.func.isRequired,
};

export default ApplyButton;
