/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { useRouter } from 'next/router';

import { useSession, getSession } from 'next-auth/client';

import PropTypes from 'prop-types';

import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

import UserBoxLinks from '../../../../components/shared/layoutLinks/links';
import MenuItems from '../../../../components/shared/layoutLinks/items';
import Dash from '../../../../layouts/dash';
import Profile from '../../../../components/dash/profile';

const ProfilePage = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [session] = useSession();
  console.log(session);

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
      <Profile user={data} />
    </Dash>
  );
};

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (session.type === 'business') {
    return {
      redirect: {
        destination: `/dashboards/business/${session.id}`,
        permanent: false,
      },
    };
  }

  const { id } = ctx.query;

  await dbConnect();

  const user = await User.findById(id);

  return {
    props: {
      data: JSON.parse(JSON.stringify(user)),
    },
  };
}

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfilePage;
