/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
import { React, useState } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import ProfileCover from './components/ProfileCover';
import EditProfileTab from './components/EditProfileTab';
import NotificationsTab from './components/NotificationsTab';
import SecurityTab from './components/SecurityTab';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`,
);

function Profile({ business, user }) {
  const [currentTab, setCurrentTab] = useState('account');
  const router = useRouter();
  const page = router.pathname;
  const userPage = page === '/dashboards/user/[id]';

  const data = userPage ? user : business;

  const tabs = [
    { value: 'account', label: 'Account' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Grid
          sx={{ px: 4 }}
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'account' && (
              <ProfileCover data={data} userPage={userPage} />
            )}
            {currentTab === 'edit_profile' && (
              <EditProfileTab data={data} userPage={userPage} />
            )}
            {currentTab === 'notifications' && (
              <NotificationsTab userPage={userPage} />
            )}
            {currentTab === 'security' && <SecurityTab userPage={userPage} />}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

Profile.propTypes = {
  business: PropTypes.object,
  user: PropTypes.object,
};

Profile.defaultProps = {
  business: {},
  user: {},
};

export default Profile;
