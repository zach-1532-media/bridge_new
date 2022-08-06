import React from 'react';

import PropTypes from 'prop-types';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const MyModal = ({
  open,
  handleClose,
  ariaLabel,
  ariaDescription,
  children,
  overflow,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}
    >
      <Box
        id="main-box"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '99%', md: '75%' },
          height: { xs: '99%', md: '75%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow,
        }}
      >
        <Box
          id="closeIcon-header"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              mt: '-1.5em',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

MyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  ariaDescription: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  overflow: PropTypes.string,
};

MyModal.defaultProps = {
  overflow: '',
};

export default MyModal;
