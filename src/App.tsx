
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ScheduleForm from './Pages/ScheduleForm';
import SignupPage from './Pages/SignupPage';
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/schedule" element={<ScheduleForm />} />
    <Route path="/signup" element={<SignupPage />} />
    </Routes>
    
    </BrowserRouter>
      
    </>
  );
}

export default App;
