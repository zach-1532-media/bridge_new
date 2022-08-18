import React from 'react';

import Image from 'next/image';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const HeroImage = () => {
  const theme = useTheme();
  return (
    <Grid item xs={12} md={6}>
      <Box height={1} width={1} display="flex" justifyContent="center">
        <Box
          height={1}
          width={1}
          maxWidth={{ xs: 600, md: '100%' }}
          maxHeight={500}
        >
          <Box
            sx={{
              filter:
                theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
            }}
          >
            <Image
              alt="applicant looking at themselves in the mirror"
              src="https://res.cloudinary.com/dci8xvvvp/image/upload/v1660228204/assets/career_cnbcey.svg"
              height={600}
              width={700}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default HeroImage;
