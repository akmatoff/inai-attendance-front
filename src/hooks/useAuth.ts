import { StorageKeys } from "@/constants/storageKeys";

export default function useAuth() {
  const isAuthenticated = !!localStorage.getItem(StorageKeys.TOKEN);

  return {
    isAuthenticated,
  };
}
