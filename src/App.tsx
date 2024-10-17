import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleForm from "./Pages/Waste_Schedule/ScheduleForm";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ViewSchedule from "./Pages/Waste_Schedule/ViewSchedule";
import UpdateForm from "./Pages/Waste_Schedule/UpdateForm";
import PaymentManagement from "./Pages/Payment/PaymentManagement";
import Wallet from "./Pages/Payment/Wallet";
import Success from "./Pages/Payment/Success";
import Cancel from "./Pages/Payment/Cancel";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/schedule" element={<ScheduleForm />} />
          <Route path="/schedule/view" element={<ViewSchedule />} />
          <Route path="/schedule/update/:id" element={<UpdateForm />} />
          <Route path="/payment" element={<PaymentManagement/>}/>
          <Route path="/wallet" element= {<Wallet/>} />
          <Route path="/success" element= {<Success/>} />
          <Route path="/cancel" element= {<Cancel/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
