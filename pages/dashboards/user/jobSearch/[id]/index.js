/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
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
import JobHero from '../../../../../components/shared/JobHero';
import Container from '../../../../../components/front_components/container';
import Dash from '../../../../../layouts/dash';
import SearchBar from '../../../../../components/shared/searchbar';
import { GeneralSnack } from '../../../../../components/shared/snackbars';
import JobCard from '../../../../../components/shared/jobCard';
import LQV from '../../../../../components/shared/listingQuickView';
import FavoriteButton from '../../../../../components/shared/buttons/favoriteButton';
import ApplyButton from '../../../../../components/shared/buttons/applyButton';

const DashJobSearch = ({ data, jobs }) => {
  const [search, setSearch] = useState(' ');
  const [applyId, setApplyId] = useState('');
  const [favoriteId, setFavoriteId] = useState('');
  const [deleteFavoriteId, setDeleteFavoriteId] = useState('');
  const [generalError, setGeneralError] = useState(false);
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const router = useRouter();
  const { id } = router.query;

  const _DATA = usePagination(jobs, cardsPerPage);

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
      data={data}
      items={<MenuItems id={id} type="user" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={data.avatar}
          sessionName={data.sessionName}
          type="user"
        />
      }
    >
      <Container>
        <JobHero
          search={search}
          setSearch={setSearch}
          searchBar={<SearchBar search={search} setSearch={setSearch} />}
          image={null}
          exploreButton={null}
        />
      </Container>
      <Container>
        <JobBlockWrapperGrid>
          {_DATA.currentData().map((job) => {
            return (
              <JobBlockWrapper key={`JobBlockWrapper: ${job._id}`}>
                <JobCard
                  job={job}
                  height={1}
                  width={1}
                  key={`JobCard: ${job._id}`}
                >
                  <LQV job={job} key={`LQV: ${job._id}`}>
                    <FavoriteButton
                      favoriteJobs={data.favoriteJobs}
                      setFavoriteId={setFavoriteId}
                      setDeleteFavoriteId={setDeleteFavoriteId}
                      id={job._id}
                    />
                    <ApplyButton
                      appliedJobs={data.appliedJobs}
                      id={job._id}
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
        {jobs.length > cardsPerPage ? (
          <PagiAndPerPage
            jobs={jobs}
            cardsPerPage={cardsPerPage}
            setCardsPerPage={setCardsPerPage}
            _DATA={_DATA}
          />
        ) : null}
      </Container>
    </Dash>
  );
};

export async function getServerSideProps({ query: { id, search } }) {
  await dbConnect();
  // eslint-disable-next-line global-require
  require('../../../../../models/Business');

  const user = await User.findById(id);

  const jobs = !search
    ? await Jobs.aggregate()
        .lookup({
          from: 'businesses',
          localField: 'businessID',
          foreignField: '_id',
          as: 'business',
        })
        .unwind('business')
        .project(
          'jobTitle business.bio job workType city state responsibilities qualifications',
        )
    : await Jobs.aggregate()
        .search({
          index: 'Job Search',
          text: {
            query: search,
            path: ['jobTitle', 'description'],
            fuzzy: {},
          },
        })
        .lookup({
          from: 'businesses',
          localField: 'businessID',
          foreignField: '_id',
          as: 'business',
        })
        .unwind('business')
        .project(
          'jobTitle business.bio job workType city state responsibilities qualifications',
        );

  const jobsReverse = jobs.reverse();

  return {
    props: {
      data: JSON.parse(JSON.stringify(user)),
      jobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

DashJobSearch.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      jobTitle: PropTypes.string,
      business: PropTypes.shape({
        bio: PropTypes.string,
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

export default DashJobSearch;
