import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./views/layout/layout";
import { LoginView } from "./views/login/login";
import { PostsView } from "./views/posts/posts";

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginView setToken={setToken} />} />
          <Route
            path="/posts/"
            element={
              <ProtectedRoute authenticated={token !== null}>
                <PostsView />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
