// Restore the session when the browser refreshes
"use client";

import { useEffect, useRef } from "react";

import { useAppDispatch } from "../hooks/redux";
import { setUnauthorizedHandler } from "../lib/axios";
// import { fetchMe } from "@/store/features/auth/authSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const started = useRef(false);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      // dispatch(sessionExpired());
    });

    if (started.current) return;
    started.current = true;

    // dispatch(fetchMe());
  }, [dispatch]);

  return null;
}
