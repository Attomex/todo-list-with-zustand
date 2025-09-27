export const ALL_STATUSES = ["done", "proccessing", "not-done"] as const;

export type Statuses = typeof ALL_STATUSES[number];