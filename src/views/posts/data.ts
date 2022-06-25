import { useParams } from "react-router-dom";
import axios from "axios";
import { ComponentProps, useCallback, useEffect, useState } from "react";
import type { ApiErrorResponse, ApiPostResponse, Post } from "../../shared/api";
import type { PostsView } from "./posts";

import { postMapper } from "../../shared/utils/mapper";
import { getCookie } from "../../shared/utils/cookie";

export const MAX_PAGE = 10;

export const useData = (): ComponentProps<typeof PostsView> => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [activeUser, setActiveUser] = useState("");
  const params = useParams();

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiPostResponse>(
        "https://api.supermetrics.com/assignment/posts",
        {
          params: {
            sl_token: getCookie("sl_token"),
            page,
          },
        },
      );
      const mapped = response.data.data.posts.map(postMapper);
      setPosts(posts.concat(mapped));
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorResponse = err.response.data as ApiErrorResponse;
        setError(errorResponse.error.message);
      } else {
        // eslint-disable-next-line no-console
        console.log("unknown error when getting posts", err);
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  }, [getData, page]);

  useEffect(() => {
    if (params.userId) {
      setActiveUser(params.userId);
    } else {
      setActiveUser("");
    }
  }, [params.userId]);

  const loadMore = useCallback(() => {
    if (page + 1 > MAX_PAGE) {
      return;
    }
    setPage(page + 1);
  }, [page]);

  return {
    posts,
    currentPage: page,
    activeUser,
    error,
    loading,
    loadMore,
  };
};
