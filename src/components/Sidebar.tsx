import {
  resourcesListSection,
  resourcesActionSection,
} from "@/constants/resources";
import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const location = useLocation();

  const logout = () => {
    navigate(ROUTES.LOGIN);
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.ROLE);
    localStorage.removeItem(StorageKeys.USERNAME);
  };

  console.log(location.pathname);

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex flex-col justify-between h-screen border-r-2 border-slate-100 fixed">
      <div>
        <div className="p-4 border-b-1">
          <Link to={ROUTES.DASHBOARD}>
            <Logo />
          </Link>
        </div>

        {localStorage.getItem(StorageKeys.ROLE) === "ADMIN" ? (
          <Listbox aria-label="Ресурсы">
            <ListboxSection title="Администрация" showDivider>
              {resourcesListSection.map((resource) => (
                <ListboxItem
                  key={resource.key}
                  className={`px-6 py-3 mb-2 ${
                    isActive(resource.href) ? "bg-primary text-white" : ""
                  }`}
                  classNames={{ title: "font-semibold" }}
                  startContent={resource.icon}
                  description={resource.description}
                  onPress={() => navigate(resource.href)}
                >
                  {resource.label}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        ) : null}

        <Listbox aria-label="Преподаватель">
          <ListboxSection title="Преподаватель">
            {resourcesActionSection.map((resource) => (
              <ListboxItem
                key={resource.key}
                className={`px-6 py-3 mb-2 ${
                  isActive(resource.href) ? "bg-primary text-white" : ""
                }`}
                classNames={{ title: "font-semibold" }}
                startContent={resource.icon}
                description={resource.description}
                onPress={() => navigate(resource.href)}
              >
                {resource.label}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </div>

      <div className="px-10 py-4">
        <Button
          color="default"
          className="w-full"
          variant="bordered"
          onPress={logout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
