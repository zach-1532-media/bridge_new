import React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import NavItem from '../navItem';
import Logo from '../../../../../../components/shared/logo';

const SidebarNav = () => {
  const [session] = useSession();

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Logo />
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box>
          <NavItem title="Jobs" href="/jobs" />
        </Box>
        <Box>
          <NavItem title="Blog" href="/blog" />
        </Box>
        {session ? (
          <></>
        ) : (
          <Box>
            <NavItem title="Looking to hire?" href="/businesses" />
          </Box>
        )}
        {session ? (
          <></>
        ) : (
          <Box marginTop={2}>
            <Link href="/userSignUp" passHref>
              <Button
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SidebarNav;
