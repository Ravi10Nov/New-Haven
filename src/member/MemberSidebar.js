import React from 'react';
import logo from './../assets/Medicine-Wheel---12-x-12.jpg';
import useContexts from './../hooks/useContexts';
import './member.css';
import SidebarMenu from './MemberSidebarMenu';

const MemberSidebar = ({ url }) => {
  const { isSideBarOpen } = useContexts();
  return (
    <div
      className={`${
        isSideBarOpen
          ? 'Sidebar sidebar_dashboard mobileSideBarActive'
          : 'Sidebar sidebar_dashboard !sticky !top-0 !h-[100vh]'
      }`
      }>
      <div className='row mx-auto logo_img' style={{ padding: 0 }}>
        <img src={logo} alt='' />
      </div>
      <div className='sidebarMenu'>
        <SidebarMenu url={url}></SidebarMenu>
      </div>
    </div>
  );
};

export default MemberSidebar;
