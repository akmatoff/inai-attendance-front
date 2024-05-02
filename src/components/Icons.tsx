import { HTMLAttributes } from "react";
import { FaUserGroup, FaUserPlus } from "react-icons/fa6";
import { PiBooksFill, PiUserListFill } from "react-icons/pi";
import { BiSolidCalendarAlt, BiSolidCalendarCheck } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { RiUser5Fill } from "react-icons/ri";

export const Icons = {
  GROUP: (props: HTMLAttributes<SVGElement>) => <FaUserGroup {...props} />,
  BOOKS: (props: HTMLAttributes<SVGElement>) => <PiBooksFill {...props} />,
  CALENDAR: (props: HTMLAttributes<SVGElement>) => (
    <BiSolidCalendarAlt {...props} />
  ),
  CALENDAR_CHECKED: (props: HTMLAttributes<SVGElement>) => (
    <BiSolidCalendarCheck {...props} />
  ),
  ADD: (props: HTMLAttributes<SVGElement>) => <IoMdAdd {...props} />,
  ADD_USER: (props: HTMLAttributes<SVGElement>) => <FaUserPlus {...props} />,
  EDIT: (props: HTMLAttributes<SVGElement>) => (
    <MdOutlineModeEditOutline {...props} />
  ),
  USER_LIST: (props: HTMLAttributes<SVGElement>) => (
    <PiUserListFill {...props} />
  ),
  USER: (props: HTMLAttributes<SVGElement>) => <RiUser5Fill {...props} />,
};
