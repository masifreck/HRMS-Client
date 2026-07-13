import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
const  [sidebarOpen, setSidebarOpen] = useState(true);
 const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
  <div className="grid-container">
    <Header toggleSidebar={toggleSidebar} />
    <Sidebar sidebarOpen={sidebarOpen}
    toggleSidebar={toggleSidebar}/>
    <Home />

    </div>
  )
}

export default App
