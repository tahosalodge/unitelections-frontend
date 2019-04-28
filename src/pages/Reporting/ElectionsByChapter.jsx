import React, { memo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// eslint-disable-next-line react/prop-types
const ElectionsByChapter = ({ data }) => {
  return (
    <RadarChart
      cx={300}
      cy={250}
      outerRadius={150}
      width={600}
      height={500}
      data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        name="Elections"
        dataKey="count"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default memo(ElectionsByChapter);
