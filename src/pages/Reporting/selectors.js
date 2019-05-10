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

const byUnitType = ({ candidates, units, elections }) => {
  const electionBins = groupBy(elections, ({ unit }) => {
    const electionUnit = units
      .filter(u => u.unitType)
      .find(u => u._id === unit);
    return electionUnit ? electionUnit.type : 'Troop';
  });
  const candidateBins = groupBy(candidates, ({ unit, unitType }) => {
    const candidateUnit =
      unitType || units.filter(u => u.unitType).find(u => u._id === unit);
    return candidateUnit ? candidateUnit.unitType : 'Troop';
  });
  return {
    elections: Object.entries(electionBins).map(([type, electionsForType]) => ({
      name: type,
      count: electionsForType.length,
    })),
    candidates: Object.entries(candidateBins).map(
      ([type, candidatesForType]) => ({
        name: type,
        count: candidatesForType.length,
      })
    ),
  };
};

export const calculateReports = ({
  elections,
  chapters,
  candidates,
  units,
}) => ({
  electionsByMonth: electionsByMonth(elections),
  electionsByChapter: electionsByChapter({ elections, chapters }),
  electionsByDOW: electionsByDOW(elections),
  unitType: byUnitType({ candidates, units, elections }),
});
