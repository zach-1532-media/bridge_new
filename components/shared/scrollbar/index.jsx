/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import PropTypes from 'prop-types';

import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, useTheme } from '@mui/material';

const Scrollbar = ({ className, children, ...rest }) => {
  const theme = useTheme();

  return (
    <Scrollbars
      autoHide
      universal
      renderThumbVertical={() => (
        <Box
          sx={{
            width: 5,
            background: `${theme.colors.alpha.black[10]}`,
            borderRadius: `${theme.general.borderRadiusLg}`,
            transition: `${theme.transitions.create(['background'])}`,

            '&:hover': {
              background: `${theme.colors.alpha.black[30]}`,
            },
          }}
        />
      )}
      {...rest}
    >
      {children}
    </Scrollbars>
  );
};

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Scrollbar;
