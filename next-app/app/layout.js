'use client'

import './globals.css'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [body,setBody]=useState("light");
  const [sidebar,setSidebar]=useState("sidebar");
  const [toggleSw,setToggleSw]=useState("switch");
  const [toggleIcon,setToggleIcon]=useState("bx bx-moon");
  const [toggleText,setToggleText]=useState("Dark Mode");

  function toggle(){
    if(body==="light"){
      setToggleSw("switch active");
      setBody("dark");
      setToggleIcon("bx bx-sun");
      setToggleText("Light Mode");
    } else if(body==="dark"){
      setToggleSw("switch");
      setBody("light");
      setToggleIcon("bx bx-moon");
      setToggleText("Dark Mode");
    }
  }
  function closeBar(){
    if(sidebar==="sidebar"){
      setSidebar("sidebar close");
    } else if(sidebar=="sidebar close"){
      setSidebar("sidebar");
    }
  }

  return (
    <html lang="en">
      <body className={`${inter.className} ${body}`}>
        <div className={`${sidebar}`}>
          <header className='sidebar-header'>
            <i class='bx bxl-c-plus-plus logo'></i>
            <div className='header-name'>
              <span className='text title'>Coding Log</span>
              <span className='text detail'>Web Developer</span>
            </div>
            <i class='bx bx-chevron-left btn-close' onClick={closeBar}></i>
          </header>
          <ul className='sidebar-menu'>
            <li className='menu-search'>
              <i class='bx bx-search' ></i>
              <input type="text" placeholder='Search...'/>
            </li>
            <li className='menu-home'>
              <Link href="/">
                <i class='bx bx-home' ></i>
                <span className='text'>Home</span>
              </Link>
            </li>
            <li className='menu-chat'>
              <Link href="/aiChat">
                <i class='bx bx-conversation' ></i>
                <span className='text'>AI chat</span>
              </Link>
            </li>
          </ul>
          <footer className='sidebar-footer'>
            <div className='toggle'>
              <i class={`${toggleIcon}`} ></i>
              <span className='text'>{toggleText}</span>
              <div className='toggle-switch'>
                <div className={`${toggleSw}`} onClick={toggle}></div>
              </div>
            </div>
          </footer>
        </div>
        <div className='content'>
          {children}
        </div>
      </body>
    </html>
  );
}
