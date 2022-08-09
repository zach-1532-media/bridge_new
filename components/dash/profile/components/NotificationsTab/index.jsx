import { React, useState } from 'react';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import { GeneralSnack, SuccessSnack } from '../../../../shared/snackbars';

const NotificationsTab = ({ newsletter }) => {
  const [isNewsletter, setIsNewsletter] = useState(newsletter);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [generalError, setGeneralError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();

  const indicator = (
    <CircularProgress size={16} sx={{ color: theme.palette.tertiary.main }} />
  );

  const handleChange = (event) => {
    setIsNewsletter(event.target.checked);
  };

  const handleClick = async () => {
    setLoading(true);
    const data = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'subscribe-unsubscribe',
        newsletter: isNewsletter,
        id,
      }),
    };
    const res = await fetch('/api/emails/users', data);
    const response = await res.json();
    if (response.case === 1) {
      setMessage(response.message);
      setLoading(false);
      setOpenSuccess(true);
      router.replace(router.asPath);
    } else {
      setLoading(false);
      setGeneralError(true);
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">Newsletter</Typography>
            <Typography variant="subtitle2">
              Choose whether you want to recieve the newsletter
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
                  primary="Widthdraw Activity"
                  secondary="Receive an email when a widthdrawal is made"
                />
                <Switch
                  checked={isNewsletter}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  name="newsletter"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          alignContent: 'center',
          mt: '2em',
        }}
      >
        <LoadingButton
          startIcon={<SaveIcon />}
          onClick={handleClick}
          loading={loading}
          size="small"
          variant="contained"
          loadingIndicator={indicator}
          disabled={isNewsletter === newsletter}
        >
          Save
        </LoadingButton>
        <SuccessSnack
          openSuccess={openSuccess}
          setOpenSuccess={setOpenSuccess}
          message={message}
        />
        <GeneralSnack
          generalError={generalError}
          setGeneralError={setGeneralError}
          message={message}
        />
      </Box>
    </>
  );
};

export default NotificationsTab;
