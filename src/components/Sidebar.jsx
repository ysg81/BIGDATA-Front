import React from 'react';
import "./Sidebar.css";

const Sidebar = props => {

  return (
    <div className="sidebar">
      <span className="sidebar_title">Movie Raing</span>
      <div className="sidebar-i">
      <a className="sidebar-s" href="#intro">
        메뉴1
      </a>
      <a className="sidebar-s" href="#cc">
        메뉴2
      </a>
      <a className="sidebar-s" href="#wagle">
        메뉴3
      </a>
      </div>
    </div>
  )
}

export default Sidebar;