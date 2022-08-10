/* eslint-disable no-nested-ternary */
/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-useless-fragment */

import { React, useState } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import PagiAndPerPage from '../pagiAndPerPage';
import usePagination from '../../../lib/Pagination';
import JobCard from '../jobCard';
import LQV from '../listingQuickView';

const JobBlock = ({ jobs, setApplyId }) => {
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const _DATA = usePagination(jobs, cardsPerPage);

  const theme = useTheme();

  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={4}>
        {_DATA.currentData().map((job) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Box
                display="block"
                width={1}
                height={1}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <JobCard
                  job={job}
                  height={1}
                  width={1}
                  key={job._id}
                  avatar={job.business.avatar}
                >
                  <LQV
                    job={job}
                    avatar={job.business.avatar}
                    businessName={job.business.businessName}
                    setApplyId={setApplyId}
                  >
                    <Button
                      variant="contained"
                      onClick={() => setApplyId(job._id)}
                    >
                      Apply
                    </Button>
                  </LQV>
                </JobCard>
              </Box>
            </Grid>
          );
        })}

        {router.pathname === '/dashboards/business/postAJob/[id]' ? (
          <></>
        ) : jobs.length > cardsPerPage ? (
          <PagiAndPerPage
            jobs={jobs}
            cardsPerPage={cardsPerPage}
            setCardsPerPage={setCardsPerPage}
            _DATA={_DATA}
          />
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
};

JobBlock.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      jobTitle: PropTypes.string,
      business: PropTypes.shape({
        bio: PropTypes.string,
        avatar: PropTypes.string,
        businessName: PropTypes.string,
      }),
      job: PropTypes.string,
      workType: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      responsibilities: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          responsibility: PropTypes.string,
        }),
      ),
      qualifications: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          qualification: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  setApplyId: PropTypes.func,
};

export default JobBlock;
