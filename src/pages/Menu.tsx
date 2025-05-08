import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  Button,
  Flex,
  Input,
  Dropdown,
  Datepicker,
  Divider,
} from "@fluentui/react-northstar";
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
import { toast } from "react-toastify";
import { TaskAdd, taskDelete, taskUpdate } from "../Context/TaskAuth";
import { Status } from "../models/Status";
import { Task } from "../models/Task";
import { FaEye } from "react-icons/fa";

const Menu = () => {
  //La lista que recibes de la api cuando se llama a la base de datos
  //Esta lista lo que haremos sera guardarla en hooks temporales que luego usaremos para poder asi actualizar estas listas
  //Si nos hiciera falta durante la ejecuccion
  const { logout, Categories, Tags, user, Tasks, updateListTask } = useAuth();

  //Estos son los hook que usaremos cuando queramos crear  una categoria o un Tag
  const [inputCategoryValue, setInputCategoryValue] = useState("");
  const [inputTagValue, setInputTagValue] = useState("");

  //Estos son los Los hook de cuando queremos actualizar el valor del titulo de la categoria o de los tag ya que es el unico campo actualizable
  const [inputCategoryUpdateValue, setinputCategoryUpdateValue] =
    useState<string>();
  const [inputTagUpdateValue, setinputTagUpdateValue] = useState<string>();
  //Este es un hook el cual  ,e dice que categoria este seleccionada
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [selectedTask, setSelectedTask] = useState<Task>();

  //Estos son los hook para editar campos  en las tasks
  const [inputTaskTitleUpdateValue, setInputTaskTitleUpdateValue] =
    useState<string>();
  const [inputTaskDescriptionUpdateValue, setInputTaskDescriptionUpdateValue] =
    useState<string>();
  const [inputTaskEndDateUpdateValue, setInputTaskEndDateUpdateValue] =
    useState<string>();
  const [updateSubTasks, seUpdatesubTasks] = useState<Task[]>([]);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [updateCategory, setUpdateCategory] = useState<Category[]>([]);
  const [updateTag, setUpdateTag] = useState<Tag[]>([]);

  //Efecto secundario el cual actualizara el input de cuando queramos editar una categoria
  useEffect(() => {
    setInputTaskTitleUpdateValue(selectedTask?.title);
  }, [selectedTask]);
  useEffect(() => {
    setInputTaskDescriptionUpdateValue(selectedTask?.description);
  }, [selectedTask]);
  useEffect(() => {
    setInputTaskEndDateUpdateValue(selectedTask?.endDate);
  }, [selectedTask]);
  useEffect(() => {
    setUpdateStatus(status[selectedTask?.status!!] ?? "");
  }, [selectedTask]);
  useEffect(() => {
    seUpdatesubTasks(selectedTask?.subTasks || []);
  }, [selectedTask]);
  useEffect(() => {
    setUpdateCategory(selectedTask?.categories || []);
  }, [selectedTask]);
  useEffect(() => {
    setUpdateTag(selectedTask?.tags || []);
  }, [selectedTask]);

  ////ESTOS SON LOS CAMPOS PARA AÑADIR TASKS
  //Estos son los hook  primeros para añadir la descripcion y el titulo de las tareas
  const [inputTaskTitleValue, setInputTitleTaskValue] = useState("");
  const [inputTaskDescriptionValue, setInputTaskDescriptionValue] =
    useState("");
  //Fecha Para crear la tarea
  const [date, setDate] = useState<Date>(new Date());
  //Array de los estados
  const [status] = useState<string[]>([
    "NonStarted",
    "In Progress",
    "Paused",
    "Late",
    "Finished",
  ]);

  //Estado para el filtro
  const [filterTask, setFilterTask] = useState<number>();

  //Son la svariables que  cogeran el valor de cuando clickemos una opcion o varias depende del dropdown cuando queremos
  //Añadir una tarea a la aplicacion
  const [statusValue, setstatusValue] = useState<string>("");
  let statusAdd: Status;
  const [subTasks, setsubTasks] = useState<Task[]>([]);
  const [taskCategoryAdd, setTaskCategoryAdd] = useState<Category[]>([]);
  const [taskTagAdd, setTaskTagAdd] = useState<Tag[]>([]);

  //Creas los estados que son temporales para ir puediendo actualizar la UI  del front seran los que recogeras de  la respuesta de la API
  //Importante poner el tipo cuando a veces este dando errores el estado ya que este no reconoce de forma directa este
  const [tempCategories, setTempCategories] = useState<Category[]>([]);
  const [tempTags, setTempTags] = useState<Tag[]>([]);

  //Efecto secundarios que lo que hace es asignarle el valor por defecto a las temporales del valor que recoje del contexto anteriormente
  useEffect(() => {
    setTempCategories(Categories);
  }, [Categories]);
  useEffect(() => {
    setTempTags(Tags);
  }, [Tags]);

  //Efecto secundario el cual actualizara el input de cuando queramos editar una categoria
  useEffect(() => {
    setinputCategoryUpdateValue(selectedCategory?.title);
  }, [selectedCategory]);
  useEffect(() => {
    setinputTagUpdateValue(selectedTag?.title);
  }, [selectedTag]);

  //Estos son  las listas que hemos recibido de forma temporal las mapeamos a esta ya que nos hace falta en los dropdown un campo header
  //Este campo es el que  se mostrara en el dropdown que hara referencia  a  el nombre de cada item que mostrara
  const mappedTask = Tasks.map((task) => ({
    ...task,
    header: task.title,
  }));
  const mappedCategory = tempCategories.map((category) => ({
    ...category,
    header: category.title,
  }));

  const mappedTag = tempTags.map((tag) => ({
    ...tag,
    header: tag.title,
  }));

  //Estos hook y este metodo van a ser los que van a  actualizar los datos del medio en funcion del status que tenga la tarea
  const [centralText, setCentralText] = useState("No Task Selected");
  const handleTaskClick = (text: string, numberStatus: number) => {
    setCentralText(text);
    setFilterTask(numberStatus);
  };

  return (
    <div>
      <div className="middle-section">
        <h1 style={{ fontSize: "40px" }}>{centralText}</h1>
        <div>
          {Tasks.filter((task) => task.status == filterTask).map((task) => {
            const listTag: boolean =
              task.tags == null || task.tags?.length <= 0;
            const listCategory: boolean =
              task.categories == null || task.categories.length <= 0;
            const listSubTask: boolean =
              task.subTasks == null || task.subTasks.length <= 0;

            return (
              <div className="task-container">
                <Divider color="green" size={8}></Divider>
                <Flex>
                  <p className="task-title" key={task.id}>
                    {task.title}
                  </p>
                  <div className="task-icons">
                    <Dialog
                      style={{ overflow: "visible" }}
                      confirmButton="Ok"
                      header="View  Task"
                      trigger={
                        <FaEye
                          onClick={() => {}}
                          size={40}
                          style={{ marginTop: "10px", marginLeft: "80px" }}
                          className="icons"
                        />
                      }
                      content={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Título:</label>
                            <Input
                              id="TaskTitle"
                              value={task.title}
                              disabled={true}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Descripcion:</label>
                            <Input
                              id="TaskDescription"
                              value={task.description}
                              disabled={true}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">EndDate:</label>
                            <Input
                              id="TaskEndDate"
                              value={task.endDate}
                              disabled={true}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Status:</label>
                            <Input
                              id="TaskStatus"
                              value={status[task.status]}
                              disabled={true}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Tags:</label>
                            <Dropdown
                              multiple
                              placeholder="Click to see the Tag related"
                              id="TaskTag"
                              items={
                                listTag
                                  ? []
                                  : task.tags?.map((tag) => tag.title)
                              }
                              disabled={listTag}
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Category:</label>
                            <Dropdown
                              multiple
                              placeholder="Click to see the category related"
                              id="TaskCategory"
                              items={
                                listCategory
                                  ? []
                                  : task.categories.map((cat) => cat.title)
                              }
                              disabled={listCategory}
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">SubTasks:</label>
                            <Dropdown
                              multiple
                              placeholder="Click to see the subtasks related"
                              id="SubTasksCategory"
                              items={
                                listSubTask
                                  ? []
                                  : task.subTasks.map((task) => task.title)
                              }
                              disabled={listSubTask}
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                            />
                          </Flex>
                        </div>
                      }
                      onConfirm={() => {}}
                    />
                    <Dialog
                      style={{ overflow: "visible" }}
                      cancelButton="Cancel"
                      confirmButton="Update"
                      header="Update Task"
                      trigger={
                        <MdModeEdit
                          onClick={() => {
                            setSelectedTask(task);
                          }}
                          size={40}
                          style={{ marginTop: "10px", marginLeft: "20px" }}
                          className="icons"
                        />
                      }
                      content={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Flex gap="gap.small">
                            <label htmlFor="UpdateField">Título:</label>
                            <Input
                              id="UpdateFieldTitle"
                              value={inputTaskTitleUpdateValue}
                              onChange={(_, data) => {
                                setInputTaskTitleUpdateValue(data?.value ?? "");
                              }}
                              placeholder="Actualiza  el titulo de la tarea"
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">Descripcion:</label>
                            <Input
                              id="updateField"
                              value={inputTaskDescriptionUpdateValue}
                              onChange={({}, data) => {
                                setInputTaskDescriptionUpdateValue(
                                  data?.value ?? ""
                                );
                              }}
                              placeholder="Actualiza  la descripcion de la tarea"
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="inputField">EndDate:</label>
                            <Datepicker
                              input={{
                                clearable: true,
                              }}
                              id="TaskEndDate"
                              //Te dice la fecha  que esta seleccionada en este caso
                              onDateChange={(_, date) => {
                                setInputTaskEndDateUpdateValue(
                                  date?.value.toDateString()
                                );
                                return date;
                              }}
                              selectedDate={
                                new Date(
                                  Date.parse(inputTaskEndDateUpdateValue ?? "")
                                )
                              }
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="subTaskDropdown">SubTasks:</label>
                            <Dropdown
                              className="icons"
                              multiple
                              items={mappedTask.filter(
                                (Task) =>
                                  Task.id != task.id &&
                                  !Tasks.filter(
                                    (c) => c.subTasks && c.subTasks.length > 0
                                  )
                                    .flatMap((a) => a.subTasks)
                                    .some((b) => b.id === Task.id)
                              )}
                              placeholder="Update your SubTasks"
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                              onChange={(_, data) =>
                                seUpdatesubTasks(data.value)
                              }
                              value={updateSubTasks.map((task) => ({
                                ...task,
                                header: task.title,
                              }))}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="StatusDropdown">Status:</label>
                            <Dropdown
                              className="icons"
                              items={status}
                              placeholder="Update your Status"
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                              onChange={(_, data) =>
                                setUpdateStatus(data.value)
                              }
                              value={updateStatus}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="CategoryDropdown">Category:</label>
                            <Dropdown
                              className="icons"
                              multiple
                              items={mappedCategory.filter(
                                (cat) =>
                                  !task.categories.some((b) => b.id === cat.id)
                              )}
                              placeholder="Update your Category"
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                              onChange={(_, data) =>
                                setUpdateCategory(data.value)
                              }
                              value={updateCategory.map((cat) => ({
                                ...cat,
                                header: cat.title,
                              }))}
                            />
                          </Flex>
                          <Flex gap="gap.small">
                            <label htmlFor="TagsDropdown">Tags:</label>
                            <Dropdown
                              className="icons"
                              multiple
                              items={mappedTag.filter(
                                (tag) => !task.tags.some((t) => t.id === tag.id)
                              )}
                              placeholder="Update your Tags"
                              noResultsMessage="We couldn't find any matches."
                              position="below"
                              onChange={(_, data) => setUpdateTag(data.value)}
                              value={updateTag.map((tag) => ({
                                ...tag,
                                header: tag.title,
                              }))}
                            />
                          </Flex>
                        </div>
                      }
                      onConfirm={() => {
                        const updatedTask = {
                          ...task,
                          title: inputTaskTitleUpdateValue ?? task.title,
                          description:
                            inputTaskDescriptionUpdateValue ?? task.description,
                          endDate: inputTaskEndDateUpdateValue ?? task.endDate,
                          status: status.indexOf(updateStatus),
                          subTasks: updateSubTasks ?? [],
                          categories: updateCategory ?? [],
                          tags: updateTag ?? [],
                        };
                        const incrementTaskAmount = (task: Task) => {
                          const  newTasks =[...Tasks]
                          newTasks.splice(newTasks.indexOf(task), 1, updatedTask);
                          updateListTask(newTasks);
                        };
                        incrementTaskAmount(task)

                        taskUpdate(
                          updatedTask.id,
                          updatedTask.title ?? "",
                          updatedTask.idUser,
                          updatedTask.description ?? "",
                          updatedTask.endDate ?? "",
                          updatedTask.status,
                          updatedTask.subTasks ?? [],
                          updatedTask.tags ?? [],
                          updatedTask.categories ?? []
                        );
                      }}
                      onCancel={() => {
                        setInputTaskTitleUpdateValue(task.title);
                        setInputTaskDescriptionUpdateValue(task.description);
                        setInputTaskEndDateUpdateValue(task.endDate);
                      }}
                    />
                    <RiDeleteBin5Line
                      onClick={() => {
                        taskDelete(task.id).then((result) => {
                          if (result) {
                            //Lo que haces es actualizar la lista temporal con los id que sena distinto del que has clickado para asi no tener que  borrar
                            //de la lista temporal y asi no tener problemas
                            updateListTask(
                              Tasks.filter((c) => c.id != task.id)
                            );
                          }
                        });
                      }}
                      size={40}
                      style={{ marginTop: "10px", marginLeft: "10px" }}
                      className="icons"
                    />
                  </div>
                </Flex>
                <Divider color="green" size={8}></Divider>
              </div>
            );
          })}
        </div>
      </div>
      <div className="menu-container">
        <h1 className="h1c1" style={{ cursor: "default" }}>
          Menu
        </h1>
        <h2 className="h2c1" style={{ cursor: "default" }}>
          TASKS
        </h2>
        <div
          className="Tareas mb"
          onClick={() => handleTaskClick("Non Started", Status.NonStarted)}
        >
          <Flex>
            <IoIosTimer size={20} />
            <p>Non Started</p>
          </Flex>
        </div>
        <div
          className="Tareas mb"
          onClick={() => handleTaskClick("In progress", Status.InProgress)}
        >
          <Flex>
            <FaRegPlayCircle size={20} />
            <p>In progress</p>
          </Flex>
        </div>
        <div
          className="Tareas mb"
          onClick={() => handleTaskClick("Paused", Status.Paused)}
        >
          <Flex>
            <PiPauseDuotone size={20} />
            <p>Paused</p>
          </Flex>
        </div>
        <div
          className="Tareas mb"
          onClick={() => handleTaskClick("Late", Status.Late)}
        >
          <Flex>
            <IoCalendarOutline size={20} />
            <p>Late </p>
          </Flex>
        </div>
        <div
          className="Tareas"
          onClick={() => handleTaskClick("Finished", Status.Finished)}
        >
          <Flex>
            <FaRegCheckCircle size={20} />
            <p>Finished</p>
          </Flex>
        </div>
        <Dialog
          style={{ overflow: "visible" }}
          cancelButton="Cancel"
          confirmButton="Create"
          header="Add Task"
          trigger={<Button content="Add  Task" />}
          content={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflow: "visible",
              }}
            >
              <Flex gap="gap.small">
                <label htmlFor="inputField">Título:</label>
                <Input
                  id="inputField"
                  value={inputTaskTitleValue}
                  onChange={({}, data) =>
                    setInputTitleTaskValue(data?.value ?? "")
                  }
                  placeholder="Escribe  el titulo de la tarea"
                />
              </Flex>
              <Flex gap="gap.small">
                <label htmlFor="inputField">Descripcion:</label>
                <Input
                  id="inputField"
                  value={inputTaskDescriptionValue}
                  onChange={({}, data) =>
                    setInputTaskDescriptionValue(data?.value ?? "")
                  }
                  placeholder="Escribe  la descripcion de la tarea"
                />
              </Flex>
              <div>
                <Flex gap="gap.small">
                  <label>Date:</label>
                  <Datepicker
                    selected={date}
                    onDateChange={(_, data) => {
                      if (data) {
                        setDate(data?.value);
                      }
                    }}
                  />
                </Flex>
              </div>
              <Flex gap="gap.small">
                <label htmlFor="SubTaskDropdown">SubTasks:</label>
                <Dropdown
                  className="icons"
                  multiple
                  items={mappedTask}
                  placeholder="Select your SubTasks"
                  noResultsMessage="We couldn't find any matches."
                  a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                  position="below"
                  onChange={(_, data) => setsubTasks(data.value)}
                  value={subTasks}
                />
              </Flex>
              <Flex gap="gap.small">
                <label htmlFor="statusDropdown">Status:</label>
                <Dropdown
                  items={status}
                  className="icons"
                  placeholder="Select your Status"
                  noResultsMessage="We couldn't find any matches."
                  a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                  position="below"
                  onChange={(_, data) => setstatusValue(data.value)}
                  value={statusValue}
                />
              </Flex>
              <Flex gap="gap.small">
                <label htmlFor="categoryDropdown">Category:</label>
                <Dropdown
                  multiple
                  items={mappedCategory}
                  className="icons"
                  placeholder="Select your Categories"
                  noResultsMessage="We couldn't find any matches."
                  a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                  position="below"
                  onChange={(_, data) => setTaskCategoryAdd(data.value)}
                  value={taskCategoryAdd}
                />
              </Flex>
              <Flex gap="gap.small">
                <label htmlFor="tagDropdown">Tag:</label>
                <Dropdown
                  multiple
                  items={mappedTag}
                  className="icons"
                  placeholder="Select your Tags"
                  noResultsMessage="We couldn't find any matches."
                  a11ySelectedItemsMessage="Press Delete or Backspace to remove"
                  position="below"
                  onChange={(_, data) => setTaskTagAdd(data.value)}
                  value={taskTagAdd}
                  styles={{
                    position: "relative",
                  }}
                />
              </Flex>
            </div>
          }
          onConfirm={() => {
            if (!inputTaskTitleValue || inputTaskTitleValue.trim() === "") {
              toast.warning("La tarea no puede tener un titulo  vacio.");
              return;
            }
            const idTemp = uuidv4();
            if (statusValue == "NonStarted") {
              statusAdd = Status.NonStarted;
            } else if (statusValue == "In Progress") {
              statusAdd = Status.InProgress;
            } else if (statusValue == "Paused") {
              statusAdd = Status.Paused;
            } else if (statusValue == "Late") {
              statusAdd = Status.Late;
            } else {
              statusAdd = Status.NonStarted;
            }
            const newTask: Task = {
              id: idTemp,
              title: inputTaskTitleValue,
              description: inputTaskDescriptionValue,
              endDate: date?.toDateString(),
              status: statusAdd,
              subTasks: subTasks,
              tags: taskTagAdd,
              categories: taskCategoryAdd,
              idUser: user?.id!!,
            };
            Tasks.push(newTask);
            TaskAdd(
              idTemp,
              inputTaskTitleValue,
              inputTaskDescriptionValue,
              date?.toDateString(),
              statusAdd,
              subTasks,
              taskTagAdd,
              taskCategoryAdd,
              user?.id!!
            );
            setInputTitleTaskValue("");
            setInputTaskDescriptionValue("");
            setsubTasks([]);
            setstatusValue("");
            setTaskCategoryAdd([]);
            setTaskTagAdd([]);
          }}
          onCancel={() => {
            setInputTitleTaskValue("");
            setInputTaskDescriptionValue("");
            setsubTasks([]);
            setstatusValue("");
            setTaskCategoryAdd([]);
            setTaskTagAdd([]);
          }}
        />
        <h2 className="h2c1" style={{ cursor: "default" }}>
          CATEGORY
        </h2>
        <div>
          {
            //El .slice lo que crea es una copia del array desde la posicion 0 hasta la posicion de la variable del hook que declaramos anteriormente
            tempCategories.map((category) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Flex>
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "150px",
                      cursor: "default",
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
                        onClick={() => setSelectedCategory(category)}
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
                      // with the value of the then that is result you can  control if it is true or not
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
            ))
          }
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
                onChange={({}, data) =>
                  setInputCategoryValue(data?.value ?? "")
                }
                placeholder="Escribe  el titulo de la categoria"
              />
            </div>
          }
          onConfirm={() => {
            if (!inputCategoryValue || inputCategoryValue.trim() === "") {
              toast.warning("La categoría no puede tener un titulo  vacio.");
              return;
            }
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
        <h2 className="h2c1" style={{ cursor: "default" }}>
          TAGS
        </h2>
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
                    cursor: "default",
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
                      onClick={() => setSelectedTag(tag)}
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
                    tagUpdate(
                      updatedTag.id,
                      updatedTag.title,
                      updatedTag.idUser
                    );
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
            if (!inputTagValue || inputTagValue.trim() === "") {
              toast.warning("La tag no puede tener un titulo vacio.");
              return;
            }
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
    </div>
  );
};

export default Menu;
