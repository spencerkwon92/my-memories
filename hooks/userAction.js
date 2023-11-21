import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";

import { userState } from "../recoil";
import { loadMyInfoAPI } from "../apis/user";

export function useLoadMyInfo() {
  const [user, setUser] = useRecoilState(userState);
  const {
    data,
    error,
    isLoading: loadMyInfoLoading,
  } = useQuery("user", loadMyInfoAPI);

  useEffect(() => {
    if (data) {
      setUser((prev) => ({
        ...prev,
        me: data,
      }));
    }
  }, [data]);

  return [user, loadMyInfoLoading, error];
}
