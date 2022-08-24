import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { signOut } from 'next-auth/client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { GeneralSnack } from '../../../../shared/snackbars';

function SecurityTab() {
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { id } = router.query;

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const deleteAccount = async () => {
      const deleteData = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const res = await fetch(`/api/users/${id}`, deleteData);
      const data = await res.json();
      if (data.case === 1) {
        signOut({ callbackUrl: '/' });
      } else if (data.case === 2) {
        setIsLoading(false);
        setGeneralError();
      }
    };

    if (isLoading) {
      if (Object.keys(errors).length === 0) {
        deleteAccount();
      } else {
        setIsLoading(false);
      }
    }
  }, [errors, id, isLoading]);

  const validate = () => {
    const err = {};
    if (!confirmText) {
      err.noText = 'Please enter text in the box';
    }

    if (confirmText !== id) {
      err.wrongText =
        'Please enter text in the box exactly how it appears above';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsLoading(true);
  };

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
              {isMd ? (
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1,
                  }}
                  primary="Change Password"
                  secondary="You can change your password here"
                />
              ) : null}
              <Button fullWidth={!isMd} size="large" variant="outlined">
                Change password
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <ListItemText />
              <Button
                fullWidth={!isMd}
                onClick={() => signOut({ callbackUrl: '/' })}
                color="error"
                variant="outlined"
              >
                Logout
              </Button>
            </ListItem>
            <ListItem
              sx={{
                p: 3,
              }}
            >
              <ListItemText />
              <Button
                fullWidth={!isMd}
                onClick={() => setOpenDialog(true)}
                color="error"
                variant="outlined"
              >
                Delete Account
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="delete-account-confirm"
      >
        <DialogTitle>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '1.25rem',
              lineHeight: 1.6,
              letterSpacing: '0.0075em',
              color: theme.palette.error.main,
            }}
          >
            DANGER ZONE
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography color="text.secondary">
              If you're absolutely sure you want to delete your account, please
              enter <b>{id}</b> into the textfield below.
            </Typography>
          </DialogContentText>
          <TextField
            sx={{ mt: '4em' }}
            fullWidth
            onChange={(e) => setConfirmText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={handleSubmit}
            color="error"
            variant="outlined"
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
        message=""
      />
    </Grid>
  );
}

export default SecurityTab;
