import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getChapter } from 'selectors/auth';
import { chapterShape } from 'shapes/auth';

const Chapter = ({ chapter }) => (
  <Fragment>{`${chapter.name} Chapter`}</Fragment>
);

Chapter.propTypes = {
  chapter: chapterShape.isRequired,
};

const mapStateToProps = (state, { chapterId }) => ({
  chapter: getChapter(state, chapterId),
});

export default connect(mapStateToProps)(Chapter);
