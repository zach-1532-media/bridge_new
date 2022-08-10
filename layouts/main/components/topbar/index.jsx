import React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/client';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Stack from '@mui/material/Stack';

import NavItem from './navItem';
import Logo from '../../../../components/shared/logo';

const Topbar = ({ openSidebar, onSidebarOpen, colorInvert = false }) => {
  const [session] = useSession();

  const navItems = [
    {
      title: 'Jobs',
      id: 'job-page',
      href: '/jobs',
    },
    {
      title: 'Resources',
      id: 'resources-page',
      href: '/resources',
    },
    {
      title: 'About',
      id: 'about-page',
      href: '/about',
    },
    {
      title: session ? null : 'Looking to hire?',
      id: session ? null : 'business-signup',
      href: session ? '/#' : '/businesses',
    },
  ];

  // const initial = !session ? null : session.user.email.slice(0, 1);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 1,
      }}
    >
      <Logo />
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Stack direction="row" spacing={4}>
          {navItems.map((item) => (
            <NavItem key={item.id} title={item.title} href={item.href} />
          ))}
        </Stack>
        <Link href="/dashboards/user/62bdc1724e66a090b6a1e791" passHref>
          <Button variant="contained" sx={{ ml: '4em' }}>
            Sign In
          </Button>
        </Link>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }, alignItems: 'center' }}>
        <IconButton
          disableRipple
          color="primary"
          onClick={() => onSidebarOpen(true)}
          aria-label="Menu"
        >
          {!openSidebar ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired,
  colorInvert: PropTypes.bool,
  openSidebar: PropTypes.bool.isRequired,
};

Topbar.defaultProps = {
  colorInvert: false,
};

export default Topbar;
