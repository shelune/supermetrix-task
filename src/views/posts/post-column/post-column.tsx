import classNames from "classnames";
import debounce from "lodash.debounce";
import format from "date-fns/format";
import React, { FC, useMemo, useRef, useState } from "react";
import type { Post } from "../../../shared/api";
import { highlightText } from "../../../shared/utils/highlightText";
import { MAX_PAGE } from "../data";

import css from "./post-column.module.scss";

type SortOption = "ascending" | "descending";

type Props = {
  posts: Post[];
  currentPage: number;
  loading: boolean;
  loadMore: () => void;
};

export const PostColumn: FC<Props> = ({
  posts,
  loading,
  currentPage,
  loadMore,
}) => {
  const [sort, setSort] = useState<SortOption>("descending");
  // search for visual purpose only
  const [search, setSearch] = useState("");
  // search for highlighting search result
  const [searchValue, setSearchValue] = useState("");

  const { current: debouncedOnChange } = useRef(debounce(setSearchValue, 250));

  const filteredPosts = useMemo(
    () =>
      posts
        .filter((post) =>
          post.message.toLowerCase().includes(searchValue.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "descending"
            ? b.createdTime.getTime() - a.createdTime.getTime()
            : a.createdTime.getTime() - b.createdTime.getTime(),
        ),
    [posts, searchValue, sort],
  );
  return (
    <div className={css.container}>
      <div className={css.columnHeader}>
        <div className={css.sortBar}>
          <span>Sort by</span>
          {["descending", "ascending"].map((type) => (
            <span
              key={type}
              className={classNames(css.sortPill, {
                [css.isActive]: sort === type,
              })}
              role="button"
              tabIndex={0}
              onClick={() => setSort(type as SortOption)}
              onKeyDown={() => {}}
            >
              {type}
            </span>
          ))}
        </div>
        <div className={css.searchBar}>
          <input
            data-testid="post-search-text"
            type="text"
            className={css.textInput}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              debouncedOnChange(e.target.value);
            }}
            placeholder="Search"
          />
        </div>
      </div>
      <div className={css.columnBody}>
        <div className={css.postList}>
          {loading ? (
            <div className={css.postListLoading}>Loading...</div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className={css.postItem}
                data-testid="post-item"
              >
                <div className={css.postHeader}>
                  <span className={css.date}>
                    {format(post.createdTime, "Pp")}
                  </span>
                  <span className={css.author}>{` by ${post.authorName}`}</span>
                </div>
                <div className={css.postBody}>
                  {searchValue
                    ? highlightText(
                        post.message,
                        searchValue,
                        css.highlightText,
                      )
                    : post.message}
                </div>
              </div>
            ))
          )}
        </div>
        <div className={css.loadMore}>
          <div className={css.pages}>
            {`Page ${currentPage} of ${MAX_PAGE}`}
          </div>
          {currentPage < MAX_PAGE && (
            <button
              className={css.loadMoreButton}
              type="button"
              onClick={() => loadMore()}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
