import { React, useContext } from 'react';

import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import PostAJobContext from '../../../../../components/contexts/postAJob';

import dbConnect from '../../../../../lib/dbConnect';
import Business from '../../../../../models/Business';

import Checkout from '../../../../../components/checkout';
import MenuItems from '../../../../../components/shared/layoutLinks/items';
import UserBoxLinks from '../../../../../components/shared/layoutLinks/links';

import Dash from '../../../../../layouts/dash';

const BusinessCheckout = ({ data }) => {
  const form = useContext(PostAJobContext);
  const router = useRouter();
  const { id } = router.query;

  return (
    <Dash
      data={data}
      items={<MenuItems id={id} type="business" path={router.asPath} />}
      links={
        <UserBoxLinks
          id={id}
          avatar={data.avatar}
          sessionName={data.sessionName}
          businessName={data.businessName}
          type="business"
        />
      }
    >
      <Checkout form={form.postAJobform} />
    </Dash>
  );
};

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  const business = await Business.findById(id);

  return {
    props: {
      data: JSON.parse(JSON.stringify(business)),
    },
  };
}

BusinessCheckout.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  data: PropTypes.object.isRequired,
};

export default BusinessCheckout;
