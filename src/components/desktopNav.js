import React from "react";
import logo from "../assets/thumb.svg";
import name from "../assets/name.svg";
import { navLinks } from "../hooks/nav";
import "./componentStyles.css";
import arrow from "../assets/arrow-right.svg";
import { NavLink } from "react-router-dom";

const DesktopNav = () => {
  return (
    <nav className="w-full">
      <div className="flex items-center justify-between w-[320px] xs:w-[500px] ssm:w-[750px] sm:w-[800px] md:w-[1200px] left-1/2 -translate-x-1/2 fixed top-5 border border-primary-450 rounded-[12px] sm:rounded-[24px] py-[12px] px-[16px] bg-nav-bg z-[1000]">
        <a href="/" className="flex items-center gap-2 outline-none">
          <img src={logo} className="w-[40px] h-[36px]" />
          <img src={name} className="w-[43px] h-[22px] gap-8" />
        </a>
        <div className="items-center gap-[16px] font-jeju text-[18px] font-normal hidden ssm:flex">
          {navLinks.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.href}
              className={
                link.name === "Events" ? "text-[#FFFFFF]" : "text-[#B3B3B3]"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
        <button className="flex items-center gap-8 rounded-[12px] ssm:px-5 ssm:py-4 px-3 py-4 border border-border font-jeju ssm:text-[16px] text-sm font-normal leading-tight bg-[#ffffff]">
          MY TICKETS
          <span>
            <img src={arrow} alt="arrow-right" className="w-[18px] h-[8px]" />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default DesktopNav;
