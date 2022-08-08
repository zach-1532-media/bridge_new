import React from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import MenuWrapper from '../../menuWrapper';

const MenuItems = ({ id, type, path }) => {
  const theme = useTheme();
  const userItems = [
    {
      name: 'Profile',
      link: `/dashboards/user/${id}`,
      icon: <ManageAccountsTwoToneIcon />,
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
  ];
  const businessItems = [
    {
      name: 'Profile',
      link: `/dashboards/business/${id}`,
      icon: <ManageAccountsTwoToneIcon />,
    },
    {
      name: 'Posted Jobs',
      link: `/dashboards/business/postedJobs/${id}`,
      icon: <WorkTwoToneIcon />,
    },
    {
      name: 'Post a Job',
      link: `/dashboards/business/postAJob/${id}`,
      icon: <PostAddTwoToneIcon />,
    },
  ];

  const items = type === 'user' ? userItems : businessItems;

  return (
    <>
      {items.map((item) => (
        <MenuWrapper key={item.name}>
          <List>
            <Link href={item.link} passHref>
              <ListItem>
                <Link href={item.link} passHref>
                  <Button
                    disableRipple
                    fullWidth
                    startIcon={item.icon}
                    variant={path === item.link ? 'outlined' : 'text'}
                    color="tertiary"
                    sx={{
                      justifyContent: 'stretch',
                      color:
                        path === item.link
                          ? theme.palette.tertiary.main
                          : theme.sidebar.textColor,
                      '&:hover': {
                        background: 'transparent',
                        color: theme.palette.tertiary.main,
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

MenuItems.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MenuItems;
