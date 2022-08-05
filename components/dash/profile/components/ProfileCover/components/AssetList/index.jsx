import { React, useState } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';

import { GeneralSnack } from '../../../../../../shared/snackbars';

const AssetList = ({ resume, twitter, instagram, linkedin, id }) => {
  const [loading, setLoading] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [form, setForm] = useState({
    twitter,
    instagram,
    linkedin,
  });
  const [mongoLoad, setMongoLoad] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const style = {
    ml: '5em',
    alignSelf: 'center',
    fontWeight: 'normal',
    backgroundColor: `${theme.colors.primary.lighter}`,
    '&:hover': {
      backgroundColor: `${theme.colors.primary.main}`,
      color: `${theme.palette.getContrastText(theme.colors.primary.main)}`,
    },
  };
  const indicator = (
    <CircularProgress size={16} sx={{ color: theme.palette.tertiary.main }} />
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    setMongoLoad(true);
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
      setMongoLoad(false);
      router.reload();
    } else {
      setGeneralError(true);
      setMongoLoad(false);
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
    formData.append('upload_preset', 'resumes');

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
        setShowLoadingButton(false);
      } else if (mongoData.status === 400) {
        setLoading(false);
        setShowLoadingButton(false);
        setGeneralError(true);
      }
    }
  };

  const items = [
    {
      icon: <DescriptionIcon />,
      name: 'Resume',
      field: resume ? (
        <Button href={resume} target="_blank">
          View
        </Button>
      ) : null,
      button: (
        <form
          method="post"
          onSubmit={signedUpload}
          onChange={() => setShowLoadingButton(true)}
        >
          <Button
            startIcon={<UploadIcon />}
            variant="text"
            size="small"
            component="label"
            sx={{
              ...style,
              display: showLoadingButton ? 'none' : 'flex',
            }}
          >
            {resume ? 'Update' : 'Upload'}
            <input hidden type="file" name="resume" />
          </Button>
          {showLoadingButton ? (
            <LoadingButton
              startIcon={<SaveIcon />}
              loading={loading}
              type="submit"
              size="small"
              variant="contained"
              loadingIndicator={indicator}
            >
              Save
            </LoadingButton>
          ) : null}
        </form>
      ),
    },
    {
      icon: <TwitterIcon sx={{ color: '#1DA1F2' }} />,
      name: 'Twitter',
      id: 'twitter-item',
      field: twitter ? (
        <Button href={twitter} target="_blank">
          View
        </Button>
      ) : (
        <TextField
          fullWidth
          variant="standard"
          placeholder="url..."
          name="twitter"
          value={form.twitter ?? ''}
          onChange={handleChange}
        />
      ),
    },
    {
      icon: <InstagramIcon sx={{ color: '#fb3958' }} />,
      name: 'Instagram',
      field: instagram ? (
        <Button href={form.instagram} target="_blank">
          View
        </Button>
      ) : (
        <TextField
          fullWidth
          variant="standard"
          placeholder="url..."
          name="instagram"
          value={form.instagram ?? ''}
          onChange={handleChange}
        />
      ),
    },
    {
      icon: <LinkedInIcon sx={{ color: '#0072b1 ' }} />,
      name: 'LinkedIn',
      field: linkedin ? (
        <Button href={form.linkedin} target="_blank">
          View
        </Button>
      ) : (
        <TextField
          fullWidth
          variant="standard"
          placeholder="url..."
          name="linkedin"
          value={form.linkedin ?? ''}
          onChange={handleChange}
        />
      ),
    },
  ];

  return (
    <>
      <Card>
        <Box
          id="list-header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: `${theme.colors.alpha.black[5]}`,
            p: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'gray' }}>
            My Shite
          </Typography>
        </Box>
        <List disablePadding>
          {items.map((item) => (
            <Box id="parent" key={item.name}>
              <Divider />
              <ListItem
                sx={{
                  justifyContent: 'space-between',
                  display: { xs: 'block', sm: 'flex' },
                  py: 2,
                  px: 2.5,
                }}
              >
                <Box sx={{ mr: '4em' }}>{item.icon}</Box>
                <ListItemText
                  sx={{ flexGrow: 0, maxWidth: '50%', flexBasis: '50%' }}
                  disableTypography
                  primary={
                    <Typography color="text.primary" variant="h5">
                      {item.name}
                    </Typography>
                  }
                >
                  {item.name}
                </ListItemText>
                <Box
                  sx={{
                    pl: 0.5,
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                      width: '100%',
                      pr: 3,
                    }}
                  >
                    {item.field}
                  </Box>
                  {item.button}
                </Box>
              </ListItem>
            </Box>
          ))}
        </List>
        <GeneralSnack
          generalError={generalError}
          setGeneralError={setGeneralError}
        />
      </Card>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mt: '1em',
        }}
      >
        <LoadingButton
          size="large"
          startIcon={<SaveIcon />}
          variant="contained"
          loading={mongoLoad}
          loadingIndicator={indicator}
          onClick={handleClick}
        >
          {!twitter && !instagram && !linkedin ? 'Save' : 'Update'}
        </LoadingButton>
      </Box>
    </>
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