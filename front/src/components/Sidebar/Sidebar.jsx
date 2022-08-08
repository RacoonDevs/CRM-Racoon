import React, { useState } from "react";
import profile from "../../assets/img/profile.jpg";
import { FaChevronCircleRight, FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "home-smile", url: "/dashboard" },
    { title: "Proyectos", src: "book-bookmark", url: "/proyectos" },
    { title: "Tareas", src: "task-list", url: "/tareas" },
    { title: "Usuarios", src: "users", url: "/usuarios" },
  ];
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-24"
        } duration-500 h-screen p-5 pt-8 bg-dark-purple relative drop-shadow-2xl`}
      >
        <FaChevronCircleRight
          className={`absolute cursor-pointer rounded-full
          -right-3 top-9 w-8 ${!open && "rotate-180"}`}
          color="37CAE6"
          size={44}
          onClick={() => setOpen(!open)}
        />
        <div
          className={`flex gap-x-4 items-center h-20 hover:bg-light-white p-2 rounded-md`}
        >
          <img
            src={profile}
            alt="loco"
            className={` cursor-pointer duration-500 rounded-full`}
            width={40}
            height={40}
          />
          <span
            className={` cursor-pointer ${!open && "scale-0"} ${
              open && " transition delay-200 duration-200"
            }  `}
          >
            <p className={`text-white origin-left font-medium text-xl`}>
              Raul Belloso
            </p>
            <p
              className={`text-light-blue font-extralight text-xs flex gap-3 items-center  `}
            >
              Ver perfil <FaLongArrowAltRight />
            </p>
          </span>
        </div>
        <ul className="pt-6 ">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`text-white text-md flex items-center gap-5  p-2 pt-3 cursor-pointer rounded-md hover:bg-light-white`}
              onClick={() => navigate(`${menu.url}`)}
            >
              <img
                src={require(`../../assets/icons/${menu.src}.svg`)}
                alt="icon_menu"
                width={30}
              />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className=" p-7 text-2x1 font-semi-bold flex-1 h-screen bg-light-gray">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
