import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import MyCards from '../MyCards';

const PaymentTab = () => (
  <>
    <Box pb={2}>
      <Typography variant="h3">Payments</Typography>
      <Typography variant="subtitle2">
        Manage your payment methods here
      </Typography>
    </Box>
    <MyCards />
    <Box sx={{ mt: '1em', display: 'flex', justifyContent: 'end' }}>
      <Button size="large" startIcon={<SaveIcon />} variant="contained">
        Save
      </Button>
    </Box>
  </>
);

export default PaymentTab;
