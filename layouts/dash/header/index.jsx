/* eslint-disable react/forbid-prop-types */
import { React, useContext } from 'react';

import PropTypes from 'prop-types';

import { Box, IconButton, Tooltip, styled } from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { SidebarContext } from '../../../components/contexts/sidebar';
import HeaderUserbox from './userbox';
import Logo from '../../../components/shared/logo';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        margin-top: ${theme.spacing(3)};
        position: relative;
        justify-content: space-between;
        width: 100%;
`
);

function Header({ data, userPage }) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

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
      <Box display="flex" alignItems="center">
        <HeaderUserbox data={data} userPage={userPage} />
        <Box
          component="span"
          sx={{
            display: { lg: 'none', xs: 'inline-block' },
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  data: PropTypes.object.isRequired,
  userPage: PropTypes.bool.isRequired,
};

export default Header;
