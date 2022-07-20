import React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/client';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import NavItem from './navItem';
import Logo from '../../../../components/shared/logo';

const Topbar = ({ openSidebar, onSidebarOpen, colorInvert = false }) => {
  const [session] = useSession();

  const initial = !session ? null : session.user.email.slice(0, 1);

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
        <Box>
          <NavItem
            title="Jobs"
            id="job-page"
            colorInvert={colorInvert}
            href="/jobs"
          />
        </Box>
        <Box marginLeft={4}>
          <NavItem
            title="Blog"
            id="blog"
            href="/blog"
            colorInvert={colorInvert}
          />
        </Box>
        {session ? (
          <></>
        ) : (
          <Box marginLeft={4}>
            <NavItem
              title="Looking to hire?"
              href="/businesses"
              id="business-signup"
              colorInvert={colorInvert}
            />
          </Box>
        )}
        <Box marginLeft={4}>
          {!session ? (
            <Link href="/users" passHref>
              <Button variant="contained" color="primary" size="large">
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href={`/${session.user.email}`} passHref>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  '&:hover': { cursor: 'pointer' },
                }}
              >
                {initial}
              </Avatar>
            </Link>
          )}
        </Box>
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
