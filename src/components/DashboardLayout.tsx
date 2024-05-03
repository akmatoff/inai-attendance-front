import { Outlet, useNavigate } from "react-router";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import Sidebar from "./Sidebar";
import { useEffect, useMemo } from "react";
import { ROUTES } from "@/constants/routes";
import toast from "react-hot-toast";
import { StorageKeys } from "@/constants/storageKeys";
import { Icons } from "./Icons";

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
    <section className="flex flex-col min-h-screen w-screen">
      <div className="flex min-h-full w-full">
        <Sidebar />

        <div className="flex-[5_1_25%] ml-56">
          <Navbar
            position="sticky"
            className="px-1 justify-between"
            maxWidth="full"
          >
            <NavbarContent>
              <NavbarItem>
                <h1 className="font-light text-xl">Панель управления</h1>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <div className="flex items-center">
                  <Icons.USER className="text-3xl mr-2" />

                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-primary">
                      {localStorage.getItem(StorageKeys.USERNAME)}
                    </h1>
                    <p className="text-sm font-light -mt-2">
                      {localStorage.getItem(StorageKeys.ROLE)}
                    </p>
                  </div>
                </div>
              </NavbarItem>
            </NavbarContent>
          </Navbar>

          <div className="flex flex-col px-4 py-6 md:px-10 lg:px-20 overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
