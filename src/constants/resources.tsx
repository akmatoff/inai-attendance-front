import { Icons } from "@/components/Icons";
import { IResource } from "@/interfaces";
import { ROUTES } from "./routes";

export const resourcesListSection: IResource[] = [
  // {
  //   key: "users",
  //   label: "",
  //   description: "",
  //   href: ROUTES,
  // },
  {
    key: "groups",
    label: "Группы",
    description: "Список групп",
    href: ROUTES.GROUP,
    icon: <Icons.GROUP />,
  },
  // {
  //   key: "students",
  //   label: "Студенты",
  //   href: "/students",
  // },
  {
    key: "subjects",
    label: "Предметы",
    href: ROUTES.SUBJECT,
    description: "Список предметов",

    icon: <Icons.BOOKS />,
  },
  {
    key: "classes",
    label: "Пары",
    href: ROUTES.SCHEDULE,
    description: "Список пар",

    icon: <Icons.CALENDAR />,
  },
];

export const resourcesActionSection: IResource[] = [
  {
    key: "attendance",
    label: "Посещаемость",
    description: "Учет посещаемости",

    href: "/attendance",
    icon: <Icons.CALENDAR_CHECKED />,
  },
];
