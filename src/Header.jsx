import React from 'react'
import {BsBellFill, BsFillEnvelopeFill, BsPersonCircle,
    BsSearch, BsJustify
} from 'react-icons/bs'
import './App.css'
function Header({toggleSidebar}) {
  return (
   <header className="header">
    <div className="menu-icon">
        <BsJustify className='icon' onClick={toggleSidebar} />
    </div>
    <div className="header-left">
        <BsSearch className='icon' />
    </div>
    <div className="header-right">
        <BsBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
    </div>
    </header>
  )
}

export default Header
