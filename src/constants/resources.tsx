import { Icons } from "@/components/Icons";
import { IResource } from "@/interfaces";
import { ROUTES } from "./routes";

export const resourcesAdminSection: IResource[] = [
  {
    key: "users",
    label: "Пользователи",
    description: "Список пользователей",
    href: ROUTES.USERS,
    icon: <Icons.USER_LIST className="text-xl" />,
  },
  {
    key: "groups",
    label: "Группы",
    description: "Список групп",
    href: ROUTES.GROUP,
    icon: <Icons.GROUP />,
  },
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

export const resourcesTeacherSection: IResource[] = [
  {
    key: "schedule-today",
    label: "Сегодня",
    description: "Список пар на сегодня",

    href: ROUTES.TEACHER_SCHEDULE,
    icon: <Icons.TODAY className="text-xl" />,
  },
  {
    key: "schedule-for-week",
    label: "Неделя",
    description: "Список пар на неделю",

    href: ROUTES.TEACHER_SCHEDULE_FOR_WEEK,
    icon: <Icons.CALENDAR />,
  },
  {
    key: "groups",
    label: "Группы",
    description: "Список групп",
    href: ROUTES.GROUP,
    icon: <Icons.GROUP />,
  },
];
