import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const photos = [
  {
    src: 'https://assets.maccarianagency.com/backgrounds/img25.jpg',
    rows: 1,
    cols: 2,
  },
  {
    src: 'https://assets.maccarianagency.com/backgrounds/img22.jpg',
    rows: 1,
    cols: 1,
  },
  {
    src: 'https://assets.maccarianagency.com/backgrounds/img24.jpg',
    rows: 1,
    cols: 1,
  },
  {
    src: 'https://assets.maccarianagency.com/backgrounds/img21.jpg',
    rows: 1,
    cols: 2,
  },
];

const socials = [
  {
    ariaLabel: 'Facebook',
    icon: <FacebookIcon />,
  },
  {
    ariaLabel: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    ariaLabel: 'Twitter',
    icon: <TwitterIcon />,
  },
];

const Content = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box sx={{ px: { xs: 0, sm: 4, md: 6 } }}>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.75,
            letterSpacing: '0.00938em',
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Box
          sx={{
            width: 1,
            height: 1,
            my: 4,
          }}
        >
          <LazyLoadImage
            height="100%"
            width="100%"
            src="https://assets.maccarianagency.com/backgrounds/img4.jpg"
            alt="Remote working"
            effect="blur"
            style={{
              objectFit: 'cover',
              borderRadius: 8,
              width: '100%',
              height: '100%',
              maxHeight: 400,
            }}
          />
        </Box>
        <Typography
          align="center"
          sx={{
            fontWeight: 400,
            fontSize: '2.125rem',
            lineHeight: 1.235,
            letterSpacing: '0.00735em',
            color: theme.palette.tertiary.light,
          }}
        >
          “So many teams struggle to make their onboarding experience anywhere
          near as good as their core product, so the results of this is poor
          retention”
        </Typography>
        <Box sx={{ my: 4 }}>
          <Typography
            gutterBottom
            sx={{
              fontWeight: 400,
              fontSize: '2.125rem',
              lineHeight: 1.235,
              letterSpacing: '0.00735em',
            }}
          >
            Big heading for a new topic
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ul>
              <li>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </li>
              <li>
                <Typography>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
      <Box sx={{ my: 4 }}>
        <ImageList
          variant="quilted"
          cols={3}
          rowHeight={isMd ? 300 : 220}
          gap={isMd ? 16 : 8}
        >
          {photos.map((photo) => (
            <ImageListItem
              key={photo.src}
              cols={photo.cols || 2}
              rows={photo.rows || 1}
            >
              <LazyLoadImage
                height="100%"
                width="100%"
                src={photo.src}
                alt="..."
                effect="blur"
                style={{
                  objectFit: 'cover',
                  cursor: 'poiner',
                  borderRadius: 8,
                }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box sx={{ px: { xs: 0, sm: 4, md: 6 } }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '1.5rem',
              lineHeight: 1.334,
              letterSpacing: '0em',
            }}
          >
            Small heading for a small transition
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Typography>
        </Box>
      </Box>
      <Box paddingY={4}>
        <Divider />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ width: 50, height: 50, mr: 2 }}
            src="https://assets.maccarianagency.com/avatars/img3.jpg"
          />
          <Box>
            <Typography fontWeight={600}>Zach Livingston</Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              Aug 10, 2022
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: theme.palette.text.secondary }}>
            Share:
          </Typography>
          <Box sx={{ ml: 0.5 }}>
            {socials.map((social) => (
              <IconButton
                key={social.ariaLabel}
                disableRipple
                aria-label={social.ariaLabel}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
