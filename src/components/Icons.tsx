import { HTMLAttributes } from "react";
import { FaUserGroup, FaUserPlus } from "react-icons/fa6";
import { PiBooksFill, PiUserListFill } from "react-icons/pi";
import { BiSolidCalendarAlt, BiSolidCalendarCheck } from "react-icons/bi";
import { MdOutlineModeEditOutline, MdGroupAdd } from "react-icons/md";
import {
  IoMdAdd,
  IoIosArrowBack,
  IoMdRemoveCircle,
  IoIosCheckmarkCircle,
} from "react-icons/io";
import { RiUser5Fill, RiLockPasswordLine } from "react-icons/ri";
import { GrFormTrash } from "react-icons/gr";
import { IoQrCode } from "react-icons/io5";

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
  ARROW_LEFT: (props: HTMLAttributes<SVGElement>) => (
    <IoIosArrowBack {...props} />
  ),
  DELETE: (props: HTMLAttributes<SVGElement>) => <GrFormTrash {...props} />,
  PASSWORD: (props: HTMLAttributes<SVGElement>) => (
    <RiLockPasswordLine {...props} />
  ),
  GROUP_ADD: (props: HTMLAttributes<SVGElement>) => <MdGroupAdd {...props} />,
  REMOVE_CIRCLE: (props: HTMLAttributes<SVGElement>) => (
    <IoMdRemoveCircle {...props} />
  ),
  CHECKMARK_CIRCLE: (props: HTMLAttributes<SVGElement>) => (
    <IoIosCheckmarkCircle {...props} />
  ),
  QR_CODE: (props: HTMLAttributes<SVGElement>) => <IoQrCode {...props} />,
};
