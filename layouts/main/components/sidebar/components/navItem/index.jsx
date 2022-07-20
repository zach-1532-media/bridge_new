import React from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const NavItem = ({ title, href }) => (
  <Box>
    <Accordion
      disableGutters
      elevation={0}
      sx={{ backgroundColor: 'transparent' }}
    >
      <AccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ padding: 0 }}
      >
        <Link href={href} passHref>
          <Typography component="span" fontWeight="400" color="text.primary">
            {title}
          </Typography>
        </Link>
      </AccordionSummary>
    </Accordion>
  </Box>
);

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default NavItem;
