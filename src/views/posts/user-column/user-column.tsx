import classNames from "classnames";
import React, { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { UserData } from "../posts";

import css from "./user-column.module.scss";

type Props = {
  users: UserData[];
  activeUser: string;
  setActiveUser: (userId: string) => void;
};

export const UserColumn: FC<Props> = ({ users, activeUser, setActiveUser }) => {
  const [search, setSearch] = useState("");
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
            data-testid="game-search-text"
            type="text"
            className={css.textInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <div className={css.columnBody}>
        <div className={css.userList}>
          {filteredUsers.map((user) =>
            activeUser === user.userId ? (
              <Link
                to="/posts"
                key={user.userId}
                className={classNames(css.userItem, css.isActive)}
              >
                <div className={css.name}>{user.name}</div>
                <div className={css.postCount}>{user.postCount}</div>
              </Link>
            ) : (
              <Link
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
      </div>
    </div>
  );
};
