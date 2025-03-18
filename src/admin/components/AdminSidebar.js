import React from 'react';
import logo from '../../assets/Medicine-Wheel---12-x-12.jpg';
import AdminSidebarMenu from './AdminSidebarMenu';
import './css/sidebar.css';
import useContexts from '../../hooks/useContexts';

const AdminSidebar = ({ url }) => {
    const { isSideBarOpen } = useContexts();
    return (
        <div className={
            isSideBarOpen
                ? 'Sidebar sidebar_dashboard mobileSideBarActive'
                : 'Sidebar sidebar_dashboard'
        }>
            <div className='row logo_img' style={{ padding: 0, margin:'auto' }}>
                <img src={logo} alt="" />
            </div>
            <div className='sidebarMenu'>
                <AdminSidebarMenu url={url}></AdminSidebarMenu>
            </div>
        </div>
    );
};

export default AdminSidebar;