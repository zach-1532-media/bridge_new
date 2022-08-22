import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from '../../components/front_components/container';

import Topbar from './components/topbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

const Main = ({ children, colorInvert, bgcolor }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box sx={{ background: theme.palette.background.paper }}>
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            colorInvert={trigger ? false : colorInvert}
            openSidebar={openSidebar}
          />
        </Container>
      </AppBar>
      <Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
      <Box sx={{ background: theme.palette.background.paper }}>
        {children}
        <Divider />
      </Box>
      <Box sx={{ background: theme.palette.background.paper }}>
        <Container paddingY={4}>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

Main.defaultProps = {
  colorInvert: false,
  bgcolor: 'transparent',
};

export default Main;
