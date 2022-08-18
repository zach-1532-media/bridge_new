/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Logo({ colorInvert, width, height, button }) {
  return (
    <>
      {button ? (
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
                src={
                  colorInvert
                    ? 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1660223377/assets/TheBridge_logo_white_hghesl.svg'
                    : 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1660223434/assets/TheBridge_logo_knlog6.svg'
                }
                height={height}
                width={width}
              />
            </Button>
          </Link>
        </Box>
      ) : (
        <Image
          alt="company logo"
          src={
            colorInvert
              ? 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1660223377/assets/TheBridge_logo_white_hghesl.svg'
              : 'https://res.cloudinary.com/dci8xvvvp/image/upload/v1660223434/assets/TheBridge_logo_knlog6.svg'
          }
          height={height}
          width={width}
        />
      )}
    </>
  );
}

Logo.propTypes = {
  colorInvert: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  button: PropTypes.bool,
};

Logo.defaultProps = {
  colorInvert: false,
  height: 2000,
  width: 3000,
  button: true,
};

export default Logo;
