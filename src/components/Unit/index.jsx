import React from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { unitShape } from 'shapes/unit';
import createGoogleMapLink from 'utils/googleMapLink';

const formatMeetingLocation = ({ notes, ...meetingLocation }) =>
  Object.values(meetingLocation).join(' ');

const Unit = ({ unit }) => (
  <Table>
    {unit && (
      <TableBody>
        <TableRow>
          <TableCell variant="head">Unit</TableCell>
          <TableCell>{`${unit.unitType} ${unit.number}`}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Unit Leader - Name</TableCell>
          <TableCell>
            {`${unit.unitLeader.fname} ${unit.unitLeader.lname}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Unit Leader - Email</TableCell>
          <TableCell>{unit.unitLeader.email}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Unit Leader - Phone</TableCell>
          <TableCell>{unit.unitLeader.phone}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Unit Leader - Position</TableCell>
          <TableCell>{unit.unitLeader.position}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Meeting Location</TableCell>
          <TableCell>
            <a
              href={createGoogleMapLink(unit.meetingLocation)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formatMeetingLocation(unit.meetingLocation)}
            </a>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell variant="head">Meeting Location - Notes</TableCell>
          <TableCell>{unit.meetingLocation.notes}</TableCell>
        </TableRow>
      </TableBody>
    )}
  </Table>
);

Unit.propTypes = {
  unit: unitShape.isRequired,
};

export default Unit;
