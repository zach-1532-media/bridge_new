import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        title: 'The Bridge',
        width: { xs: 100, md: 120 },
      }}
    >
      <Link href="/" passHref>
        <Button
          disableRipple
          sx={{
            m: 0,
            padding: 0,
            '&:hover': {
              background: 'transparent',
            },
          }}
        >
          <Image
            alt="company logo"
            src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/Bridge.svg"
            height={2000}
            width={3000}
          />
        </Button>
      </Link>
    </Box>
  );
}

export default Logo;
