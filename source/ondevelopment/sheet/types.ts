export type DrawerDirection = "top" | "bottom" | "left" | "right";
export interface SnapPoint {
  fraction: number;
  height: number;
}

// constants
export const TRANSITIONS = {
  DURATION: 0.35,
  EASE: [0.32, 0.72, 0, 1]
};

export const VELOCITY_THRESHOLD = 0.4;
