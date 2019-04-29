/* eslint-disable import/prefer-default-export */
import groupBy from 'lodash/groupBy';
import { format } from 'date-fns';

export const electionsByMonth = elections => {
  const electionsWithDate = elections.filter(election => election.date);
  const bins = groupBy(electionsWithDate, ({ date }) => {
    return format(new Date(date), 'MMMM');
  });
  return Object.entries(bins).map(([month, electionsInMonth]) => ({
    name: month,
    count: electionsInMonth.length,
  }));
};
export const electionsByDOW = elections => {
  const electionsWithDate = elections.filter(election => election.date);
  const bins = groupBy(electionsWithDate, ({ date }) => {
    return format(new Date(date), 'EEEE');
  });
  return Object.entries(bins).map(([day, electionsOnDOW]) => ({
    name: day,
    count: electionsOnDOW.length,
  }));
};

const electionsByChapter = ({ elections, chapters }) => {
  const bins = groupBy(elections, ({ chapter }) => {
    return chapter;
  });
  return Object.entries(bins).map(([chapterId, electionsInChapter]) => ({
    name: chapters.find(c => c._id === chapterId).name,
    count: electionsInChapter.length,
    fullMark: elections.length,
  }));
};

export const calculateReports = ({ elections, chapters }) => ({
  electionsByMonth: electionsByMonth(elections),
  electionsByChapter: electionsByChapter({ elections, chapters }),
  electionsByDOW: electionsByDOW(elections),
});
