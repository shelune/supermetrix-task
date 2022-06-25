import React, { FC, useMemo } from "react";
import type { Post } from "../../shared/api";
import { PostColumn } from "./post-column/post-column";

import css from "./posts.module.scss";
import { UserColumn } from "./user-column/user-column";

export type UserData = {
  name: string;
  userId: string;
  postCount: number;
};

type Props = {
  posts: Post[];
  currentPage: number;
  activeUser: string;
  error: string;
  loading: boolean;
  loadMore: () => void;
};

export const PostsView: FC<Props> = ({
  posts,
  currentPage,
  activeUser,
  error,
  loading,
  loadMore,
}) => {
  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        activeUser ? post.authorId === activeUser : true,
      ),
    [activeUser, posts],
  );
  return (
    <>
      {error && <div className={css.error}>{error}</div>}
      <div className={css.container}>
        <UserColumn
          posts={filteredPosts}
          activeUser={activeUser}
          loading={loading}
        />
        <PostColumn
          posts={filteredPosts}
          currentPage={currentPage}
          loading={loading}
          loadMore={loadMore}
        />
      </div>
    </>
  );
};
