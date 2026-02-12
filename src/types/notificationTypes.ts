export interface NotificationType {
  id: string;
  type: "ORDER_PLACED" | "ORDER_STATUS_UPDATED";
  title: string;
  message: string;
  orderId: number;
  read: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: NotificationType[];
  unreadCount: number;
}

export type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: NotificationType }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL_NOTIFICATIONS" };
