export const addNotification = notification => ({
  type: 'ENQUEUE_NOTIFICATION',
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification,
  },
});

export const removeNotification = key => ({
  type: 'REMOVE_NOTIFICATION',
  key,
});

const defaultState = {
  notifications: [],
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ENQUEUE_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        ),
      };

    default:
      return state;
  }
};
