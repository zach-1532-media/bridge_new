/* eslint-disable react/forbid-prop-types */
import { React, useContext } from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';

import SidebarMenu from './sidebarMenu';
import Scrollbar from '../../../components/shared/scrollbar';
import { SidebarContext } from '../../../components/contexts/sidebar';
import Logo from '../../../components/shared/logo';

const SidebarWrapper = styled(Card)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    background: ${theme.sidebar.background};
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        position: fixed;
        height: calc(100% - ${theme.spacing(8)});
        margin: ${theme.spacing(4, 0, 4, 4)};
        z-index: 10;
        border-radius: ${theme.general.borderRadius};
    }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        display: flex;
        height: 80px;
        align-items: center;
        margin: 0 ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar({ data, userPage }) {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: { xs: 'none', lg: 'inline-block' },
        }}
      >
        <TopSection>
          <Logo />
        </TopSection>
        <Box
          sx={{
            height: 'calc(100% - 80px)',
          }}
        >
          <Scrollbar>
            <Box pt={1}>
              <SidebarMenu data={data} userPage={userPage} />
            </Box>
          </Scrollbar>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          display: { lg: 'none', xs: 'inline-block' },
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbar>
            <TopSection>
              <Logo />
            </TopSection>
            <SidebarMenu data={data} userPage={userPage} />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

Sidebar.propTypes = {
  data: PropTypes.object.isRequired,
  userPage: PropTypes.bool.isRequired,
};

export default Sidebar;
