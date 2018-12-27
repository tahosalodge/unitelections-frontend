export const getAuth = state => state.auth;

export const getChapters = state => state.auth.lodge.chapters;

export const getChapter = (state, chapterId) =>
  getChapters(state).find(chapter => chapter._id === chapterId);

export const getManageableChapters = state =>
  state.auth.user.belongsTo.filter(b => b.model === 'Chapter' && b.canManage);
