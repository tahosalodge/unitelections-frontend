import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getChapter } from 'selectors/auth';

const Chapter = ({ chapter }) => (
  <Fragment>{`${chapter.name} Chapter`}</Fragment>
);

const mapStateToProps = (state, { chapterId }) => ({
  chapter: getChapter(state, chapterId),
});

export default connect(mapStateToProps)(Chapter);
