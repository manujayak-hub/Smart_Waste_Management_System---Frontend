
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ScheduleForm from './Pages/ScheduleForm';
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/schedule" element={<ScheduleForm />} />
    </Routes>
    
    </BrowserRouter>
      
    </>
  );
}

export default App;
