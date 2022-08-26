/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prettier/prettier */
import { React, useState } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme, styled } from '@mui/material/styles';

import AssetList from './components/AssetListNew';
import ProgressBar from './components/ProgressBar';
import { GeneralSnack } from '../../../../shared/snackbars';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`,
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`,
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`,
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`,
);

const ProfileCover = ({ data }) => {
  const [avatarImg, setAvatarImg] = useState('');
  const [tempAvatarImg, setTempAvatarImg] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [tempCoverImg, setTempCoverImg] = useState('');
  const [generalError, setGeneralError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = router.pathname === '/dashboards/user/[id]';
  const { id } = router.query;
  const theme = useTheme();
  const indicator = (
    <CircularProgress size={16} sx={{ color: theme.palette.tertiary.main }} />
  );

  const percent = () => {
    const signup = 1;
    const resume = !data.resume ? 0 : 1;
    const bio = !data.bio ? 0 : 1;
    const travel = !data.travel ? 0 : 1;
    const benefits = !data.benefits ? 0 : 1;
    const job = !data.job ? 0 : 1;
    const workType = !data.workType ? 0 : 1;
    const salary = !data.salary ? 0 : 1;
    const product =
      ((signup + bio + travel + resume + benefits + job + workType + salary) /
        8) *
      100;
    return Math.trunc(product);
  };

  const handleAvatarOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setAvatarImg(onLoadEvent.target.result);
      setTempAvatarImg(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleCoverOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setCoverImg(onLoadEvent.target.result);
      setTempCoverImg(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const signedUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const input = Array.from(form.elements);
    const inputName = input[0].name;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === inputName,
    );
    const formData = new FormData();
    const signResponse = await fetch(
      `/api/cloudinarySignature/${inputName}/${id}`,
    );
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
    const cloudinaryData = await res.json();

    if (cloudinaryData.secure_url) {
      const mongoRes = await fetch(
        `/api/uploadsMongo/${user ? 'user' : 'business'}/${id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [`${inputName}`]: `${cloudinaryData.secure_url}`,
          }),
        },
      );
      const mongoData = await mongoRes.json();
      if (mongoData.status === 200) {
        setTempCoverImg('');
        setTempAvatarImg('');
        router.replace(router.asPath);
        setLoading(false);
      } else if (mongoData.status === 400) {
        setCoverImg('');
        setAvatarImg('');
        router.replace(router.asPath);
        setLoading(false);
        setGeneralError(true);
      }
    }
  };

  return (
    <>
      <CardCover>
        <CardMedia image={!coverImg ? data.cover : coverImg} />
        <CardCoverAction>
          <form
            method="post"
            onSubmit={signedUpload}
            onChange={handleCoverOnChange}
          >
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="label"
              sx={{
                display: tempCoverImg ? 'none' : 'flex',
              }}
            >
              Change
              <input hidden accept="image/*" type="file" name="cover" />
            </Button>

            {tempCoverImg ? (
              <LoadingButton
                startIcon={<SaveIcon />}
                loading={loading}
                type="submit"
                variant="contained"
                loadingIndicator={indicator}
              >
                Upload
              </LoadingButton>
            ) : null}
          </form>
        </CardCoverAction>
      </CardCover>
      <form onChange={handleAvatarOnChange} onSubmit={signedUpload}>
        <AvatarWrapper>
          <Avatar
            variant="rounded"
            alt={
              user ? `${data.firstName} avatar` : `${data.businessName} avatar`
            }
            src={!avatarImg ? data.avatar : avatarImg}
          />
          <ButtonUploadWrapper>
            <IconButton
              sx={{ display: tempAvatarImg ? 'none' : 'flex' }}
              color="primary"
              component="label"
            >
              <UploadTwoToneIcon />
              <input hidden accept="image/*" name="avatar" type="file" />
            </IconButton>

            {tempAvatarImg ? (
              <IconButton
                sx={{
                  display: tempAvatarImg ? 'flex' : 'none',
                  color: theme.palette.error.main,
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress
                    size={16}
                    sx={{ color: theme.palette.tertiary.main }}
                  />
                ) : (
                  <SaveIcon />
                )}
              </IconButton>
            ) : null}
          </ButtonUploadWrapper>
        </AvatarWrapper>
      </form>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {!user ? data.businessName : null}
        </Typography>
        <Typography variant="subtitle2">{!user ? data.bio : null}</Typography>
        <Typography
          sx={{
            py: 2,
          }}
          variant="subtitle2"
          color="text.primary"
        >
          {data.city ?? ''} {data.city ? '|' : ''} {data.state ?? ''}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ProgressBar percent={percent()} />
        </Box>

        {!user ? (
          <Box
            display={{ xs: 'block', md: 'flex' }}
            alignItems="center"
            justifyContent="left"
          >
            <Button
              href={`https://${data.site}`}
              target="_blank"
              size="small"
              sx={{
                mx: 1,
              }}
              variant="outlined"
            >
              View website
            </Button>
          </Box>
        ) : (
          <Box sx={{ mt: '3em' }}>
            <AssetList
              twitter={data.twitter}
              resume={data.resume}
              instagram={data.instagram}
              linkedin={data.linkedin}
              id={id}
              user={user}
            />
          </Box>
        )}

        <GeneralSnack
          generalError={generalError}
          setGeneralError={setGeneralError}
          message=""
        />
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfileCover;
