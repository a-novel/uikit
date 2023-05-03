import { useContext } from "react";

import { newAPIError } from "../../__mocks_manual__/utils";
import { RenderResult, act, render, waitFor } from "@testing-library/react";

import { AuthContext, LOCAL_STORAGE_KEY, WithAuth } from "@contexts";

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

interface MockAPIParams {
  token?: string;
  error?: unknown;
  delay?: number;
}

const mockAPI = ({ token, error, delay }: MockAPIParams) =>
  jest.fn().mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        setTimeout(() => (error ? reject(error) : resolve(token)), delay || 0);
      })
  );

const AuthContextTestConsumer = () => {
  const { logout, login, error, status, token, apiError } = useContext(AuthContext);

  if (apiError) {
    return <div data-testid="apiError">{apiError.status}</div>;
  }
  if (error) {
    return <div data-testid="error">{`${error}`}</div>;
  }

  return (
    <>
      <div data-testid="status">{status}</div>
      <div data-testid="token">{token || "NO TOKEN"}</div>

      {status === "authenticated" ? (
        <button data-testid="logout" onClick={logout}>
          logout
        </button>
      ) : null}

      {status === "unauthenticated" ? (
        <button data-testid="login" onClick={() => login("fake.login.token")}>
          login
        </button>
      ) : null}
    </>
  );
};

interface ExpectAuthContextParams {
  wrapper: RenderResult;
  apiCall: jest.Mock;
  expectAPICalls?: string[];
  expectAPIError?: string;
  expectStatus?: string;
  expectToken?: string;
  expectStorageToken?: string;
  expectLogoutButton?: boolean;
  expectLoginButton?: boolean;
}

const expectAuthContext = async ({
  wrapper,
  apiCall,
  expectAPICalls = [],
  expectAPIError,
  expectStatus,
  expectToken,
  expectLogoutButton,
  expectLoginButton,
  expectStorageToken,
}: ExpectAuthContextParams) => {
  await waitFor(
    () => {
      expect(apiCall).toHaveBeenCalledTimes(expectAPICalls.length);
      for (const i in expectAPICalls) {
        expect(apiCall).toHaveBeenNthCalledWith(parseInt(i) + 1, expectAPICalls[i]);
      }

      expect(wrapper.queryByTestId("error")).not.toBeInTheDocument();

      if (expectAPIError) {
        expect(wrapper.getByTestId("apiError").textContent).toBe(expectAPIError);
      } else {
        expect(wrapper.queryByTestId("apiError")).not.toBeInTheDocument();
      }

      if (expectStatus) {
        expect(wrapper.getByTestId("status").textContent).toBe(expectStatus);
      } else {
        expect(wrapper.queryByTestId("status")).not.toBeInTheDocument();
      }

      if (expectToken) {
        expect(wrapper.getByTestId("token").textContent).toBe(expectToken);
      } else {
        expect(wrapper.queryByTestId("token")).not.toBeInTheDocument();
      }

      if (expectLogoutButton) {
        expect(wrapper.getByTestId("logout")).toBeInTheDocument();
      } else {
        expect(wrapper.queryByTestId("logout")).not.toBeInTheDocument();
      }

      if (expectLoginButton) {
        expect(wrapper.getByTestId("login")).toBeInTheDocument();
      } else {
        expect(wrapper.queryByTestId("login")).not.toBeInTheDocument();
      }

      if (expectStorageToken) {
        expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBe(expectStorageToken);
      } else {
        expect(localStorage.getItem(LOCAL_STORAGE_KEY)).toBeNull();
      }
    },
    { timeout: 10000 }
  );
};

describe("WithAuth", () => {
  describe("initialization", () => {
    it("should wait for the api response before setting status to authenticated, and use the token from the api", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ token: "new.api.token", delay: 1000 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "loading",
        expectToken: "old.storage.token",
        expectStorageToken: "old.storage.token",
      });

      await act(async () => {
        jest.advanceTimersByTime(500);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "loading",
        expectToken: "old.storage.token",
        expectStorageToken: "old.storage.token",
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });
    });

    it("should logout if the api call returns a 403 status", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ error: newAPIError(403), delay: 1000 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "loading",
        expectToken: "old.storage.token",
        expectStorageToken: "old.storage.token",
      });

      await act(async () => {
        jest.advanceTimersByTime(1200);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectAPIError: "403",
      });
    });

    // This should be treated as a critical error if it happens in production.
    it("should keep local token, but throw an error if the api fails with a non-403 status", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ error: newAPIError(500), delay: 1000 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "loading",
        expectToken: "old.storage.token",
        expectStorageToken: "old.storage.token",
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectAPIError: "500",
        expectStorageToken: "old.storage.token",
      });
    });

    it("should do nothing with no local tokens", async () => {
      const apiCall = mockAPI({ token: "new.api.token", delay: 1000 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectStatus: "unauthenticated",
        expectToken: "NO TOKEN",
        expectLoginButton: true,
      });
    });
  });

  describe("handlers", () => {
    it("should set the token when calling login method", async () => {
      const apiCall = mockAPI({ token: "new.api.token", delay: 1000 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectStatus: "unauthenticated",
        expectToken: "NO TOKEN",
        expectLoginButton: true,
      });

      await act(async () => {
        wrapper.getByTestId("login").click();
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectStatus: "authenticated",
        expectToken: "fake.login.token",
        expectStorageToken: "fake.login.token",
        expectLogoutButton: true,
      });
    });

    it("should remove the token and call the api when calling logout method", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ token: "new.api.token", delay: 50 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });

      await act(async () => {
        wrapper.getByTestId("logout").click();
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "unauthenticated",
        expectToken: "NO TOKEN",
        expectLoginButton: true,
      });

      // Ensure the api is not called again uselessly.
      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await waitFor(() => {
        expect(apiCall).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("auto refresh", () => {
    it("should automatically refresh the token, when the user is logged in and the interval is set", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ token: "new.api.token", delay: 100 });

      const wrapper = render(
        <WithAuth api={apiCall} checkInterval={1000}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });

      apiCall.mockImplementation(mockAPI({ token: "newer.api.token", delay: 100 }));

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token", "new.api.token"],
        expectStatus: "authenticated",
        expectToken: "newer.api.token",
        expectStorageToken: "newer.api.token",
        expectLogoutButton: true,
      });
    });

    it("should not automatically refresh the token, when the user is logged in and the interval is set to 0", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ token: "new.api.token", delay: 100 });

      const wrapper = render(
        <WithAuth api={apiCall}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });
      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });
    });

    it("should not automatically refresh the token, when the user is logged out", async () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, "old.storage.token");
      const apiCall = mockAPI({ token: "new.api.token", delay: 100 });

      const wrapper = render(
        <WithAuth api={apiCall} checkInterval={1000}>
          <AuthContextTestConsumer />
        </WithAuth>
      );

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token", "new.api.token"],
        expectStatus: "authenticated",
        expectToken: "new.api.token",
        expectStorageToken: "new.api.token",
        expectLogoutButton: true,
      });

      await act(async () => {
        wrapper.getByTestId("logout").click();
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token", "new.api.token"],
        expectStatus: "unauthenticated",
        expectToken: "NO TOKEN",
        expectLoginButton: true,
      });

      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await expectAuthContext({
        wrapper,
        apiCall,
        expectAPICalls: ["old.storage.token", "new.api.token"],
        expectStatus: "unauthenticated",
        expectToken: "NO TOKEN",
        expectLoginButton: true,
      });
    });
  });
});
