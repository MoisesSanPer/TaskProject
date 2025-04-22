import  { useState } from "react";
import { Dialog, Button, Flex, Input } from "@fluentui/react-northstar";
import {
  FaRegCalendarAlt,
  FaRegPlayCircle,
  FaSignOutAlt,
  FaRegCheckCircle,
} from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { PiPauseDuotone } from "react-icons/pi";
import { useAuth } from "../Context/useAuth";
import "../css/style.css";
import { IoCalendarOutline } from "react-icons/io5";
import { categoryAdd } from "../Context/CategoryAuth";
import { tagAdd } from "../Context/tagAuth";
import { SiEgnyte } from "react-icons/si";

const Menu = () => {
  const { logout, Categories, Tags, user } = useAuth();
  const [inputCategoryValue, setInputCategoryValue] = useState("");
  const [inputTagValue, setInputTagValue] = useState("");

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
      </div>
      <Dialog
        cancelButton="Cancel"
        confirmButton="Create"
        header="Create Category"
        trigger={<Button content="Create  Category" />}
        content={
          <div>
            <label htmlFor="inputField">Título:</label>
            <Input
              id="inputField"
              value={inputCategoryValue}
              onChange={({}, data) => setInputCategoryValue(data?.value ?? "")}
              placeholder="Escribe  el titulo de la categoria"
            />
          </div>
        }
        onConfirm={() => {categoryAdd(inputCategoryValue, user?.id!!); setInputCategoryValue("")}}
        onCancel={()=> setInputCategoryValue("")}
      />
      <h2 className="h2c1">TAGS</h2>
      <div>
        {Tags.map((tag) => (
          <p key={tag.id}>{tag.title}</p>
        ))}
      </div>
      <Dialog
        cancelButton="Cancel"
        confirmButton="Create"
        header="Create Tag"
        trigger={<Button content="Create  Tag" />}
        content={
          <div>
            <label htmlFor="inputField">Título:</label>
            <Input
              id="inputField"
              value={inputTagValue}
              onChange={({}, data) => setInputTagValue(data?.value ?? "")}
              placeholder="Escribe  el titulo del tag"
            />
          </div>
        }
        onConfirm={() =>{ tagAdd(inputTagValue, user?.id!!); setInputTagValue("") }}
        onCancel={() => setInputTagValue("")}
      />
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
