import { useState, useRef, useEffect } from "react";
import { Badge } from "@mui/material";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import type { NotificationType } from "../../types/notificationTypes";

const getRelativeTime = (dateString: string): string => {
  const now = Date.now();
  const diff = now - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notifications, unreadCount } = useAppSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNotificationClick = (notification: NotificationType) => {
    if (!notification.read) {
      dispatch({ type: "MARK_NOTIFICATION_READ", payload: notification.id });
    }
    setOpen(false);
    navigate("/profile/orders");
  };

  const handleMarkAllRead = () => {
    dispatch({ type: "MARK_ALL_NOTIFICATIONS_READ" });
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL_NOTIFICATIONS" });
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-gray-200 hover:text-white transition-colors hover:cursor-pointer"
      >
        <Badge
          badgeContent={unreadCount}
          color="error"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <IoNotifications size={24} />
        </Badge>
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800 text-sm">
              Notifications
            </h3>
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                No notifications yet
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  {!notification.read && (
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                  <div className={notification.read ? "ml-5" : ""}>
                    <p className="text-sm font-medium text-gray-800">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {getRelativeTime(notification.createdAt)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
