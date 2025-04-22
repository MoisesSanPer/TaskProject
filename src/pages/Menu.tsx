import React from "react";
import "../css/style.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { FaRegPlayCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Button, Dialog, Flex } from "@fluentui/react-northstar";
import { useAuth } from "../Context/useAuth";
import { PiPauseDuotone } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Menu = ({}) => {
  const { logout, Categories, Tags } = useAuth();
  return (
    <div className="menu-container">
      <h1 className="h1c1">Menu</h1>
      <h2 className="h2c1">TASKS</h2>
      <div className="Tareas mb" onClick={undefined}>
        <Flex>
          <IoIosTimer size={20} />
          <p>Non Started</p>
        </Flex>
      </div>
      <div className="Tareas mb" onClick={undefined}>
        <Flex>
          <FaRegPlayCircle size={20} />
          <p>In progress</p>
        </Flex>
      </div>
      <div className="Tareas mb" onClick={undefined}>
        <Flex>
          <PiPauseDuotone size={20} />
          <p>Paused</p>
        </Flex>
      </div>
      <div className="Tareas mb" onClick={undefined}>
        <Flex>
          <IoCalendarOutline size={20} />
          <p>Late </p>
        </Flex>
      </div>
      <div className="Tareas" onClick={undefined}>
        <Flex>
          <FaRegCheckCircle size={20} />
          <p>Finished</p>
        </Flex>
      </div>
      <h2 className="h2c1">CATEGORY</h2>
      <div>
        {Categories.map((category) => (
          <p key={category.id}>{category.title}</p>
        ))}
        <div className="Tareas" onClick={undefined}>
          <Flex styles={{ marginRight: "10px" }}>
            <IoMdAdd size={20} />
            <p>Add New Category</p>
          </Flex>
        </div>

      </div>

      <h2 className="h2c1">TAGS</h2>
      <div className="section">
        {Tags.map((tag) => (
          <p key={tag.id}>{tag.title}</p>
        ))}
        <div className="Tareas" onClick={undefined}>
          <Flex>
            <IoMdAdd size={20} />
            <p>Add New Tag</p>
          </Flex>
        </div>
      </div>
      <div className="footer">
        <div className="Tareas mb" onClick={undefined}>
          <Flex>
            <FaRegCalendarAlt size={20} />
            <p>Calendar </p>
          </Flex>
        </div>
        <div className="Tareas" onClick={logout}>
          <Flex>
            <FaSignOutAlt size={20} />
            <p>Sign Out</p>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Menu;
