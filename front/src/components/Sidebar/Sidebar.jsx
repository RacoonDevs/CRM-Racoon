import React, { useState } from "react";
import profile from "../../assets/img/profile.jpg";
import {
  FaChevronCircleLeft,
  FaLongArrowAltRight,
  FaPowerOff,
} from "react-icons/fa";
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
        } duration-500 h-screen p-5 pt-10 bg-dark-purple relative `}
      >
        <FaChevronCircleLeft
          className={`absolute cursor-pointer 
          -right-3 top-3 w-8 ${!open && "rotate-180"}`}
          color="white"
          size={32}
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
        <div className="flex text-white font-bold gap-x-5 p-2 pt-3 items-center cursor-pointer rounded-md hover:bg-light-white float">
          <FaPowerOff size={28} color={"white"} />
          <p className={`${!open && "hidden"} origin-left duration-200`}>
            Cerrar sesión
          </p>
        </div>
      </div>
      <div className="flex-1 h-screen bg-light-gray">
        <div className="text-white text-2xl flex gap-2 h-14 justify-end p-4 items-center bg-gradient-to-l from-blue-500  to-dark-purple ">
          <img
            src={require(`../../assets/img/Logo_Blanco.png`)}
            alt="crm_icon"
            width={30}
          />
          <p className="font-bold">CRM RACOON</p>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;