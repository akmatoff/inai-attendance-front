import { Outlet, useNavigate } from "react-router";
// import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import { useEffect, useMemo } from "react";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";
import { StorageKeys } from "@/constants/storageKeys";
// import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const isAuthenticated = useMemo(
    () => !!localStorage.getItem(StorageKeys.TOKEN),
    []
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      toast.error("Пожалуйста авторизуйтесь");
    }
  }, [navigate, isAuthenticated]);

  return (
    <section className="flex flex-col w-screen min-h-screen">
      <div className="flex w-full min-h-full">
        <Sidebar />

        <div className="flex-[5_1_25%] overflow-y-scroll">
          {/* <Navbar
            position="static"
            className="px-1 justify-between"
            maxWidth="full"
          >
            <NavbarContent justify="end">
              <NavbarItem></NavbarItem>
            </NavbarContent>
          </Navbar> */}

          <div className="flex flex-col justify-center items-center w-full min-h-full p-20">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
