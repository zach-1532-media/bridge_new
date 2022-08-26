import {
  Card,
  Typography,
  Box,
  alpha,
  LinearProgress,
  styled,
  useTheme,
  linearProgressClasses,
} from '@mui/material';

const ProfileLinearProgress = styled(LinearProgress)(
  ({ theme }) => `
          height: 8px;
          border-radius: ${theme.general.borderRadiusLg};
  
          &.${linearProgressClasses.colorPrimary} {
              background-color: ${alpha(theme.palette.tertiary.main, 0.1)};
          }
          
          & .${linearProgressClasses.bar} {
              border-radius: ${theme.general.borderRadiusLg};
              background-color: ${theme.palette.tertiary.main};
          }
      `,
);

const ProgressBar = () => {
  const theme = useTheme();

  return (
    <Card sx={{ minWidth: { xs: '100%', md: '75%' } }}>
      <Box p={2.5} flexGrow={1}>
        <Box
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography color="text.primary" variant="h4" gutterBottom>
              Profile Progress
            </Typography>
          </Box>
        </Box>
        <ProfileLinearProgress variant="determinate" value={66.43} />
        <Box
          display="flex"
          sx={{
            mt: 0.6,
          }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            sx={{
              color: `${theme.colors.alpha.black[50]}`,
            }}
            variant="subtitle2"
          >
            Target
          </Typography>
          <Typography
            sx={{
              color: `${theme.colors.alpha.black[50]}`,
            }}
            variant="subtitle2"
          >
            100%
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ProgressBar;
