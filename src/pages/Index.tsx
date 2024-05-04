import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Index() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem(StorageKeys.TOKEN);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.DASHBOARD, { replace: true });
      return;
    }

    navigate(ROUTES.LOGIN);
  }, [navigate, isLoggedIn]);

  return null;
}
