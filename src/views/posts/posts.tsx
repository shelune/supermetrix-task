import React, { FC } from "react";
import { Post } from "../../shared/api";
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
}) => (
  <>
    {error && <div className={css.error}>{error}</div>}
    <div className={css.container}>
      <UserColumn posts={posts} activeUser={activeUser} loading={loading} />
      <PostColumn
        posts={posts}
        currentPage={currentPage}
        loading={loading}
        loadMore={loadMore}
      />
    </div>
  </>
);
