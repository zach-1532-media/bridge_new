import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import PaymentIcon from '@mui/icons-material/Payment';

const Orders = ({ setIsSubmitting, isLoading, job }) => {
  const partTime =
    'https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/partTime.svg';
  const fullTime =
    'https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/fullTime.svg';
  const fullTimePrice = 300;
  const partTimePrice = 200;
  const salesTaxPercent = 0.075;

  const salesTax = () => {
    let tax;
    if (job === 'Full-Time') {
      tax = fullTimePrice * salesTaxPercent;
    } else if (job === 'Part-Time') {
      tax = partTimePrice * salesTaxPercent;
    }
    return tax;
  };

  const orderTotal = () => {
    let total;
    const tax = salesTax();
    if (job === 'Full-Time') {
      total = fullTimePrice + tax;
    } else if (job === 'Part-Time') {
      total = partTimePrice + tax;
    }
    return total;
  };

  const tax = salesTax().toFixed(2);
  const total = orderTotal().toFixed(2);

  return (
    <Box>
      <Box>
        <Box display="flex">
          <Box
            component="img"
            src={job === 'Full-Time' ? fullTime : partTime}
            alt={
              job === 'Full-Time' ? 'full time job post' : 'part time job post'
            }
            sx={{
              borderRadius: 2,
              width: 1,
              height: 1,
              maxWidth: 120,
              marginRight: 2,
            }}
          />
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mt: '2em' }}
            width={1}
          >
            <Box>
              <Typography fontWeight={700} variant="subtitle2">
                {job === 'Full-Time'
                  ? 'Full Time Job Post'
                  : 'Part Time Job Post'}
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight={700} variant="subtitle2">
                {`$${job === 'Full-Time' ? fullTimePrice : partTimePrice}.00`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            marginY: { xs: 2, sm: 4 },
          }}
        />
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          marginY: 4,
          '& .MuiInputBase-input.MuiOutlinedInput-input': {
            bgcolor: 'background.paper',
          },
        }}
      />
      <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography color="text.secondary" fontWeight={700}>
            {`$${job === 'Full-Time' ? fullTimePrice : partTimePrice}.00`}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Sales Tax (+7.5%)</Typography>
          <Typography color="text.secondary" fontWeight={700}>
            {`$${tax}`}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight={700}>
            Order total
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            {`$${total}`}
          </Typography>
        </Box>

        <LoadingButton
          variant="contained"
          size="large"
          onClick={() => setIsSubmitting(true)}
          loading={isLoading}
          startIcon={<PaymentIcon />}
          loadingPosition="start"
          fullWidth
        >
          Pay Now
        </LoadingButton>
      </Stack>
    </Box>
  );
};

Orders.propTypes = {
  setIsSubmitting: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  job: PropTypes.string.isRequired,
};

export default Orders;
