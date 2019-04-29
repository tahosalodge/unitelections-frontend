import React, { memo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

// eslint-disable-next-line react/prop-types
const ElectionsByDOW = ({ data }) => {
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
      <Tooltip />
      <Radar
        name="Elections"
        dataKey="count"
        stroke="#005596"
        fill="#005596"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default memo(ElectionsByDOW);
