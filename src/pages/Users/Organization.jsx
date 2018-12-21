import React from 'react';
import { connect } from 'react-redux';
import { Chip } from '@material-ui/core';
import { getChapters } from 'selectors/auth';

const Organization = ({
  organization: { model, details, organization },
  chapters,
  className,
}) => {
  if (chapters && model === 'Chapter') {
    const chapter = chapters.find(c => c._id === organization);
    return <Chip className={className} label={`Chapter: ${chapter.name}`} />;
  }
  if (details && model === 'Unit') {
    return (
      <Chip
        className={className}
        label={`Unit: ${details.unitType} ${details.number}`}
      />
    );
  }
  return <Chip className={className} label={`${model}: ${organization}`} />;
};

const mapStateToProps = state => ({
  chapters: getChapters(state),
});

export default connect(mapStateToProps)(Organization);
