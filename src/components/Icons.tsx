import { HTMLAttributes } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { PiBooksFill } from "react-icons/pi";
import { BiSolidCalendarAlt, BiSolidCalendarCheck } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

export const Icons = {
  GROUP: (props: HTMLAttributes<SVGElement>) => <FaUserGroup {...props} />,
  BOOKS: (props: HTMLAttributes<SVGElement>) => <PiBooksFill {...props} />,
  CALENDAR: (props: HTMLAttributes<SVGElement>) => (
    <BiSolidCalendarAlt {...props} />
  ),
  CALENDAR_CHECKED: (props: HTMLAttributes<SVGElement>) => (
    <BiSolidCalendarCheck {...props} />
  ),
  ADD: (props: HTMLAttributes<SVGElement>) => <IoMdAddCircle {...props} />,
  EDIT: (props: HTMLAttributes<SVGElement>) => (
    <MdOutlineModeEditOutline {...props} />
  ),
};
