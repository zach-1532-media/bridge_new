/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import dbConnect from '../../../../../lib/dbConnect';
import User from '../../../../../models/User';
import Jobs from '../../../../../models/Jobs';

import MenuItems from '../../../../../components/shared/layoutLinks/items';
import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';
import PagiAndPerPage from '../../../../../components/shared/pagiAndPerPage';
import usePagination from '../../../../../lib/Pagination';
import {
  JobBlockWrapper,
  JobBlockWrapperGrid,
} from '../../../../../components/shared/JobBlock/new';
import Dash from '../../../../../layouts/dash';
import JobCard from '../../../../../components/shared/jobCard';
import LQV from '../../../../../components/shared/listingQuickView';
import FavoriteButton from '../../../../../components/shared/buttons/favoriteButton';
import { GeneralSnack } from '../../../../../components/shared/snackbars';
import ApplyButton from '../../../../../components/shared/buttons/applyButton';
import PostedJobs from '../../../../../components/shared/PostedJobs';
import TabPanel from '../../../../../components/shared/PostedJobs/components/tabPanel';
import Container from '../../../../../components/front_components/container';

const MyJobs = ({ sessionData, currentJobs, favoriteJobs, inactiveJobs }) => {
  const jobs = [currentJobs, favoriteJobs, inactiveJobs];
  const [value, setValue] = useState(0);
  const [applyId, setApplyId] = useState('');
  const [favoriteId, setFavoriteId] = useState('');
  const [deleteFavoriteId, setDeleteFavoriteId] = useState('');
  const [generalError, setGeneralError] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const currentData = jobs[value];

  const _DATA = usePagination(currentData, cardsPerPage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const { id } = router.query;

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
      const response = await fetch(`/api/favorite/${id}`, deleteInfo);
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
      const response = await fetch(`/api/favorite/${id}`, favoriteInfo);
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
      const response = await fetch(`/api/apply/${id}`, applyInfo);
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

  useEffect(() => {
    if (applyId) {
      apply();
    } else if (favoriteId) {
      favorite();
    } else if (deleteFavoriteId) {
      deleteFavorite();
    }
  }, [applyId, favoriteId, deleteFavoriteId]);

  return (
    <Dash
      data={sessionData}
      items={<MenuItems id={id} type="user" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={sessionData.avatar}
          sessionName={sessionData.sessionName}
          type="user"
        />
      }
    >
      <PostedJobs
        title="Your Jobs"
        subTitle="Toggle between your Active, Favorite, and Inactive Jobs"
        tabLabels={['Active', 'Favorites', 'Inactive']}
        value={value}
        handleChange={handleChange}
      >
        {jobs.map((job, i) => (
          <TabPanel value={value} index={i} key={`TabPanel: ${job}`}>
            <Container>
              <JobBlockWrapperGrid>
                {_DATA.currentData().map((data) => {
                  return (
                    <JobBlockWrapper key={`JobBlockWrapper: ${data._id}`}>
                      <JobCard
                        job={data}
                        height={1}
                        width={1}
                        key={`JobCard: ${data._id}`}
                        avatar={data.business.avatar}
                      >
                        <LQV
                          job={data}
                          key={`LQV: ${data._id}`}
                          avatar={data.business.avatar}
                          businessName={data.business.businessName}
                        >
                          <FavoriteButton
                            favoriteJobs={sessionData.favoriteJobs}
                            setFavoriteId={setFavoriteId}
                            setDeleteFavoriteId={setDeleteFavoriteId}
                            id={data._id}
                          />
                          <ApplyButton
                            appliedJobs={sessionData.appliedJobs}
                            id={data._id}
                            setApplyId={setApplyId}
                          />
                          <GeneralSnack
                            generalError={generalError}
                            setGeneralError={setGeneralError}
                          />
                        </LQV>
                      </JobCard>
                    </JobBlockWrapper>
                  );
                })}
              </JobBlockWrapperGrid>
              {currentData.length > cardsPerPage ? (
                <PagiAndPerPage
                  jobs={currentData}
                  cardsPerPage={cardsPerPage}
                  setCardsPerPage={setCardsPerPage}
                  _DATA={_DATA}
                />
              ) : null}
            </Container>
          </TabPanel>
        ))}
      </PostedJobs>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../../../../../models/Business');

  const user = await User.findById(id);

  const appliedJobs = await User.findById(id).select('appliedJobs');
  const appliedJobsArray = appliedJobs.appliedJobs;

  const currentJobs = await Jobs.aggregate()
    .match({ _id: { $in: appliedJobsArray } })
    .lookup({
      from: 'businesses',
      localField: 'businessID',
      foreignField: '_id',
      as: 'business',
    })
    .unwind('business')
    .project(
      'jobTitle business.bio business.avatar business.businessName job workType city state responsibilities qualifications',
    );

  const jobsFavorited = await User.findById(id).select('favoriteJobs');
  const favoriteJobsArray = jobsFavorited.favoriteJobs;

  const favoriteJobs = await Jobs.aggregate()
    .match({ _id: { $in: favoriteJobsArray } })
    .lookup({
      from: 'businesses',
      localField: 'businessID',
      foreignField: '_id',
      as: 'business',
    })
    .unwind('business')
    .project(
      'jobTitle business.bio business.avatar business.businessName job workType city state responsibilities qualifications',
    );

  const currentJobsReverse = currentJobs.reverse();
  const favoriteJobsReverse = favoriteJobs.reverse();

  return {
    props: {
      sessionData: JSON.parse(JSON.stringify(user)),
      currentJobs: JSON.parse(JSON.stringify(currentJobsReverse)),
      favoriteJobs: JSON.parse(JSON.stringify(favoriteJobsReverse)),
      inactiveJobs: JSON.parse(JSON.stringify(currentJobsReverse)),
      appliedJobs: JSON.parse(JSON.stringify(appliedJobsArray)),
    },
  };
}

MyJobs.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  sessionData: PropTypes.object.isRequired,
  currentJobs: PropTypes.arrayOf(
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
  favoriteJobs: PropTypes.arrayOf(
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
  inactiveJobs: PropTypes.arrayOf(
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
};

export default MyJobs;
