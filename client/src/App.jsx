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

const App = () => {
  const {showrecruiterlogin}=useContext(Appcontext);
  return (
    <div>
      {showrecruiterlogin && <Recruiterlogin />}
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/applicationpage' element={<Applicationpage />} />
      <Route path='/apply-job/:id' element={<Applyjob />} />
      <Route path='/Dashboard'  element={<Dashboard ></Dashboard>} >
        <Route path='add-job' element={<Addjob></Addjob>}></Route>
        <Route path='view-job' element={<Viewjobs></Viewjobs>}>
        </Route>
        <Route path='manage-jobs' element={<Managejobs></Managejobs>}></Route>
      </Route>
    </Routes>
    </div>
  )
}

export default App