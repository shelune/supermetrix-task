import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import React, { ReactNode } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { UserColumn } from "./user-column";
import { mockPosts } from "../../../shared/__mock__/posts";

function renderWithRouter(children: ReactNode) {
  const history = createMemoryHistory();
  return render(
    <Router location={history.location} navigator={history}>
      {children}
    </Router>,
  );
}

describe("UserColumn", () => {
  it("should render", () => {
    const { container } = renderWithRouter(
      <UserColumn posts={mockPosts} activeUser="" loading={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should have correct numbers of users based on posts", () => {
    const { getAllByTestId } = renderWithRouter(
      <UserColumn posts={mockPosts} activeUser="" loading={false} />,
    );
    expect(getAllByTestId("user-item")).toHaveLength(20);
  });

  it("should filter out users based on search", () => {
    const { getByTestId, getAllByTestId, getByText } = renderWithRouter(
      <UserColumn posts={mockPosts} activeUser="" loading={false} />,
    );
    const userSearch = getByTestId("user-search-text");
    act(() => {
      fireEvent.change(userSearch, {
        target: {
          value: "Quyen",
        },
      });
    });
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(getAllByTestId("user-item")).toHaveLength(1);
    expect(getByText("Quyen Pellegrini")).toBeInTheDocument();
  });

  it("should render accordingly when there's an active user", () => {
    const { container } = renderWithRouter(
      <UserColumn posts={mockPosts} activeUser="user_19" loading={false} />,
    );
    expect(container.getElementsByClassName("isActive")).toHaveLength(1);
  });

  it("should render loading state", () => {
    const { container } = renderWithRouter(
      <UserColumn posts={mockPosts} activeUser="" loading />,
    );
    expect(container).toMatchSnapshot();
  });
});
