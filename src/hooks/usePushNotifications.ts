import { useEffect, useRef } from "react";
import { useAppSelector } from "./storeHooks";
import api from "../api/api";
import {
  requestNotificationPermission,
  subscribeToPush,
} from "../utils/pushNotifications";

const usePushNotifications = () => {
  const user = useAppSelector((state) => state.auth.user);
  const subscribedRef = useRef(false);

  useEffect(() => {
    if (!user?.id) {
      subscribedRef.current = false;
      return;
    }

    if (subscribedRef.current) return;

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    const setup = async () => {
      try {
        const permission = await requestNotificationPermission();
        if (permission !== "granted") return;

        const { data } = await api.get("/push/vapid-key");
        const vapidPublicKey = data.publicKey;
        if (!vapidPublicKey) return;

        await subscribeToPush(vapidPublicKey);
        subscribedRef.current = true;
      } catch {
        // Silently handle errors to avoid disrupting UX
      }
    };

    setup();
  }, [user?.id]);
};

export default usePushNotifications;
