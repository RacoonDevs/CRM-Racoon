import React, { useState, useContext } from "react";
import { AccountContext } from "../../AppContext/AppProvider";
import profile from "../../assets/img/profile.jpg";
import {
  FaChevronCircleLeft,
  FaLongArrowAltRight,
  FaPowerOff,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const { logout, userData } = useContext(AccountContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "home-smile", url: "/dashboard" },
    { title: "Proyectos", src: "book-bookmark", url: "/proyectos" },
    { title: "Tareas", src: "task-list", url: "/tareas" },
    { title: "Usuarios", src: "users", url: "/usuarios" },
  ];

  const sesion = () => {
    logout()
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

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
              {userData ? userData["datos_sesion"].user_name : "Usuario"}
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
        <div
          onClick={() => sesion()}
          className="absolute bottom-0 pb-10 text-white text-left flex flex-col justify-center w-100"
        >
          <div className="text-md flex justify-center items-center gap-5 p-2 cursor-pointer rounded-md hover:bg-light-white">
            <p>
              <FaPowerOff size={28} color={"white"} />
            </p>
            <p className={`${!open && "hidden"} origin-left duration-200`}>
              Logout
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 p-2 pb-5">
          <p className={` ${!open && "hidden"} text-xs  text-slate-300`}>
            RACOON V 1.0.1
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
