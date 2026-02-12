import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import api from "../api/api";

interface OrderData {
  orderId: number;
  orderStatus: string;
}

const POLL_INTERVAL = 30_000;

const useNotificationPolling = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isFirstFetch = useRef(true);

  useEffect(() => {
    if (!user?.id) {
      isFirstFetch.current = true;
      return;
    }

    const checkOrderStatusChanges = async () => {
      try {
        const { data } = await api.get("/user/orders");
        const orders: OrderData[] = data.content ?? [];

        const storedRaw = localStorage.getItem("orderStatusSnapshot");
        const storedSnapshot: Record<number, string> = storedRaw
          ? JSON.parse(storedRaw)
          : {};

        if (isFirstFetch.current) {
          // First fetch: record snapshot only, no notifications
          const snapshot: Record<number, string> = {};
          for (const order of orders) {
            snapshot[order.orderId] = order.orderStatus;
          }
          localStorage.setItem(
            "orderStatusSnapshot",
            JSON.stringify(snapshot)
          );
          isFirstFetch.current = false;
          return;
        }

        const newSnapshot: Record<number, string> = {};
        for (const order of orders) {
          newSnapshot[order.orderId] = order.orderStatus;
          const previousStatus = storedSnapshot[order.orderId];

          if (previousStatus && previousStatus !== order.orderStatus) {
            dispatch({
              type: "ADD_NOTIFICATION",
              payload: {
                id: `status-${order.orderId}-${Date.now()}`,
                type: "ORDER_STATUS_UPDATED",
                title: "Order Status Updated",
                message: `Order #${order.orderId} status changed to ${order.orderStatus}`,
                orderId: order.orderId,
                read: false,
                createdAt: new Date().toISOString(),
              },
            });
          }
        }

        localStorage.setItem(
          "orderStatusSnapshot",
          JSON.stringify(newSnapshot)
        );
      } catch {
        // Silently handle errors to avoid disrupting UX
      }
    };

    checkOrderStatusChanges();
    const intervalId = setInterval(checkOrderStatusChanges, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [user?.id, dispatch]);
};

export default useNotificationPolling;
