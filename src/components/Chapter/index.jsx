import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChapter } from 'selectors/auth';
import { chapterShape } from 'shapes/auth';

const Chapter = ({ chapter, suffix }) => {
  if (!chapter) {
    return null;
  }
  return <Fragment>{`${chapter.name} ${suffix}`}</Fragment>;
};

Chapter.propTypes = {
  chapter: chapterShape.isRequired,
  suffix: PropTypes.string,
};

Chapter.defaultProps = {
  suffix: 'Chapter',
};

const mapStateToProps = (state, { chapterId }) => ({
  chapter: getChapter(state, chapterId),
});

export default connect(mapStateToProps)(Chapter);
