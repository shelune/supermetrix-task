import React, { FC } from "react";
import { Outlet } from "react-router-dom";

import css from "./layout.module.scss";

export const Layout: FC = () => (
  <div className={css.appWrapper}>
    <Outlet />
  </div>
);
