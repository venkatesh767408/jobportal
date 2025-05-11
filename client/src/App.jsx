import React, { useContext } from 'react'
import Home from './Pages/Home'
import Applyjob from './Pages/Applyjob'
import Applicationpage from './Pages/Applicationpage'
import {Routes,Route} from 'react-router-dom'
import Recruiterlogin from './Components/Recruiterlogin'
import { Appcontext } from './contexts/Appcontext'
import Dashboard from './Pages/Dashboard'
import Addjob from './Pages/Addjob'
import Viewjobs from './Pages/Viewjobs'
import Managejobs from './Pages/Managejobs'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const {showrecruiterlogin,companyToken}=useContext(Appcontext);
  return (
    <div>
      {showrecruiterlogin && <Recruiterlogin />}
      <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/applicationpage' element={<Applicationpage />} />
      <Route path='/apply-job/:id' element={<Applyjob />} />
      <Route path='/Dashboard'  element={<Dashboard ></Dashboard>} >
      {companyToken ?
      <>
      <Route path='add-job' element={<Addjob></Addjob>}></Route>
        <Route path='view-job' element={<Viewjobs></Viewjobs>}>
        </Route>
        <Route path='manage-jobs' element={<Managejobs></Managejobs>}></Route>
      </>: null}
        
      </Route>
    </Routes>
    </div>
  )
}

export default App