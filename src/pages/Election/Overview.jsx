import React, { Fragment } from 'react';
import Page from 'components/Page';
import timeZone from 'constants/timeZone';
import { format } from 'date-fns-tz';
import { electionShape } from 'shapes/election';

const ElectionOverview = ({ election }) => (
  <Page
    id="election-overview"
    title={`Election - ${election.status}`}
    fullwidth
    squareBottom
    noShadow
  >
    {election.status === 'Requested' && (
      <Fragment>
        <h4>Requested Dates</h4>
        <ul>
          {election.requestedDates.map(reqDate => (
            <li key={reqDate}>
              {format(reqDate, 'MMMM do, YYYY', {
                awareOfUnicodeTokens: true,
                timeZone,
              })}
            </li>
          ))}
        </ul>
      </Fragment>
    )}
    {election.status !== 'Requested' && (
      <h3>
        Date:
        {format(election.date, 'MMMM do, YYYY', {
          awareOfUnicodeTokens: true,
        })}
      </h3>
    )}
  </Page>
);

ElectionOverview.propTypes = {
  election: electionShape.isRequired,
};

export default ElectionOverview;
