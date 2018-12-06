import { shape, bool, string, number, arrayOf } from 'prop-types';

const authShape = shape({
  loggedIn: bool,
  user: shape({
    fname: string,
    lname: string,
    email: string,
  }),
});

export const chapterShape = shape({
  _id: string,
  name: string,
  district: string,
});

export const lodgeShape = shape({
  _id: string,
  council: number,
  name: string,
  chapters: arrayOf(chapterShape),
});

export default authShape;
