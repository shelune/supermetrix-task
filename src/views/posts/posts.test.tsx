import { createMemoryHistory } from "history";
import * as ReactRouterDom from "react-router-dom";
import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { PostsView } from "./posts";
import { mockPosts } from "../../shared/__mock__/posts";

function renderWithRouter(children: ReactNode) {
  const history = createMemoryHistory();
  return render(
    <ReactRouterDom.Router location={history.location} navigator={history}>
      {children}
    </ReactRouterDom.Router>,
  );
}

describe("PostsView", () => {
  it("should factor in activeUser", () => {
    const { getAllByTestId } = renderWithRouter(
      <PostsView
        posts={mockPosts}
        currentPage={1}
        activeUser="user_15"
        error=""
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    // eslint-disable-next-line jest-dom/prefer-in-document
    expect(getAllByTestId("user-item")).toHaveLength(1);
    expect(getAllByTestId("post-item")).toHaveLength(7);
  });
});
