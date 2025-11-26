import { useEffect, useLayoutEffect } from "react";

/**
 * Custom hook that maps to useLayoutEffect on the client and useEffect on the server.
 * Prevents warnings about useLayoutEffect when rendering on the server.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
