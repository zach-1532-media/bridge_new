import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

function SecurityTab() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">
            Change your security preferences below
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              <Button size="large" variant="outlined">
                Change password
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1,
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;
