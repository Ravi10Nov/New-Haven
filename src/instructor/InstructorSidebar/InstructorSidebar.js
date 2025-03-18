import React from 'react';
import './InstructorSidebar.css';
import SidebarMenu from './../InstructorSidebarMenu/InstructorSidebarMenu';
import logo from './../../assets/Medicine-Wheel---12-x-12.jpg';
import useContexts from '../../hooks/useContexts';

const InstructorSidebar = ({ url }) => {
    const { isSideBarOpen } = useContexts();
    return (
        <div className={
            isSideBarOpen
                ? 'Sidebar sidebar_dashboard mobileSideBarActive'
                : 'Sidebar sidebar_dashboard'
        }>
            <div className='row mx-auto logo_img' style={{ padding: 0 }}>
                <img src={logo} alt="" />
            </div>
            <div className='sidebarMenu'>
                <SidebarMenu url={url}></SidebarMenu>
            </div>
        </div>
    );
};

export default InstructorSidebar;