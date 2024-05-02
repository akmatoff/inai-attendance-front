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
import { useNavigate } from "react-router";
import Logo from "./Logo";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate(ROUTES.LOGIN);
    localStorage.removeItem(StorageKeys.TOKEN);
    localStorage.removeItem(StorageKeys.ROLE);
    localStorage.removeItem(StorageKeys.USERNAME);
  };

  return (
    <div className="flex flex-col justify-between flex-[1_1_0%] h-screen border-r-2 border-slate-100">
      <div>
        <div className="p-4 border-b-1">
          <Logo />
        </div>

        <Listbox aria-label="Ресурсы">
          <ListboxSection title="Cписки" showDivider>
            {resourcesListSection.map((resource) => (
              <ListboxItem
                key={resource.key}
                className="px-6 py-3 mb-2"
                classNames={{ title: "font-semibold" }}
                startContent={resource.icon}
                description={resource.description}
                onPress={() => navigate(resource.href)}
              >
                {resource.label}
              </ListboxItem>
            ))}
          </ListboxSection>
          <ListboxSection title="Учет">
            {resourcesActionSection.map((resource) => (
              <ListboxItem
                key={resource.key}
                className="px-6 py-3 mb-2"
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
