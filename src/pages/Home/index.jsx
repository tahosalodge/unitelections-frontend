import React from 'react';
import { Link } from '@reach/router';
import Page from 'components/Page';

const Home = () => (
  <Page>
    <div>
      <h2>
        Hello! Thank you for participating in unit elections with Tahosa Lodge.
      </h2>
      <p>
        If your unit held an election in 2017, check your email for an invite,
        so you can use your existing unit information.
        <br />
        Otherwise,&nbsp;
        <Link to="/register">click here</Link>
        &nbsp; to create an account, add your unit, and request an election!
      </p>
    </div>
  </Page>
);

export default Home;
