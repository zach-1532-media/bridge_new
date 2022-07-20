/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      margin-bottom: ${theme.spacing(1.5)};
      padding: 0;
  
      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }
  
      .MuiListSubheader-root {
        text-transform: uppercase;
        font-weight: bold;
        font-size: ${theme.typography.pxToRem(12)};
        color: ${theme.sidebar.menuItemIconColor};
        padding: ${theme.spacing(1, 3.5)};
        line-height: 1.4;
      }
  `
);

const SidebarMenu = ({ data, userPage }) => {
  const theme = useTheme();

  const router = useRouter();

  const businessMenuItems = [
    {
      name: 'Profile',
      link: `/dashboards/business/${data._id}`,
      icon: <ManageAccountsTwoToneIcon />,
    },
    {
      name: 'Posted Jobs',
      link: `/dashboards/business/postedJobs/${data._id}`,
      icon: <WorkTwoToneIcon />,
    },
    {
      name: 'Post a Job',
      link: `/dashboards/business/postAJob/${data._id}`,
      icon: <PostAddTwoToneIcon />,
    },
  ];

  const userMenuItems = [
    {
      name: 'Profile',
      link: `/dashboards/user/${data._id}`,
      icon: <ManageAccountsTwoToneIcon />,
    },
    {
      name: 'My Jobs',
      link: `/dashboards/user/myJobs/${data._id}`,
      icon: <WorkTwoToneIcon fontSize="small" />,
    },
    {
      name: 'Job Search',
      link: `/dashboards/user/jobSearch/${data._id}`,
      icon: <SearchTwoToneIcon fontSize="small" />,
    },
  ];

  const menuItems = userPage === true ? userMenuItems : businessMenuItems;

  return (
    <>
      {menuItems.map((item) => (
        <MenuWrapper key={item.name}>
          <List>
            <Link href={item.link} passHref>
              <ListItem>
                <Link href={item.link} passHref>
                  <Button
                    disableRipple
                    fullWidth
                    startIcon={item.icon}
                    variant={router.asPath === item.link ? 'outlined' : 'text'}
                    color="tertiary"
                    sx={{
                      justifyContent: 'stretch',
                      color: theme.sidebar.textColor,
                      '&:hover': {
                        background: 'transparent',
                        color: theme.colors.primary.main,
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              </ListItem>
            </Link>
          </List>
        </MenuWrapper>
      ))}
    </>
  );
};

SidebarMenu.propTypes = {
  data: PropTypes.object.isRequired,
  userPage: PropTypes.bool.isRequired,
};

export default SidebarMenu;
