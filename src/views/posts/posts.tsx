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
  users: UserData[];
  currentPage: number;
  activeUser: string;
  error: string;
  loadMore: () => void;
  setActiveUser: (userId: string) => void;
};

export const PostsView: FC<Props> = ({
  posts,
  users,
  currentPage,
  activeUser,
  error,
  loadMore,
  setActiveUser,
}) => {
  console.log("posts view");
  return (
    <div className={css.container}>
      {error && <div className={css.error}>{error}</div>}
      <UserColumn
        users={users}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
      />
      <PostColumn posts={posts} loadMore={loadMore} currentPage={currentPage} />
    </div>
  );
};
