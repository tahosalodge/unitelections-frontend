import get from 'lodash/get';

export const getAuth = state => state.auth;

export const getChapters = state => get(state.auth, ['lodge', 'chapters'], []);

export const getChapter = (state, chapterId) =>
  getChapters(state).find(chapter => chapter._id === chapterId);

export const getManageableChapters = state =>
  get(state.auth, ['user', 'belongsTo'], []).filter(
    b => b.model === 'Chapter' && b.canManage
  );

export const getIsAdmin = state => get(state.auth, ['user', 'isAdmin'], false);
