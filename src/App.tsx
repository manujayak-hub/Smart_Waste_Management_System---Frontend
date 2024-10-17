import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleForm from "./Pages/Waste_Schedule/ScheduleForm";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ViewSchedule from "./Pages/Waste_Schedule/ViewSchedule";
import UpdateForm from "./Pages/Waste_Schedule/UpdateForm";
import RecordCollection from "./Pages/Waste_Collection_Admin/RecordCollection";
import AllWasteCollections from "./Pages/Waste_Collection_Admin/AllWasteCollections";
import UpdateWasteCollection from "./Pages/Waste_Collection_Admin/UpdateWasteCollection";
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

          <Route path="/WasteCollection" element={<RecordCollection/>} />
          <Route path="/WasteCollection/all" element={<AllWasteCollections/>} />
          <Route path="/update-waste-collection/:id" element={<UpdateWasteCollection/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
