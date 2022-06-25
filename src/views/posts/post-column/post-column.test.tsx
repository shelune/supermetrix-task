import React from "react";
import { act, fireEvent, render } from "@testing-library/react";
import { PostColumn } from "./post-column";
import { mockPosts } from "../../../shared/__mock__/posts";

describe("PostColumn", () => {
  it("should render", () => {
    const { container } = render(
      <PostColumn
        posts={mockPosts}
        currentPage={1}
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should sort by descending or ascending properly", () => {
    const { getAllByTestId, getByText } = render(
      <PostColumn
        posts={mockPosts}
        currentPage={1}
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    act(() => {
      getByText("ascending").click();
    });
    expect(getAllByTestId("post-item")[0]).toHaveTextContent(
      "dorm cheese scream lamb story crowd loan trouble bathroom platform trick marriage huge braid",
    );
  });

  it("should filter by text", async () => {
    const { getByTestId, getAllByTestId } = render(
      <PostColumn
        posts={mockPosts}
        currentPage={1}
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    await act(async () => {
      const search = getByTestId("post-search-text");
      fireEvent.change(search, {
        target: {
          value: "script",
        },
      });
      // due to debounce inside the function
      await new Promise((res) => setTimeout(res, 250));
    });

    expect(getAllByTestId("post-item")).toHaveLength(9);
  });

  it("should call loadMore when clicking load more button", () => {
    const mockLoadMore = jest.fn();
    const { getByText } = render(
      <PostColumn
        posts={mockPosts}
        currentPage={1}
        loading={false}
        loadMore={mockLoadMore}
      />,
    );
    act(() => {
      getByText("Load More").click();
    });
    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });

  it("shouldn't render load more if current page is is 10", () => {
    const { queryByText, getByText } = render(
      <PostColumn
        posts={mockPosts}
        currentPage={10}
        loading={false}
        loadMore={jest.fn()}
      />,
    );
    expect(queryByText("Load More")).not.toBeInTheDocument();
    expect(getByText("Page 10 of 10")).toBeInTheDocument();
  });
});
