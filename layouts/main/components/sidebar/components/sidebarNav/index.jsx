import React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
          <NavItem title="Resources" href="/resources" />
        </Box>
        <Box>
          <NavItem title="About" href="/about" />
        </Box>
        {session ? null : (
          <Box>
            <NavItem title="Looking to hire?" href="/business" />
          </Box>
        )}
        {session ? null : (
          <Stack
            direction="column"
            spacing={2}
            sx={{
              mt: 2,
            }}
          >
            <Link href="/signUp/user" passHref>
              <Button
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                Signup
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button
                size="large"
                variant="outlined"
                color="tertiary"
                fullWidth
              >
                Login
              </Button>
            </Link>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default SidebarNav;
