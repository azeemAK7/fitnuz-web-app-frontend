import type {
  NotificationAction,
  NotificationState,
} from "../../types/notificationTypes";

const MAX_NOTIFICATIONS = 50;

const storedNotifications = JSON.parse(
  localStorage.getItem("notifications") ?? "[]"
);

const initialState: NotificationState = {
  notifications: storedNotifications,
  unreadCount: storedNotifications.filter(
    (n: { read: boolean }) => !n.read
  ).length,
};

export const notificationReducer = (
  state = initialState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      const updated = [action.payload, ...state.notifications].slice(
        0,
        MAX_NOTIFICATIONS
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }

    case "MARK_NOTIFICATION_READ": {
      const notifications = state.notifications.map((n) =>
        n.id === action.payload ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }

    case "MARK_ALL_NOTIFICATIONS_READ": {
      return {
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      };
    }

    case "REMOVE_NOTIFICATION": {
      const notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }

    case "CLEAR_ALL_NOTIFICATIONS": {
      return {
        notifications: [],
        unreadCount: 0,
      };
    }

    default:
      return state;
  }
};
