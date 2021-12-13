import React from "react";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import './ComponentLayout.css'

const ComponentLayout = (props) => {
  return (
    <div>
      <NavBar />
      <main className='main-content'>
          <section className='section'>
              {props.children}
          </section>
          <SideBar {...props.sideBarProps}/>
      </main>
    </div>
  );
};

export default ComponentLayout;
