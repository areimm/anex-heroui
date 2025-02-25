"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading };
};
