/* eslint-disable react/no-array-index-key */
import { React, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';
import Jobs from '../../../../../models/Jobs';

import MenuItems from '../../../../../components/shared/layoutLinks/items';
import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';
import usePagination from '../../../../../lib/Pagination';
import PagiAndPerPage from '../../../../../components/shared/pagiAndPerPage';
import Dash from '../../../../../layouts/dash';
import PostedJobs from '../../../../../components/shared/PostedJobs';
import TabPanel from '../../../../../components/shared/PostedJobs/components/tabPanel';
import Container from '../../../../../components/front_components/container';
import {
  JobBlockWrapper,
  JobBlockWrapperGrid,
} from '../../../../../components/shared/JobBlock/new';
import JobCard from '../../../../../components/shared/jobCard';
import LQV from '../../../../../components/shared/listingQuickView';

const BusinessDash = ({ activeJobs, inActiveJobs, sessionData }) => {
  const jobs = [activeJobs, inActiveJobs];
  const [value, setValue] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(9);
  const router = useRouter();
  const { id } = router.query;

  const currentData = jobs[value];

  const _DATA = usePagination(currentData, cardsPerPage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dash
      data={sessionData}
      items={<MenuItems id={id} type="business" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={sessionData.avatar}
          sessionName={sessionData.sessionName}
          businessName={sessionData.businessName}
          type="business"
        />
      }
    >
      <PostedJobs
        title="Your Posted Jobs"
        subTitle="Toggle between your Active and Inactive job posts."
        tabLabels={['Active', 'Inactive']}
        value={value}
        handleChange={handleChange}
      >
        {jobs.map((job, i) => (
          <TabPanel value={value} index={i} key={`TabPanel: ${job}${i}`}>
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
                        avatar={sessionData.avatar}
                      >
                        <LQV
                          job={data}
                          key={`LQV: ${data._id}`}
                          businessName={sessionData.businessName}
                          avatar={sessionData.avatar}
                        >
                          <Link
                            href={`/dashboards/business/${id}/${data._id}`}
                            passHref
                          >
                            <Button variant="contained">View Applicants</Button>
                          </Link>
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

  const businesses = await Business.findById(id);
  const jobId = await Jobs.find({ businessID: id }).select('_id');
  const jobIdArray = jobId.map((job) => job._id);
  const jobs = await Jobs.aggregate()
    .match({ _id: { $in: jobIdArray } })
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
      sessionData: JSON.parse(JSON.stringify(businesses)),
      activeJobs: JSON.parse(JSON.stringify(jobsReverse)),
      inActiveJobs: JSON.parse(JSON.stringify(jobsReverse)),
    },
  };
}

BusinessDash.propTypes = {
  activeJobs: PropTypes.arrayOf(
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
  inActiveJobs: PropTypes.arrayOf(
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
  /* eslint-disable react/forbid-prop-types */
  sessionData: PropTypes.object.isRequired,
};

export default BusinessDash;
