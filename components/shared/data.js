/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflow: 'scroll',
};

export const indicator = () => {
  const theme = useTheme();
  return (
    <CircularProgress size={16} sx={{ color: theme.palette.tertiary.main }} />
  );
};

export const yearsInBusiness = [
  {
    range: '0-1',
  },
  {
    range: '1-3',
  },
  {
    range: '3-5',
  },
  {
    range: '5+',
  },
];

export const salaryBands = [
  {
    range: '$30,000 - $40,000',
  },
  {
    range: '$40,001 - $55,000',
  },
  {
    range: '$55,001 - $70,000',
  },
  {
    range: '$70,001 - $90,000',
  },
  {
    range: '$90,001 - $105,000',
  },
  {
    range: '$105,001+',
  },
];

export const perPage = [
  {
    num: 9,
  },
  {
    num: 18,
  },
  {
    num: 27,
  },
  {
    num: 36,
  },
  {
    num: 45,
  },
  {
    num: 54,
  },
];

export const hourlyRateBands = [
  {
    range: '$10.00 - $15.00',
  },
  {
    range: '$15.01 - $20.00',
  },
  {
    range: '$20.01 - $25.00',
  },
  {
    range: '$25.01 - $30.00',
  },
  {
    range: '$30.01 - $35.00',
  },
  {
    range: '$35.01 - $40.00',
  },
  {
    range: '$40.01 - $45.00',
  },
  {
    range: '$45.01 - $50.00',
  },
  {
    range: '$50.00+',
  },
];

export const yesNo = [
  {
    value: true,
    text: 'Yes',
  },
  {
    value: false,
    text: 'No',
  },
];

export const workTypes = [
  {
    type: 'Work From Home',
  },
  {
    type: 'In Office',
  },
  {
    type: 'Hybrid',
  },
];

export const jobs = [
  {
    job: 'Full-Time',
  },
  {
    job: 'Part-Time',
  },
];

export const industries = [
  {
    name: 'Skilled Craftsman',
  },
  {
    name: 'Technology',
  },
  {
    name: 'Insurance',
  },
  {
    name: 'Banking',
  },
];

export const employees = [
  {
    range: '1-5',
  },
  {
    range: '6-10',
  },
  {
    range: '11-20',
  },
  {
    range: '21+',
  },
];

export const steps = [
  {
    label: 'Select Job Type',
  },
  {
    label: 'Job Information',
  },
  {
    label: 'Preview and Confirm',
  },
];

export const usStates = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ',
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR',
  },
  {
    name: 'California',
    abbreviation: 'CA',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },
  {
    name: 'Guam',
    abbreviation: 'GU',
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI',
  },
  {
    name: 'Idaho',
    abbreviation: 'ID',
  },
  {
    name: 'Illinois',
    abbreviation: 'IL',
  },
  {
    name: 'Indiana',
    abbreviation: 'IN',
  },
  {
    name: 'Iowa',
    abbreviation: 'IA',
  },
  {
    name: 'Kansas',
    abbreviation: 'KS',
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY',
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA',
  },
  {
    name: 'Maine',
    abbreviation: 'ME',
  },
  {
    name: 'Maryland',
    abbreviation: 'MD',
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA',
  },
  {
    name: 'Michigan',
    abbreviation: 'MI',
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN',
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS',
  },
  {
    name: 'Missouri',
    abbreviation: 'MO',
  },
  {
    name: 'Montana',
    abbreviation: 'MT',
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE',
  },
  {
    name: 'Nevada',
    abbreviation: 'NV',
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH',
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ',
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM',
  },
  {
    name: 'New York',
    abbreviation: 'NY',
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC',
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND',
  },
  {
    name: 'Ohio',
    abbreviation: 'OH',
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK',
  },
  {
    name: 'Oregon',
    abbreviation: 'OR',
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA',
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI',
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC',
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD',
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN',
  },
  {
    name: 'Texas',
    abbreviation: 'TX',
  },
  {
    name: 'Utah',
    abbreviation: 'UT',
  },
  {
    name: 'Vermont',
    abbreviation: 'VT',
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI',
  },
  {
    name: 'Virginia',
    abbreviation: 'VA',
  },
  {
    name: 'Washington',
    abbreviation: 'WA',
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV',
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI',
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY',
  },
  {
    name: '',
    abbreviation: '',
  },
];

export const JobCardSVG1 = () => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={16}
    height={16}
    marginRight={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </Box>
);

export const JobCardSVG2 = () => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width={16}
    height={16}
    marginRight={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </Box>
);
