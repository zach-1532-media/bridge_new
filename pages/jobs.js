/* eslint-disable react/jsx-filename-extension */

import { React, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSession, getSession } from 'next-auth/client';

import Button from '@mui/material/Button';
import dbConnect from '../lib/dbConnect';
import Jobs from '../models/Jobs';
import User from '../models/User';

import Main from '../layouts/main/index';
import Container from '../components/front_components/container';
import JobHero from '../components/shared/JobHero';
import ExploreButton from '../components/shared/JobHero/components/exploreButton';
import HeroImage from '../components/shared/JobHero/components/heroImage';
import FavoriteButton from '../components/shared/buttons/favoriteButton';
import ApplyButton from '../components/shared/buttons/applyButton';
import {
  JobBlockWrapperGrid,
  JobBlockWrapper,
} from '../components/shared/JobBlock/new';
import JobCard from '../components/shared/jobCard';
import LQV from '../components/shared/listingQuickView';
import { GeneralSnack } from '../components/shared/snackbars';

const JobPage = ({ jobs, user }) => {
  const [session] = useSession();
  const router = useRouter();
  const [generalError, setGeneralError] = useState(false);
  const [applyId, setApplyId] = useState('');
  const [favoriteId, setFavoriteId] = useState('');
  const [deleteFavoriteId, setDeleteFavoriteId] = useState('');

  useEffect(() => {
    const deleteFavorite = async () => {
      try {
        const deleteInfo = {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobId: deleteFavoriteId,
          }),
        };
        const response = await fetch(`/api/favorite/${user._id}`, deleteInfo);
        const data = await response.json();
        if (data.status === 200) {
          router.replace(router.asPath);
          setDeleteFavoriteId('');
        } else if (data.status === 400) {
          setGeneralError(true);
        }
      } catch (err) {
        setGeneralError(true);
      }
    };

    const favorite = async () => {
      try {
        const favoriteInfo = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobId: favoriteId,
          }),
        };
        const response = await fetch(`/api/favorite/${user._id}`, favoriteInfo);
        const data = await response.json();
        if (data.status === 200) {
          router.replace(router.asPath);
          setFavoriteId('');
        } else if (data.status === 400) {
          setGeneralError(true);
        }
      } catch (err) {
        setGeneralError(true);
      }
    };

    const apply = async () => {
      try {
        const applyInfo = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobId: applyId,
          }),
        };
        const response = await fetch(`/api/apply/${user._id}`, applyInfo);
        const data = await response.json();
        if (data.status === 200) {
          router.replace(router.asPath);
          setApplyId('');
        } else if (data.status === 400) {
          setGeneralError(true);
        }
      } catch (err) {
        setGeneralError(true);
      }
    };

    if (applyId) {
      apply();
    } else if (favoriteId) {
      favorite();
    } else if (deleteFavoriteId) {
      deleteFavorite();
    }
  }, [applyId, favoriteId, deleteFavoriteId, user._id, router]);

  return (
    <Main>
      <Container>
        <JobHero
          searchBar={null}
          image={<HeroImage />}
          exploreButton={<ExploreButton />}
        />
      </Container>
      <Container>
        <JobBlockWrapperGrid>
          {jobs.map((job) => (
            <JobBlockWrapper key={job._id}>
              <JobCard
                job={job}
                height={1}
                width={1}
                avatar={job.business.avatar}
              >
                <LQV
                  job={job}
                  avatar={job.business.avatar}
                  businessName={job.business.businessName}
                >
                  {!session ? (
                    <Link href="/login" passHref>
                      <Button variant="contained">Sign in to apply!</Button>
                    </Link>
                  ) : (
                    <>
                      <FavoriteButton
                        favoriteJobs={user.favoriteJobs}
                        setFavoriteId={setFavoriteId}
                        setDeleteFavoriteId={setDeleteFavoriteId}
                        id={job._id}
                      />
                      <ApplyButton
                        appliedJobs={user.appliedJobs}
                        id={job._id}
                        setApplyId={setApplyId}
                      />
                      <GeneralSnack
                        generalError={generalError}
                        setGeneralError={setGeneralError}
                      />
                    </>
                  )}
                </LQV>
              </JobCard>
            </JobBlockWrapper>
          ))}
        </JobBlockWrapperGrid>
      </Container>
    </Main>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../models/Business');

  let user;

  if (session) {
    user = await User.findById(session.id).select('appliedJobs favoriteJobs');
  }

  const jobs = await Jobs.aggregate()
    .lookup({
      from: 'businesses',
      localField: 'businessID',
      foreignField: '_id',
      as: 'business',
    })
    .unwind('business')
    .project(
      'jobTitle business.bio business.avatar business.businessName job workType city state responsibilities qualifications',
    )
    .limit(9);
  const jobsReverse = jobs.reverse();

  return {
    props: {
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
      user: session ? JSON.parse(JSON.stringify(user)) : null,
    },
  };
}

JobPage.propTypes = {
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
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    id: PropTypes.string,
    appliedJobs: PropTypes.arrayOf(PropTypes.string),
    favoriteJobs: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default JobPage;
