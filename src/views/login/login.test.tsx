import axios from "axios";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import React, { ReactNode } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { LoginView } from "./login";
import { setCookie } from "../../shared/utils/cookie";

jest.mock("axios");
jest.mock("../../shared/utils/cookie", () => ({
  setCookie: jest.fn(),
}));

const mockedUseNavigate = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

function renderWithRouter(children: ReactNode) {
  const history = createMemoryHistory();
  return render(
    <Router location={history.location} navigator={history}>
      {children}
    </Router>,
  );
}

describe("LoginView", () => {
  it("should render", async () => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { container } = await renderWithRouter(
      <LoginView setToken={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render input accordingly if it has value", () => {
    const { getByLabelText, getByText } = render(
      <LoginView setToken={jest.fn()} />,
    );
    act(() => {
      fireEvent.change(getByLabelText("Email"), {
        target: {
          value: "hello",
        },
      });
    });
    expect(getByText("Email")).toMatchSnapshot();
  });

  it("should render error if login fails", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.reject(new Error("Huh")));

    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { getByTestId } = await renderWithRouter(
      <LoginView setToken={jest.fn()} />,
    );

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await getByTestId("login-submit").click();
    });
    expect(getByTestId("login-error")).toBeInTheDocument();
  });

  it("should behave correctly if login succeeds", async () => {
    const mockSetToken = jest.fn();
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const { getByTestId } = await renderWithRouter(
      <LoginView setToken={mockSetToken} />,
    );
    mockedAxios.post.mockReturnValueOnce(
      Promise.resolve({
        data: {
          data: {
            sl_token: "token",
          },
        },
      }),
    );
    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await getByTestId("login-submit").click();
    });
    expect(mockSetToken).toHaveBeenCalledWith("token");
    expect(mockedUseNavigate).toHaveBeenCalledWith("/posts");
    expect(setCookie).toHaveBeenCalled();
  });
});
