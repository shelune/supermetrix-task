import React, { FC, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./views/layout/layout";
import { LoginView } from "./views/login/login";
import { PostsView } from "./views/posts";
import { getCookie } from "./shared/utils/cookie";

const ProtectedRoute = ({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: JSX.Element;
}) => {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const RoutesProvider: FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tokenCookie = getCookie("sl_token");
    if (tokenCookie) {
      setToken(tokenCookie);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <div>Loading application...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/login"
            element={
              <>
                {token ? (
                  <Navigate to="/posts" replace />
                ) : (
                  <LoginView setToken={setToken} />
                )}
              </>
            }
          />
          <Route
            path="/posts/:userId"
            element={
              <ProtectedRoute authenticated={token !== null}>
                <PostsView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute authenticated={token !== null}>
                <PostsView />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
