import React from 'react';

import PropTypes from 'prop-types';

import { Box, styled } from '@mui/material';
import Logo from '../../../components/shared/logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        margin-top: ${theme.spacing(3)};
        position: relative;
        justify-content: space-between;
        width: 100%;
`,
);

function Header({ links }) {
  return (
    <HeaderWrapper display="flex" alignItems="center">
      <Box display="flex" alignItems="center">
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <Logo />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {links}
      </Box>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  links: PropTypes.node.isRequired,
};

export default Header;
