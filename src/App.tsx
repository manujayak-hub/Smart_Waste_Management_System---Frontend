
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ScheduleForm from './Pages/ScheduleForm';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/schedule" element={<ScheduleForm />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    </Routes>
    
    </BrowserRouter>
      
    </>
  );
}

export default App;
