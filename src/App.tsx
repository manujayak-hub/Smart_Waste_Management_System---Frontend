import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleForm from "./Pages/Waste_Schedule/ScheduleForm";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ViewSchedule from "./Pages/Waste_Schedule/ViewSchedule";
import UpdateForm from "./Pages/Waste_Schedule/UpdateForm";
import UserHome from "./Pages/UserHome";
import AddNewType from "./Pages/Type_Admin/AddNewType";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/schedule" element={<ScheduleForm />} />
          <Route path="/schedule/view" element={<ViewSchedule />} />
          <Route path="/schedule/update/:id" element={<UpdateForm />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/type" element={<AddNewType />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
