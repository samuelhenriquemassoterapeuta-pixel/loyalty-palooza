import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "../AuthContext";

// Mock Supabase client
const mockUnsubscribe = vi.fn();
const mockOnAuthStateChange = vi.fn().mockReturnValue({
  data: { subscription: { unsubscribe: mockUnsubscribe } },
});
const mockGetSession = vi.fn();
const mockSignUp = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: (...args: any[]) => mockGetSession(...args),
      onAuthStateChange: (...args: any[]) => mockOnAuthStateChange(...args),
      signUp: (...args: any[]) => mockSignUp(...args),
      signInWithPassword: (...args: any[]) => mockSignInWithPassword(...args),
      signOut: (...args: any[]) => mockSignOut(...args),
    },
  },
}));

// Test component to access context
const TestComponent = () => {
  const { user, loading, signUp, signIn, signOut } = useAuth();

  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="user">{user ? user.email : "no user"}</div>
      <button onClick={() => signUp("test@test.com", "Password1!", "Test")}>
        Sign Up
      </button>
      <button onClick={() => signIn("test@test.com", "Password1!")}>
        Sign In
      </button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{ui}</AuthProvider>
    </QueryClientProvider>
  );
};

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    });
  });

  it("inicializa com loading true e depois false", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: null },
    });

    renderWithProviders(<TestComponent />);

    expect(screen.getByTestId("loading")).toHaveTextContent("true");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
  });

  it("carrega usuário existente na inicialização", async () => {
    const mockUser = { id: "123", email: "existing@test.com" };
    const mockSession = { user: mockUser };

    mockGetSession.mockResolvedValue({
      data: { session: mockSession },
    });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("existing@test.com");
    });
  });

  it("signUp chama supabase.auth.signUp com dados corretos", async () => {
    const user = userEvent.setup();

    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignUp.mockResolvedValue({ data: { user: null }, error: null });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    await act(async () => {
      await user.click(screen.getByText("Sign Up"));
    });

    expect(mockSignUp).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@test.com",
        password: "Password1!",
        options: expect.objectContaining({
          data: expect.objectContaining({ nome: "Test" }),
        }),
      })
    );
  });

  it("signIn chama supabase.auth.signInWithPassword", async () => {
    const user = userEvent.setup();

    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: null,
    });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    await act(async () => {
      await user.click(screen.getByText("Sign In"));
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "Password1!",
    });
  });

  it("signOut chama supabase.auth.signOut", async () => {
    const user = userEvent.setup();
    const mockUser = { id: "123", email: "test@test.com" };
    const mockSession = { user: mockUser };

    mockGetSession.mockResolvedValue({ data: { session: mockSession } });
    mockSignOut.mockResolvedValue({ error: null });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@test.com");
    });

    await act(async () => {
      await user.click(screen.getByText("Sign Out"));
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it("onAuthStateChange atualiza o estado quando sessão muda", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });

    // Capture the callback
    let authCallback: (event: string, session: any) => void;
    mockOnAuthStateChange.mockImplementation((cb) => {
      authCallback = cb;
      return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
    });

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    // Simulate auth state change
    const newUser = { id: "456", email: "new@test.com" };
    act(() => {
      authCallback("SIGNED_IN", { user: newUser });
    });

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("new@test.com");
    });
  });

  it("cleanup remove subscription ao desmontar", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });

    const { unmount } = renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("useAuth fora do provider lança erro", () => {
    const ErrorComponent = () => {
      useAuth();
      return null;
    };

    expect(() => render(<ErrorComponent />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );
  });
});
