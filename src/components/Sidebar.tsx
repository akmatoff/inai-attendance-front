import { resources } from "@/constants/resources";
import { ROUTES } from "@/constants/routes";
import { StorageKeys } from "@/constants/storageKeys";
import {
  Button,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@nextui-org/react";
import { useNavigate } from "react-router";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    navigate(ROUTES.LOGIN);
    localStorage.removeItem(StorageKeys.TOKEN);
  };

  return (
    <div className="flex flex-col justify-between flex-[1_1_0%] h-screen border-r-2 border-slate-100">
      <div>
        <div className="p-4 mb-4">
          <h1 className="text-2xl cursor-pointer">
            <span className="text-primary font-bold">INAI</span> Attendance
          </h1>
        </div>

        <Listbox aria-label="Ресурсы">
          <ListboxSection title="Редактирование" showDivider>
            {resources.map((resource) => (
              <ListboxItem
                key={resource.key}
                className="px-6 py-3 mb-2"
                classNames={{ title: "font-semibold" }}
                // description="Создание и редактирование"
              >
                {resource.label}
              </ListboxItem>
            ))}
          </ListboxSection>
        </Listbox>
      </div>

      <div className="p-4">
        <Button
          color="primary"
          className="w-full"
          variant="flat"
          onClick={logout}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
