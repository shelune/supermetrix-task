import axios from "axios";
import React, { ReactNode } from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { PostsView } from "./posts";
import { mockPosts } from "../../shared/__mock__/posts";
import { Post } from "../../shared/api";

jest.mock("./post-column/post-column.tsx", () => ({
  PostColumn: ({ posts }: { posts: Post[] }) => (
    // eslint-disable-next-line react/destructuring-assignment
    <div>{`Post Column: ${posts.length} posts`}</div>
  ),
}));

jest.mock("./user-column/user-column.tsx", () => ({
  UserColumn: () => (
    // eslint-disable-next-line react/destructuring-assignment
    <div>User Column</div>
  ),
}));

describe("PostsView", () => {
  it("should render", () => {
    const { container } = render(
      <PostsView
        posts={mockPosts}
        currentPage={1}
        activeUser=""
        error=""
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
