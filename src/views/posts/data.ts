import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ApiErrorResponse, ApiPostResponse, Post } from "../../shared/api";
import type { PostsView, UserData } from "./posts";

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

  useEffect(() => {
    async function getData() {
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
        setPosts(mapped);
        setLoading(false);
        setError("");
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data) {
          const errorResponse = err.response.data as ApiErrorResponse;
          setError(errorResponse.error.message);
        } else {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (params.userId) {
      setActiveUser(params.userId);
    } else {
      setActiveUser("");
    }
  }, [params.userId]);

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

  const filteredPosts = useMemo(
    () =>
      posts
        .filter((post) => (activeUser ? post.authorId === activeUser : true))
        .filter((post) =>
          params.userId ? post.authorId === params.userId : true,
        ),
    [activeUser, params.userId, posts],
  );

  const loadMore = useCallback(() => {
    if (page + 1 > MAX_PAGE) {
      return;
    }
    setPage(page + 1);
  }, [page]);

  return {
    posts: filteredPosts,
    users,
    currentPage: page,
    activeUser,
    error,
    loadMore,
    setActiveUser,
  };
};
