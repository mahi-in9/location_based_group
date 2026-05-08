import { Routes, Route } from "react-router-dom";
import GroupsPage from "../pages/groups/GroupsPage";
11;
import GroupDetailsPage from "../pages/groups/GroupDetailsPage";
import CreateGroupPage from "../pages/groups/CreateGroupPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/groups" element={<GroupsPage />} />
      <Route path="/groups/:id" element={<GroupDetailsPage />} />
      <Route path="/groups/create" element={<CreateGroupPage />} />
    </Routes>
  );
};
export default AppRoutes;
