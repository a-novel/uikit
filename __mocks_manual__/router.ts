import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const newRouterMock = (): AppRouterInstance => ({
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
});
