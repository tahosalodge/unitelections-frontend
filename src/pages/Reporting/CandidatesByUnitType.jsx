import React, { memo } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const UnitType = ({ data }) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data.elections}
      dataKey="count"
      cx={200}
      cy={200}
      outerRadius={60}
      fill="#8884d8"
      name="Elections"
    />
    <Pie
      data={data.candidates}
      dataKey="count"
      cx={200}
      cy={200}
      innerRadius={70}
      outerRadius={90}
      fill="#82ca9d"
      name="Candidates"
    />
    <Legend
      content={legendProps => {
        console.log({ legendProps });
      }}
    />
    <Tooltip />
  </PieChart>
);

export default memo(UnitType);
