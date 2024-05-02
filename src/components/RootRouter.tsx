import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./RootLayout";
import Login from "@/pages/Login";
import DashboardLayout from "./DashboardLayout";
import GroupPage from "@/pages/group/GroupPage";
import GroupStudents from "@/pages/group/GroupStudents";

export default function RootRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="group" element={<GroupPage />} />
            <Route path="group/:id/students" element={<GroupStudents />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
