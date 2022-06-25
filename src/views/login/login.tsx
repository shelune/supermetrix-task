import classNames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { FC, useCallback, useState } from "react";
import type { ApiErrorResponse, ApiRegisterResponse } from "../../shared/api";
import { setCookie } from "../../shared/utils/cookie";

import css from "./login.module.scss";

type Props = {
  setToken: (token: string | null) => void;
};

export const LoginView: FC<Props> = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async () => {
    setSubmitting(true);
    try {
      const response = await axios.post<ApiRegisterResponse>(
        "https://api.supermetrics.com/assignment/register",
        {
          client_id: "ju16a6m81mhid5ue1z3v2g0uh",
          email,
          name: username,
        },
      );
      if (response.data.data.sl_token) {
        setCookie("sl_token", response.data.data.sl_token, 60);
        setToken(response.data.data.sl_token);
        navigate("/posts");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const errorResponse = err.response.data as ApiErrorResponse;
        setError(errorResponse.error.message);
      } else {
        // eslint-disable-next-line no-console
        console.log("unknown error when registering", err);
        setError("unknown error when registering");
      }
    }

    setSubmitting(false);
  }, [email, navigate, setToken, username]);

  return (
    <div className={css.loginPage}>
      <div className={css.container}>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault();
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            login();
          }}
        >
          <div className={css.formControl}>
            <label
              htmlFor="username"
              className={classNames(css.label, {
                [css.isEditing]: !!username,
              })}
            >
              Name
            </label>
            <input
              className={css.textInput}
              type="text"
              value={username}
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className={css.formControl}>
            <label
              htmlFor="email"
              className={classNames(css.label, {
                [css.isEditing]: !!email,
              })}
            >
              Email
            </label>
            <input
              className={css.textInput}
              type="email"
              value={email}
              id="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          {error && (
            <div data-testid="login-error" className={css.formError}>
              {error}
            </div>
          )}
          <div className={css.formFunctions}>
            <button
              type="submit"
              className={css.submitButton}
              data-testid="login-submit"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
