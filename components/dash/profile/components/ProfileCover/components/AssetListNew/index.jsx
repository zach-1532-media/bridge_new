import { React, useState } from 'react';

import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TextField from '@mui/material/TextField';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import SaveIcon from '@mui/icons-material/Save';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';

import { GeneralSnack } from '../../../../../../shared/snackbars';

const AssetList = ({ resume, twitter, instagram, linkedin, webSite, id }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [loading, setLoading] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(false);
  const [linkedinLoading, setLinkedinLoading] = useState(false);
  const [webSiteLoading, setWebSiteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    // eslint-disable-next-line no-unused-expressions
    isMd ? setOpen(true) : window.open(`${resume}`, '_blank');
  };
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({
    twitter,
    instagram,
    linkedin,
    webSite,
  });

  const handleClick = async (e) => {
    if (e.target.name === 'twitter') {
      setTwitterLoading(true);
    } else if (e.target.name === 'instagram') {
      setInstagramLoading(true);
    } else if (e.target.name === 'linkedin') {
      setLinkedinLoading(true);
    } else if (e.target.name === 'webSite') {
      setWebSiteLoading(true);
    }
    const res = await fetch(`/api/uploadsMongo/user/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.status === 200) {
      setTwitterLoading(false);
      setInstagramLoading(false);
      setLinkedinLoading(false);
      setWebSiteLoading(false);
      router.reload();
    } else {
      setGeneralError(true);
      setTwitterLoading(false);
      setInstagramLoading(false);
      setLinkedinLoading(false);
      setWebSiteLoading(false);
    }
  };

  const signedUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploadForm = e.currentTarget;
    const input = Array.from(uploadForm.elements);
    const inputName = input[0].name;
    const fileInput = Array.from(uploadForm.elements).find(
      ({ name }) => name === inputName,
    );
    const formData = new FormData();
    const signResponse = await fetch(`/api/cloudinarySignature/resume/${id}`);
    const signData = await signResponse.json();

    const url = `https://api.cloudinary.com/v1_1/${signData.cloudname}/auto/upload`;

    formData.append('file', fileInput.files[0]);
    formData.append('api_key', signData.apikey);
    formData.append('timestamp', signData.timestamp);
    formData.append('signature', signData.signature);
    formData.append('public_id', `${id}`);
    formData.append('upload_preset', `${inputName}`);

    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (data.secure_url) {
      const mongoRes = await fetch(`/api/uploadsMongo/user/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [`${inputName}`]: `${data.secure_url}`,
        }),
      });
      const mongoData = await mongoRes.json();
      if (mongoData.status === 200) {
        setLoading(false);
        router.replace(router.asPath);
        setShowLoadingButton(false);
      } else if (mongoData.status === 400) {
        setLoading(false);
        router.replace(router.asPath);
        setShowLoadingButton(false);
        setGeneralError(true);
      }
    }
  };

  const items = [
    {
      icon: <DescriptionIcon />,
      name: 'Resume',
      prop: resume,
      field: (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {resume ? (
            <Button
              fullWidth
              variant="outlined"
              color="tertiary"
              onClick={handleOpen}
            >
              View
            </Button>
          ) : null}
          <form
            method="post"
            onSubmit={signedUpload}
            onChange={() => setShowLoadingButton(true)}
          >
            <Button
              fullWidth
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="label"
              sx={{
                display: showLoadingButton ? 'none' : 'flex',
              }}
            >
              {resume ? 'Update' : 'Upload'}
              <input hidden type="file" name="resume" />
            </Button>
            {showLoadingButton ? (
              <LoadingButton
                fullWidth
                startIcon={<SaveIcon />}
                loading={loading}
                type="submit"
                variant="contained"
                loadingIndicator={
                  <CircularProgress
                    size={16}
                    sx={{ color: theme.palette.tertiary.main }}
                  />
                }
              >
                Save
              </LoadingButton>
            ) : null}
          </form>
        </Stack>
      ),
    },
    {
      icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
      name: 'Twitter',
      value: form.twitter,
      prop: twitter,
      field: (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder="Enter Your Twitter Url..."
            fullWidth
            variant="standard"
            name="twitter"
            value={form.twitter}
            onChange={(e) => setForm({ twitter: e.target.value })}
            sx={{ minWidth: { md: '25vh' } }}
          />
          <LoadingButton
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleClick}
            variant="contained"
            loading={twitterLoading}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
        </Stack>
      ),
    },
    {
      icon: <InstagramIcon sx={{ color: '#fb3958' }} />,
      name: 'Instagram',
      value: form.instagram,
      prop: instagram,
      field: (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder="Enter Your Instagram Url..."
            fullWidth
            variant="standard"
            name="instagram"
            value={form.instagram}
            onChange={(e) => setForm({ instagram: e.target.value })}
            sx={{ minWidth: { md: '25vh' } }}
          />
          <LoadingButton
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleClick}
            variant="contained"
            loading={instagramLoading}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
        </Stack>
      ),
    },
    {
      icon: <LinkedInIcon sx={{ color: '#0072b1 ' }} />,
      name: 'LinkedIn',
      value: form.linkedin,
      prop: linkedin,
      field: (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder="Enter Your LinkedIn Url..."
            fullWidth
            variant="standard"
            name="linkedin"
            value={form.linkedin}
            onChange={(e) => setForm({ linkedin: e.target.value })}
            sx={{ minWidth: { md: '25vh' } }}
          />
          <LoadingButton
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleClick}
            variant="contained"
            loading={linkedinLoading}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
        </Stack>
      ),
    },
    {
      icon: <LanguageIcon sx={{ color: theme.palette.primary.main }} />,
      name: 'Web Site',
      value: form.webSite,
      prop: webSite,
      field: (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            placeholder="Enter Your Web Site Url..."
            fullWidth
            variant="standard"
            name="webSite"
            value={form.webSite}
            onChange={(e) => setForm({ webSite: e.target.value })}
            sx={{ minWidth: { md: '25vh' } }}
          />
          <LoadingButton
            fullWidth
            startIcon={<SaveIcon />}
            onClick={handleClick}
            variant="contained"
            loading={webSiteLoading}
            loadingIndicator={
              <CircularProgress
                size={16}
                sx={{ color: theme.palette.tertiary.main }}
              />
            }
          >
            Save
          </LoadingButton>
        </Stack>
      ),
    },
  ];
  return (
    <Card>
      <Box
        id="list-header"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: theme.colors.alpha.black[5],
          p: 2,
        }}
      >
        <Typography>My Stuff</Typography>
      </Box>
      <List disablePadding>
        {items.map((item) => (
          <Box key={item.name}>
            <Divider />
            <ListItem
              sx={{
                justifyContent: 'space-between',
                display: { xs: 'block', sm: 'flex' },
                py: 2,
                px: 2.5,
              }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 0 }}
                sx={{ width: '100%' }}
                justifyContent={isMd ? 'space-between' : null}
              >
                <IconButton
                  href={item.prop ? item.prop : null}
                  target="_blank"
                  sx={{ '&:hover': { background: 'transparent' } }}
                >
                  <Stack direction="row" spacing={2}>
                    {item.icon}
                    <Typography>{item.name}</Typography>
                  </Stack>
                </IconButton>
                {item.field}
              </Stack>
            </ListItem>
          </Box>
        ))}
      </List>
      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        aria-labelledby="resume-dialog"
      >
        <iframe
          title="resume"
          src={`${resume}#view=fitH`}
          height="100%"
          width="100%"
        />
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <GeneralSnack
        generalError={generalError}
        setGeneralError={setGeneralError}
        message=""
      />
    </Card>
  );
};

AssetList.propTypes = {
  resume: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  linkedin: PropTypes.string,
};

AssetList.defaultProps = {
  resume: '',
  twitter: '',
  instagram: '',
  linkedin: '',
};

export default AssetList;
