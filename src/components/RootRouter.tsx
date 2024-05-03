import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Login from "@/pages/Login";
import DashboardLayout from "./DashboardLayout";
import GroupPage from "@/pages/group/GroupPage";
import GroupStudents from "@/pages/group/GroupStudents";
import SubjectsPage from "@/pages/subject/SubjectsPage";
import SchedulePage from "@/pages/schedule/SchedulePage";
import UsersPage from "@/pages/user/UsersPage";
import TeacherSchedulePage from "@/pages/teacherSchedule/TeacherSchedulePage";
import DashboardIndex from "@/pages/DashboardIndex";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardIndex />} />
            <Route path="group" element={<GroupPage />} />
            <Route path="group/:id/students" element={<GroupStudents />} />
            <Route path="subject" element={<SubjectsPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="user" element={<UsersPage />} />
            <Route path="teacher-schedule" element={<TeacherSchedulePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
