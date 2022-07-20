/* eslint-disable object-shorthand */
/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

const SearchBar = ({ search, setSearch }) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.replace({
      query: { ...router.query, search: search },
    });
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        [theme.breakpoints.up('md')]: {
          position: 'absolute',
          bottom: 0,
          transform: 'translateY(100%)',
        },
      }}
    >
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          autoFocus
          name="search"
          placeholder="Search..."
          value={search ?? ''}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          sx={{
            background: '#f5f5f5',
            boxShadow: 4,
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0 !important',
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton onClick={handleSubmit}>
                <Box
                  component="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </Box>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

SearchBar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};

export default SearchBar;
