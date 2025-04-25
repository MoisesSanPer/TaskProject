import { useEffect, useState } from "react";
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
import {
  categoryAdd,
  categoryDelete,
  categoryUpdate,
} from "../Context/CategoryAuth";
import { tagAdd, tagDelete, tagUpdate } from "../Context/tagAuth";
import { Category } from "../models/Category";
import { Tag } from "../models/Tag";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { Datepicker } from "@fluentui/react-northstar";
import ShowMoreText from "react-show-more-text";

const Menu = () => {
  const { logout, Categories, Tags, user } = useAuth();
  const [inputCategoryValue, setInputCategoryValue] = useState("");
  const [inputCategoryUpdateValue, setinputCategoryUpdateValue] =
    useState<string>();
  const [inputTagValue, setInputTagValue] = useState("");
  const [inputTagUpdateValue, setinputTagUpdateValue] = useState<string>();
  //Creas 2 estados que son temporales para ir puediendo actualizar la UI  del front
  //Importante poner el tipo cuando a veces este dando errores el estado ya que este no reconoce de forma directa este
  const [tempCategories, setTempCategories] = useState<Category[]>([]);
  const [tempTags, setTempTags] = useState<Tag[]>([]);
  //Controlas la cantidad de categorias visibles que quieres tener
  const [visibleCategories, setVisibleCategories] = useState(4);

  //Metodo que se ejecutara  lo que hara es que cuando se clicke el boton se sumara a el valor incial de categorias 4
  // Las que haya mas en donde se haya usado  
  const handleShowMore = () => {
    setVisibleCategories((prev) => prev + 4);
  };

  //Efecto secundarios que lo que hace es asignarle el valor por defecto a las temporales del valor que recoje del contexto anteriormente
  useEffect(() => {
    setTempCategories(Categories);
  }, [Categories]);
  useEffect(() => {
    setTempTags(Tags);
  }, [Tags]);

  return (
    <div className="menu-container">
      <h1 className="h1c1" style={{cursor:"default"}}>Menu</h1>
      <h2 className="h2c1" style={{cursor:"default"}}>TASKS</h2>
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
      <h2 className="h2c1" style={{cursor:"default"}}>CATEGORY</h2>
      <div>
        {
          //El .slice lo que crea es una copia del array desde la posicion 0 hasta la posicion de la variable del hook que declaramos anteriormente
        tempCategories.slice(0, visibleCategories).map((category) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Flex>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "150px",
                  cursor:"default"
                }}
                key={category.id}
              >
                {category.title}
              </p>
              <Dialog
                cancelButton="Cancel"
                confirmButton="Update"
                header="Update Category"
                trigger={
                  <MdModeEdit
                    size={20}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    className="icons"
                  />
                }
                content={
                  <div>
                    <label htmlFor="UpdateField">Título:</label>
                    <Input
                      id="UpdateField"
                      defaultValue={category.title}
                      value={inputCategoryUpdateValue}
                      onChange={({}, data) =>
                        setinputCategoryUpdateValue(data?.value ?? "")
                      }
                      placeholder="Actualiza  el titulo de la categoria"
                    />
                  </div>
                }
                onConfirm={() => {
                  const updatedCategory = {
                    ...category,
                    title: inputCategoryUpdateValue!!,
                  };
                  categoryUpdate(
                    updatedCategory.id,
                    updatedCategory.title,
                    updatedCategory.idUser
                  );
                  setTempCategories((prevCategories) =>
                    prevCategories.map((cat) =>
                      cat.id === updatedCategory.id ? updatedCategory : cat
                    )
                  );
                }}
                onCancel={() => setinputCategoryUpdateValue(category.title)}
              />
              <RiDeleteBin5Line
                onClick={() => {
                  //You  do th e then to take the value that you have recieved before
                  // with the value of the then that is result you can  control if is is true or not
                  //And if it is true yo update the Array of categorys
                  categoryDelete(category.id).then((result) => {
                    if (result) {
                      setTempCategories((cat) =>
                        cat.filter((c) => c.id !== category.id)
                      );
                    }
                  });
                }}
                size={20}
                style={{ marginTop: "10px", marginLeft: "10px" }}
                className="icons"
              />
            </Flex>
          </div>
        ))}
        {
        visibleCategories < tempCategories.length && (
          <Button onClick={handleShowMore} content="Show More" />
        )}
      </div>
      <Dialog
        cancelButton="Cancel"
        confirmButton="Create"
        header="Add Category"
        trigger={<Button content="Add  Category" />}
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
        onConfirm={() => {
          const idTemp = uuidv4();
          categoryAdd(idTemp, inputCategoryValue, user?.id!!);
          //Objeto que nos servira para añadir al array despues
          const newCategory: Category = {
            id: idTemp,
            title: inputCategoryValue,
            idUser: user?.id!!,
          };
          setInputCategoryValue("");
          //Actualizamos el array  es decir añadiendole al final de este la nueva categoria que hemos creado
          setTempCategories([...tempCategories, newCategory]);
        }}
        onCancel={() => setInputCategoryValue("")}
      />
      <h2 className="h2c1" style={{cursor:"default"}}>TAGS</h2>
      <div>
        {tempTags.map((tag) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Flex>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "150px",
                  cursor:"default"
                }}
                key={tag.id}
              >
                {tag.title}
              </p>
              <Dialog
                cancelButton="Cancel"
                confirmButton="Update"
                header="Update Tag"
                trigger={
                  <MdModeEdit
                    size={20}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    className="icons"
                  />
                }
                content={
                  <div>
                    <label htmlFor="UpdateField">Título:</label>
                    <Input
                      id="UpdateField"
                      defaultValue={tag.title}
                      value={inputTagUpdateValue}
                      onChange={({}, data) =>
                        setinputTagUpdateValue(data?.value ?? "")
                      }
                      placeholder="Actualiza  el titulo del tag"
                    />
                  </div>
                }
                onConfirm={() => {
                  const updatedTag = {
                    ...tag,
                    title: inputTagUpdateValue!!,
                  };
                  tagUpdate(updatedTag.id, updatedTag.title, updatedTag.idUser);
                  setTempTags((prevTags) =>
                    prevTags.map((tag) =>
                      tag.id === updatedTag.id ? updatedTag : tag
                    )
                  );
                }}
                onCancel={() => setinputTagUpdateValue(tag.title)}
              />
              <RiDeleteBin5Line
                onClick={() => {
                  tagDelete(tag.id).then((res) => {
                    if (res) {
                      setTempTags((ta) => ta.filter((t) => t.id !== tag.id));
                    }
                  });
                }}
                size={20}
                style={{ marginTop: "10px", marginLeft: "10px" }}
                className="icons"
              />
            </Flex>
          </div>
        ))}
      </div>
      <Dialog
        cancelButton="Cancel"
        confirmButton="Create"
        header="Add Tag"
        trigger={<Button content="Add  Tag" />}
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
        onConfirm={() => {
          //Cambiar para que se actualize el contexto esto es de forma temporal
          const idTemp = uuidv4();
          tagAdd(idTemp, inputTagValue, user?.id!!);
          const newTag = {
            id: idTemp,
            title: inputTagValue,
            idUser: user?.id!!,
          };
          setInputTagValue("");
          //Actualizamos el array  es decir añadiendole al final de este el nuevo Tag que hemos creado
          setTempTags([...tempTags, newTag]);
        }}
        onCancel={() => setInputTagValue("")}
      />
      <div className="footer">
        <Dialog
          cancelButton="Cancel"
          confirmButton="Accept"
          header="Task founded"
          trigger={
            <div className="Tareas mb">
              <Flex>
                <FaRegCalendarAlt size={20} />
                <p>Calendar </p>
              </Flex>
            </div>
          }
          content={
            <div>
              <Datepicker />
            </div>
          }
        />
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
