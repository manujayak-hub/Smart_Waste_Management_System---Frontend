import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleForm from "./Pages/Waste_Schedule/ScheduleForm";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ViewSchedule from "./Pages/Waste_Schedule/ViewSchedule";
import UpdateForm from "./Pages/Waste_Schedule/UpdateForm";
import Waste_Collect_User from "./Pages/Waste_Schedule/Waste_Collect_User";
import Schedule_Satus_Admin from "./Pages/Waste_Schedule/Schedule_Satus_Admin"

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
//import UserHome from "./Pages/UserHome";

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
          <Route path="/wcuser" element={<Waste_Collect_User />} />
          <Route path="/schedule/status/admin" element={<Schedule_Satus_Admin/>}/>


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
         
         

          <Route path="/type" element={<AddNewType />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
