/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { perPage } from '../data';

const PerPage = ({ cardsPerPage, setCardsPerPage }) => (
  <FormControl sx={{ minWidth: '8em' }}>
    <InputLabel id="per-page-select-label">Results Per Page</InputLabel>
    <Select
      labelId="per-page-select-label"
      id="per-page-select"
      label="Results Per Page"
      value={cardsPerPage ?? ''}
      onChange={(e) => setCardsPerPage(e.target.value)}
    >
      {perPage.map((page) => (
        <MenuItem key={page.num} value={page.num}>
          {page.num}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

PerPage.propTypes = {
  cardsPerPage: PropTypes.number.isRequired,
  setCardsPerPage: PropTypes.func.isRequired,
};

const MyPagination = ({ count, page, setPage, _DATA }) => {
  const handleChange = (e, page) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <>
      <Pagination
        count={count}
        color="tertiary"
        page={page}
        onChange={handleChange}
      />
    </>
  );
};

const PagiAndPerPage = ({ jobs, cardsPerPage, setCardsPerPage, _DATA }) => {
  const [page, setPage] = useState(1);

  const count = Math.ceil(jobs.length / cardsPerPage);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        mt: '2em',
      }}
    >
      {jobs.length > cardsPerPage ? (
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <MyPagination
            count={count}
            page={page}
            setPage={setPage}
            _DATA={_DATA}
          />
          <PerPage
            cardsPerPage={cardsPerPage}
            setCardsPerPage={setCardsPerPage}
          />
        </Stack>
      ) : (
        <PerPage
          cardsPerPage={cardsPerPage}
          setCardsPerPage={setCardsPerPage}
        />
      )}
    </Box>
  );
};

export default PagiAndPerPage;
