import React, { FC, memo } from "react";
import { useData } from "./data";
import { PostsView as MainComponent } from "./posts";

export const PostsView: FC = memo(
  () => {
    const props = useData();
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MainComponent {...props} />;
  },
  () => true,
);
