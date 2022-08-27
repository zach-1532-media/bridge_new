/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import { React, useState } from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DescriptionIcon from '@mui/icons-material/Description';
import LanguageIcon from '@mui/icons-material/Language';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ApplicantList = ({ applicants, selectedRows, setSelectedRows }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [open, setOpen] = useState(false);

  const handleSelectedRows = (id, email) => {
    if (selectedRows.findIndex((e) => e.id === id) !== -1) {
      const found = selectedRows.find((e) => e.id === id);
      setSelectedRows((selectedRows) =>
        selectedRows.filter((selectedRows) => {
          return selectedRows !== found;
        }),
      );
    } else if (selectedRows.findIndex((e) => e.id === id) === -1) {
      setSelectedRows((setSelectedRows) => [
        ...setSelectedRows,
        {
          id,
          email,
        },
      ]);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Card
      sx={{
        width: '100%',
      }}
    >
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
        <Typography>Applicants</Typography>
      </Box>
      <List disablePadding>
        {applicants.map((applicant, i) => (
          <Box key={applicant._id}>
            <Divider />
            <ListItem
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
                py: 2,
                px: 2.5,
              }}
            >
              <Box
                sx={{
                  mr: { xs: '1em', md: null },
                }}
              >
                <Checkbox
                  onChange={() => {
                    handleSelectedRows(applicant._id, applicant.email, i);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Box>
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 3, sm: 0 }}
                sx={{ width: '100%' }}
                justifyContent={isMd ? 'space-between' : null}
              >
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  spacing={1}
                  alignItems="center"
                >
                  {applicant.avatar ? <Avatar src={applicant.avatar} /> : null}
                  <Typography>
                    {`${applicant.firstName} ${applicant.lastName}`}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  {applicant.resume ? (
                    <IconButton
                      onClick={() => {
                        // eslint-disable-next-line no-unused-expressions
                        isMd
                          ? setOpen(true)
                          : window.open(`${applicant.resume}`, '_blank');
                      }}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  ) : null}
                  {applicant.twitter ? (
                    <IconButton href={applicant.twitter} target="_blank">
                      <TwitterIcon sx={{ color: '#1DA1F2' }} />
                    </IconButton>
                  ) : null}
                  {applicant.instagram ? (
                    <IconButton href={applicant.instagram} target="_blank">
                      <InstagramIcon sx={{ color: '#fb3958' }} />
                    </IconButton>
                  ) : null}
                  {applicant.linkedin ? (
                    <IconButton href={applicant.linkedin} target="_blank">
                      <LinkedInIcon sx={{ color: '#0072b1 ' }} />
                    </IconButton>
                  ) : null}
                  {applicant.webSite ? (
                    <IconButton href={applicant.webSite} target="_blank">
                      <LanguageIcon
                        sx={{ color: theme.palette.primary.main }}
                      />
                    </IconButton>
                  ) : null}
                </Stack>
              </Stack>
            </ListItem>
            <Dialog
              open={open}
              fullScreen
              onClose={handleClose}
              aria-labelledby="resume-dialog"
            >
              <iframe
                title="resume"
                src={applicant.resume}
                height="100%"
                width="100%"
              />
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        ))}
      </List>
    </Card>
  );
};

export default ApplicantList;
