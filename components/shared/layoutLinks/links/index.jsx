import { React, useState, useRef } from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 0.5)};
    height: ${theme.spacing(6)};
`,
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`,
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`,
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`,
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`,
);

const UserBoxLinks = ({
  id,
  type,
  avatar,
  sessionName,
  businessName,
  colorInvert,
}) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const businessLinks = [
    {
      name: 'Profile',
      link: `/dashboards/business/${id}`,
      icon: <ManageAccountsTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Posted Jobs',
      link: `/dashboards/business/postedJobs/${id}`,
      icon: <WorkTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Post A Job',
      link: `/dashboards/business/postAJob/${id}`,
      icon: <PostAddTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Resources',
      link: '/resources',
      icon: <AutoStoriesTwoToneIcon fontSize="small" />,
    },
  ];

  const userLinks = [
    {
      name: 'Profile',
      link: `/dashboards/user/${id}`,
      icon: <ManageAccountsTwoToneIcon fontSize="small" />,
    },
    {
      name: 'My Jobs',
      link: `/dashboards/user/myJobs/${id}`,
      icon: <WorkTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Job Search',
      link: `/dashboards/user/jobSearch/${id}`,
      icon: <SearchTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Resources',
      link: '/resources',
      icon: <AutoStoriesTwoToneIcon fontSize="small" />,
    },
  ];

  const links = type === 'user' ? userLinks : businessLinks;

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={sessionName}
          src={avatar === undefined ? sessionName[0] : avatar}
        />
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'inline-block' },
          }}
        >
          <UserBoxText>
            <UserBoxLabel
              variant="body1"
              sx={{
                color: colorInvert ? 'white' : theme.palette.text.secondary,
              }}
            >
              {sessionName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {businessName ?? ''}
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline-block' },
          }}
        >
          <ExpandMoreTwoToneIcon
            sx={{
              ml: 1,
              mt: '.3em',
              color: colorInvert ? 'white' : theme.palette.text.secondary,
            }}
          />
        </Box>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar
            variant="rounded"
            alt={sessionName}
            src={avatar === undefined ? sessionName[0] : avatar}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{sessionName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {businessName ?? ''}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          {links.map((link) => (
            <Link href={link.link} passHref key={link.link}>
              <ListItem onClick={() => handleClose()} button>
                {link.icon}
                <ListItemText primary={link.name} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Popover>
    </>
  );
};

UserBoxLinks.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  businessName: PropTypes.string,
  sessionName: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  colorInvert: PropTypes.bool,
};

UserBoxLinks.defaultProps = {
  businessName: '',
  avatar: '',
  colorInvert: false,
};

export default UserBoxLinks;
