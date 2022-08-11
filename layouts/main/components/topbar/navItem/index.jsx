import React from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavItem = ({ href, title, id, colorInvert }) => {
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box
        aria-describedby={id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <Link href={href} passHref>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '1.25em',
            }}
            fontWeight={400}
            color={linkColor}
          >
            {title}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  colorInvert: PropTypes.bool,
  href: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  colorInvert: false,
};

export default NavItem;
