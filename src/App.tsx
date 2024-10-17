import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleForm from "./Pages/Waste_Schedule/ScheduleForm";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ViewSchedule from "./Pages/Waste_Schedule/ViewSchedule";
import UpdateForm from "./Pages/Waste_Schedule/UpdateForm";

import RecordCollection from "./Pages/Waste_Collection_Admin/RecordCollection";
import AllWasteCollections from "./Pages/Waste_Collection_Admin/AllWasteCollections";
import UpdateWasteCollection from "./Pages/Waste_Collection_Admin/UpdateWasteCollection";



import FeedbackForm from "./Pages/Feedback/FeedbackForm";
import MyFeedback from "./Pages/Feedback/MyFeedback";
import EditFeedback from "./Pages/Feedback/EditFeedBack";
import AdminView from "./Pages/Feedback/AdminView";
import AllFeedback from "./Pages/Feedback/AllFeedback";

import ReportNavigation from "./Pages/ReportNavigation";
import PaymentReport from "./Pages/PaymentReport";
import ScheduleReport from "./Pages/ScheduleReport";
import WasteCollectedReport from "./Pages/WasteCollectedReport";

import UserDashboard from "./Pages/UserDashBoard";

import AdminHome from "./Pages/AdminSide/AdminHome";
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


          <Route path="/WasteCollection" element={<RecordCollection/>} />
          <Route path="/WasteCollection/all" element={<AllWasteCollections/>} />
          <Route path="/update-waste-collection/:id" element={<UpdateWasteCollection/>} />



          <Route path="/feedbackForm" element={<FeedbackForm/>} />
          <Route path="/myFeedback" element={<MyFeedback/>} />
          <Route path="/editFeedback/update/:id" element={<EditFeedback/>} />
          <Route path="/adminView" element={<AdminView/>} />
          <Route path="/allFeedback" element={<AllFeedback/>} />

          <Route path="/reportNavigation" element={<ReportNavigation/>} />
          <Route path="/paymentReport" element={<PaymentReport/>} />
          <Route path="/reports/schedules" element={<ScheduleReport/>} />
          <Route path="/wasteCollectedReport" element={<WasteCollectedReport/>} />

          <Route path="/user" element={<UserDashboard/>} />


          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/userhome" element={<UserHome />} />
          <Route path="/type" element={<AddNewType />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
