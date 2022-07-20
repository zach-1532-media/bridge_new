/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

const Input = styled('input')({
  display: 'none',
});

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
`
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
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ data, userPage }) => (
  <>
    <Box display="flex" mb={3}>
      <Box>{/* PUT TABS HERE */}</Box>
    </Box>
    <CardCover>
      <CardMedia image={data.cover} />
      <CardCoverAction>
        <Input accept="image/*" id="change-cover" multiple type="file" />
        <label htmlFor="change-cover">
          <Button
            startIcon={<UploadTwoToneIcon />}
            variant="contained"
            component="span"
          >
            Change cover
          </Button>
        </label>
      </CardCoverAction>
    </CardCover>
    <Tooltip placement="right-end" title="Upload Your Logo">
      <AvatarWrapper>
        <Avatar
          variant="rounded"
          alt={
            userPage
              ? `${data.firstName} avatar`
              : `${data.businessName} avatar`
          }
          src={data.avatar}
        />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
    </Tooltip>
    <Box py={2} pl={2} mb={3}>
      <Typography gutterBottom variant="h4">
        {!userPage ? data.businessName : null}
      </Typography>
      <Typography variant="subtitle2">{!userPage ? data.bio : null}</Typography>
      <Typography
        sx={{
          py: 2,
        }}
        variant="subtitle2"
        color="text.primary"
      >
        {data.city ?? ''} {data.city ? '|' : ''} {data.state ?? ''}
      </Typography>
      {!userPage ? (
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Button size="small" variant="contained">
              Follow
            </Button>
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
        </Box>
      ) : (
        <></>
      )}
    </Box>
  </>
);

ProfileCover.propTypes = {
  data: PropTypes.object.isRequired,
  userPage: PropTypes.bool.isRequired,
};

export default ProfileCover;
