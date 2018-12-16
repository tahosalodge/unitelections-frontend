export const getAuth = state => state.auth;

export const getChapters = state => state.auth.lodge.chapters;

export const getChapter = (state, chapterId) =>
  getChapters(state).find(chapter => chapter._id === chapterId);
