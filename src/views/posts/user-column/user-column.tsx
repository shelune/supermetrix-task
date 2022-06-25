import classNames from "classnames";
import React, { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../../../shared/api";
import type { UserData } from "../posts";

import css from "./user-column.module.scss";

type Props = {
  posts: Post[];
  activeUser: string;
  loading: boolean;
};

export const UserColumn: FC<Props> = ({ posts, activeUser, loading }) => {
  const [search, setSearch] = useState("");
  const users: UserData[] = useMemo(() => {
    const dupedUsers = posts.map((post) => ({
      name: post.authorName,
      userId: post.authorId,
    }));
    const filteredUsers = dupedUsers.filter(
      (user, index, array) =>
        array.findIndex((match) => match.userId === user.userId) === index,
    );
    return filteredUsers.map((user) => ({
      ...user,
      postCount: posts.filter((post) => post.authorId === user.userId).length,
    }));
  }, [posts]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, users],
  );
  return (
    <div className={css.container}>
      <div className={css.columnHeader}>
        <div className={css.searchBar}>
          <input
            data-testid="user-search-text"
            type="text"
            className={css.textInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className={css.columnBody} data-testid="user-column-body">
        {loading ? (
          <div className={css.userListLoading}>Loading...</div>
        ) : (
          <div className={css.userList}>
            {filteredUsers.map((user) =>
              activeUser === user.userId ? (
                <Link
                  data-testid="user-item"
                  to="/posts"
                  key={user.userId}
                  className={classNames(css.userItem, css.isActive)}
                >
                  <div className={css.name}>{user.name}</div>
                  <div className={css.postCount}>{user.postCount}</div>
                </Link>
              ) : (
                <Link
                  data-testid="user-item"
                  to={`/posts/${user.userId}`}
                  key={user.userId}
                  className={classNames(css.userItem)}
                >
                  <div className={css.name}>{user.name}</div>
                  <div className={css.postCount}>{user.postCount}</div>
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};
