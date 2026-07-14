"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Gift,
  PackageCheck,
  Sparkles,
  Truck,
  Watch,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  notifications as initialNotifications,
  notificationPreferenceCopy,
  type Notification,
  type NotificationCategory,
  type NotificationPreferenceKey,
} from "@/lib/memberData";
import { SectionHeader } from "@/components/account/SectionHeader";
import { EmptyState } from "@/components/account/EmptyState";
import { Switch } from "@/components/ui/Switch";
import { Reveal } from "@/components/ui/Reveal";

const STORAGE_KEY = "sole-arium.notificationPrefs";

const categoryIcons: Record<NotificationCategory, LucideIcon> = {
  Drop: Sparkles,
  Restock: PackageCheck,
  Preorder: Watch,
  Shipping: Truck,
  Offer: Gift,
};

type Preferences = Record<NotificationPreferenceKey, boolean>;

const defaultPreferences: Preferences = {
  dropAnnouncements: true,
  restockAlerts: true,
  preorderUpdates: true,
  shippingUpdates: true,
  exclusiveOffers: true,
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
    } catch {
      setPreferences(defaultPreferences);
    }
  }, []);

  if (!user) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function updatePreference(key: NotificationPreferenceKey, checked: boolean) {
    setPreferences((prev) => {
      const next = { ...prev, [key]: checked };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailablgnore, preference still applies for this session
      }
      return next;
    });
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Notifications"
        title="Stay in the Loop"
        description="Drop announcements, restock alerts and order updatell in one place."
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="All caught up"
          description="Drop announcements, restock alerts and order updates will appear here."
          actionLabel="Explore the Collection"
          actionHref="/shop"
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="font-medium">Recent</p>
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              data-cursor={unreadCount === 0 ? undefined : "pointer"}
              className={cn(
                "link-underline text-sm",
                unreadCount === 0 ? "cursor-not-allowed text-ink-faint" : "text-ink-muted"
              )}
            >
              Mark all as read
            </button>
          </div>

          <Reveal className="rounded-2xl border border-line divide-y divide-line">
            {notifications.map((notification) => {
              const Icon = categoryIcons[notification.category];
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markAsRead(notification.id)}
                  data-cursor="pointer"
                  className="flex w-full items-start gap-4 px-6 py-4 text-left"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper-soft">
                    <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!notification.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />}
                      <p
                        className={cn(
                          "truncate text-sm",
                          notification.read ? "text-ink-muted" : "font-medium text-ink"
                        )}
                      >
                        {notification.title}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">{notification.message}</p>
                  </div>
                  <span className="shrink-0 text-xs text-ink-faint">{notification.date}</span>
                </button>
              );
            })}
          </Reveal>
        </>
      )}

      <Reveal className="mt-14 rounded-2xl border border-line p-7">
        <p className="mb-6 font-medium">Preferences</p>
        <div className="divide-y divide-line">
          {Object.entries(notificationPreferenceCopy).map(([key, copy]) => {
            const prefKey = key as NotificationPreferenceKey;
            return (
              <div key={key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium">{copy.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{copy.description}</p>
                </div>
                <Switch
                  checked={preferences[prefKey]}
                  onChange={(checked) => updatePreference(prefKey, checked)}
                  label={copy.title}
                />
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
