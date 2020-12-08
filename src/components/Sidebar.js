import React, {Component} from 'react';
import "./Sidebar.css";

class Sidebar extends Component  {
    render() {
        return (
            <sidebar className="sidebar">
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
            </sidebar>

        );
    }
}

export default Sidebar;