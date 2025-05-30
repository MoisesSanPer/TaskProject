import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  Button,
  Flex,
  Input,
  Dropdown,
  Datepicker,
  CloseIcon,
  Tooltip,
  TextArea,
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
import "../css/DarkMode.css";
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
import DarkMode from "../components/DarkMode";
const Menu = ({
  toggleTheme,
}: {
  toggleTheme: (selectedTheme: string) => void;
}) => {
  //This is the list that you recieve when you called the API from database
  //In this list the thing that we are going to do it save the data of the temporal hooks so we can update  the information
  //If it is necessary during the ejecutiono of the app
  const {
    logout,
    Categories,
    Tags,
    user,
    Tasks,
    updateListTask,
    Configuration,
  } = useAuth();

  useEffect(() => {
    toggleTheme(Configuration.theme);
  }, [Configuration]);

  //This are the hooks that we are going to use when we want to create a category or a tag
  const [inputCategoryValue, setInputCategoryValue] = useState("");
  const [inputTagValue, setInputTagValue] = useState("");

  //This are the hooks that we want to update when the value of the category title or tags title because it is a an updatable field
  const [inputCategoryUpdateValue, setinputCategoryUpdateValue] =
    useState<string>();
  const [inputTagUpdateValue, setinputTagUpdateValue] = useState<string>();

  //This are the hooks that told us what is the selected  outside the return so we can  make the use Effect
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [selectedTask, setSelectedTask] = useState<Task>();

  //This are the  hooks that control the  updates value of the tasks
  //With this hooks we can  set the default values and we can change later
  const [inputTaskTitleUpdateValue, setInputTaskTitleUpdateValue] =
    useState<string>();
  const [inputTaskDescriptionUpdateValue, setInputTaskDescriptionUpdateValue] =
    useState<string>();
  const [inputTaskEndDateUpdateValue, setInputTaskEndDateUpdateValue] =
    useState<string>();
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [updateSubTasks, seUpdatesubTasks] = useState<Task[]>([]);
  const [updateCategory, setUpdateCategory] = useState<Category[]>([]);
  const [updateTag, setUpdateTag] = useState<Tag[]>([]);

  //This are the secondary effects that affects the edit tasks and update all the time when we want to change the value of it
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

  //This are the fields of the create Task
  //This are the hooks that  control the  add description and add title input of the tasks
  const [inputTaskTitleValue, setInputTitleTaskValue] = useState("");
  const [inputTaskDescriptionValue, setInputTaskDescriptionValue] =
    useState("");
  //This is the hook of the date that control the Datepicker
  const [date, setDate] = useState<Date>(new Date());
  //This is an array of states thst is useful when we want to  make the number value of status from
  const [status] = useState<string[]>([
    "NonStarted",
    "In Progress",
    "Paused",
    "Late",
    "Finished",
  ]);

  const [CategoryDeleteDialogOpen, setCategoryDeleteDialogOpen] =
    useState(false);
  const [TagDeleteDialogOpen, setTagDeleteDialogOpen] = useState(false);

  //The state from the filter that help us when we want to list  every status Task
  const [filterTask, setFilterTask] = useState<number>();

  //This are the values that collect the value  when we click in a option or different options of the update Task
  const [statusValue, setstatusValue] = useState<string>("");
  let statusAdd: Status;
  const [subTasks, setsubTasks] = useState<Task[]>([]);
  const [taskCategoryAdd, setTaskCategoryAdd] = useState<Category[]>([]);
  const [taskTagAdd, setTaskTagAdd] = useState<Tag[]>([]);

  //This are  the  temporal states  where we save tha value thate we fetch from  the API and update the frontList
  //Important is to put the type of the useState  because sometimes it does not recognise normally so you have to put to hand
  const [tempCategories, setTempCategories] = useState<Category[]>([]);
  const [tempTags, setTempTags] = useState<Tag[]>([]);

  //This are the secondary effects that assign  the default value  of the list that recieve from the context and update the temporal lists with  this values
  useEffect(() => {
    setTempCategories(Categories);
  }, [Categories]);
  useEffect(() => {
    setTempTags(Tags);
  }, [Tags]);

  //Secondary effects that update the input when we want to edit a category
  useEffect(() => {
    setinputCategoryUpdateValue(selectedCategory?.title);
  }, [selectedCategory]);
  useEffect(() => {
    setinputTagUpdateValue(selectedTag?.title);
  }, [selectedTag]);

  //This are the list mapped that we had recieved from the temporal lists , so we map beacuse it is neccessary to add a header field so we can name the dropdown
  //This is  the field that will be shown in the dropdown   every item of the dropdown
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

  //This is  the hook that control the middle component and save the state
  const [centralText, setCentralText] = useState("No Task Selected");
  const [num, setNum] = useState("");
  const [categoryTasksNumber, setCategoryTasksNumber] = useState<boolean>();
  const [tagsTaskNumber, setTagTaskNumber] = useState<boolean>();

  //This is the method that update the middle component depend of the text and the status you want to show the tasks
  const handleTaskClick = (text: string, numberStatus: number) => {
    setCategoryTasksNumber(false);
    setTagTaskNumber(false);
    setNum(numberStatus.toString());
    setCentralText(text);
    setFilterTask(numberStatus);
  };
  const handleCategoryClick = (category: Category) => {
    setTagTaskNumber(false);
    setCentralText(category.title);
    setSelectedCategory(category);
    setCategoryTasksNumber(true);
  };
  const handleTagClick = (tag: Tag) => {
    setCategoryTasksNumber(false);
    setCentralText(tag.title);
    setSelectedTag(tag);
    setTagTaskNumber(true);
  };
  return (
    <div>
      <div className="middle-section">
        <Flex>
          <h1 style={{ fontSize: "40px" }}>{centralText}</h1>
          <div style={{ width: "70px" }}></div>
          <div
            className="BoxNumberCount"
            style={{ width: "50px", height: "50px" }}
          >
            <span style={{ fontSize: "28px", fontWeight: "bold" }}>
              {/*THis filter  how many tasks are depending of the status of the task you have clicked before */}
              {tagsTaskNumber === true
                ? Tasks.filter((task) =>
                    task.tags.some((tagg) => tagg.id == selectedTag!.id)
                  ).length.toString()
                : categoryTasksNumber === true
                ? Tasks.filter((sta) =>
                    sta.categories.some(
                      (cat) => cat.id === selectedCategory!.id
                    )
                  ).length.toString()
                : Tasks.filter((st) => st.status.toString() == num)
                    .map((sta) => sta.status)
                    .length.toString()}
            </span>
          </div>
        </Flex>
        <div>
          <div className="task-columns">
            {tagsTaskNumber === true
              ? mappedTask
                  .filter((sta) =>
                    sta.tags.some((tags) => tags.id === selectedTag!.id)
                  )
                  .map((task) => (
                    <div className="task-container" key={task.id}>
                      <div className="task-inside-container">
                        <Flex>
                          <div className="task-text">
                            <p className="task-title">{task.title}</p>
                            <p className="task-subtitle">{task.description}</p>
                          </div>
                        </Flex>
                      </div>
                    </div>
                  ))
              : categoryTasksNumber === true
              ? mappedTask
                  .filter((task) =>
                    task.categories?.some(
                      (cat) => cat.id === selectedCategory!.id
                    )
                  )
                  .map((task) => (
                    <div className="task-container" key={task.id}>
                      <div className="task-inside-container">
                        <Flex>
                          <div className="task-text">
                            <p className="task-title">{task.title}</p>
                            <p className="task-subtitle">{task.description}</p>
                          </div>
                        </Flex>
                      </div>
                    </div>
                  ))
              : Tasks.filter((task) => task.status == filterTask).map(
                  (task) => {
                    {
                      /*We make this boolean to control the  disable option of the the view task because when we do not 
              have any item the dropdown  broke the app if we do not disabled  */
                    }
                    return (
                      <div className="task-container">
                        <div className="task-inside-container">
                          <Flex>
                            <div className="task-text">
                              <p className="task-title">{task.title}</p>
                              <p className="task-subtitle">
                                {task.description}
                              </p>
                            </div>
                            <div className="task-icons">
                              <Dialog
                                style={{ overflow: "visible" }}
                                confirmButton="Ok"
                                header="View  Task"
                                trigger={
                                  <FaEye
                                    onClick={() => {}}
                                    size={40}
                                    style={{
                                      marginTop: "10px",
                                      marginLeft: "80px",
                                    }}
                                    className="viewIcon"
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
                                      <label htmlFor="inputField">Title:</label>
                                      <Input
                                        id="TaskTitle"
                                        value={task.title}
                                        readOnly={true}
                                        styles={{ cursor: "crosshair" }}
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        Description:
                                      </label>
                                      <TextArea
                                        id="TaskDescription"
                                        value={task.description}
                                        readOnly={true}
                                        fluid
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        EndDate:
                                      </label>
                                      <Input
                                        id="TaskEndDate"
                                        value={task.endDate}
                                        readOnly={true}
                                        inverted
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        Status:
                                      </label>
                                      <Input
                                        id="TaskStatus"
                                        value={status[task.status]}
                                        readOnly={true}
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        Category:
                                      </label>
                                      <Tooltip
                                        dismissOnContentMouseEnter
                                        autoSize
                                        position="after"
                                        align="center"
                                        trigger={
                                          <span
                                            style={{
                                              fontStyle: "italic",
                                              fontSize: "16px",
                                              display: "inline-block",
                                              maxWidth: "200px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              cursor: "context-menu",
                                            }}
                                          >
                                            {task.categories.length > 0
                                              ? task.categories
                                                  .map((cat) => cat.title)
                                                  .join(", ")
                                              : "No hay categorias en esta Tarea"}
                                          </span>
                                        }
                                        content={
                                          <span
                                            style={{
                                              fontStyle: "italic",
                                              fontSize: "16px",
                                            }}
                                          >
                                            {task.categories.length > 0
                                              ? task.categories
                                                  .map((cat) => cat.title)
                                                  .join(", ")
                                              : "No hay categorias en esta Tarea"}
                                          </span>
                                        }
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">Tags:</label>
                                      <Tooltip
                                        dismissOnContentMouseEnter
                                        autoSize
                                        position="after"
                                        align="bottom"
                                        trigger={
                                          <span
                                            style={{
                                              fontStyle: "italic",
                                              fontSize: "16px",
                                              display: "inline-block",
                                              maxWidth: "200px",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              cursor: "context-menu",
                                            }}
                                          >
                                            {task.tags.length > 0
                                              ? task.tags
                                                  .map((tag) => tag.title)
                                                  .join(", ")
                                              : "No hay tags en esta Tarea"}
                                          </span>
                                        }
                                        content={
                                          <span
                                            style={{
                                              fontStyle: "italic",
                                              fontSize: "16px",
                                            }}
                                          >
                                            {task.tags.length > 0
                                              ? task.tags
                                                  .map((tag) => tag.title)
                                                  .join(", ")
                                              : "No hay tags en esta Tarea"}
                                          </span>
                                        }
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        SubTasks:
                                      </label>
                                      {/*Separate every item of subtask in Tooltip  so we can
                                  hover every one and lok */}
                                      {task.subTasks.length > 0 ? (
                                        task.subTasks.map((subTask, index) => (
                                          <Tooltip
                                            key={index}
                                            dismissOnContentMouseEnter
                                            autoSize
                                            position="below"
                                            align="start"
                                            trigger={
                                              <span
                                                style={{
                                                  fontStyle: "italic",
                                                  fontSize: "16px",
                                                  display: "inline-block",
                                                  maxWidth: "50px",
                                                  whiteSpace: "nowrap",
                                                  overflow: "hidden",
                                                  textOverflow: "ellipsis",
                                                  cursor: "context-menu",
                                                  marginRight: "8px",
                                                }}
                                              >
                                                {subTask.title}
                                              </span>
                                            }
                                            content={
                                              <div
                                                style={{
                                                  fontSize: "14px",
                                                  maxWidth: "300px",
                                                }}
                                              >
                                                <p>
                                                  <strong>Title:</strong>
                                                  {subTask.title}
                                                </p>
                                                <p>
                                                  <strong>Description:</strong>
                                                  {subTask.description}
                                                </p>
                                                <p>
                                                  <strong>End Date:</strong>
                                                  {subTask.endDate}
                                                </p>
                                                <p>
                                                  <strong>Status:</strong>
                                                  {status[subTask.status]}
                                                </p>
                                                <p>
                                                  {/*Mapped the categories to see  each ctaegory title that contain */}
                                                  <strong>Categories:</strong>
                                                  {subTask.categories
                                                    ?.map((cat) => cat.title)
                                                    .join(", ") ||
                                                    "No categories assign"}
                                                </p>
                                                <p>
                                                  <strong>Tags:</strong>
                                                  {subTask.tags
                                                    ?.map((cat) => cat.title)
                                                    .join(", ") ||
                                                    "No tags assign"}
                                                </p>
                                              </div>
                                            }
                                          />
                                        ))
                                      ) : (
                                        <span
                                          style={{
                                            fontStyle: "italic",
                                            fontSize: "16px",
                                          }}
                                        >
                                          There are no subtasks in this Task.
                                        </span>
                                      )}
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
                                    style={{
                                      marginTop: "10px",
                                      marginLeft: "20px",
                                    }}
                                    className="editIcon"
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
                                      <label htmlFor="UpdateField">
                                        Title:
                                      </label>
                                      <Input
                                        fluid
                                        maxLength="30"
                                        id="UpdateFieldTitle"
                                        value={inputTaskTitleUpdateValue}
                                        onChange={(_, data) => {
                                          setInputTaskTitleUpdateValue(
                                            data?.value ?? ""
                                          );
                                        }}
                                        placeholder="Update the task title"
                                      />
                                      <div
                                        style={{
                                          marginTop: "4px",
                                          fontSize: "1em",
                                          color: "#888",
                                          textAlign: "right",
                                        }}
                                      >
                                        {inputTaskTitleUpdateValue?.length}/200
                                      </div>
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        Description:
                                      </label>
                                      <TextArea
                                        id="updateField"
                                        maxLength={200}
                                        value={inputTaskDescriptionUpdateValue}
                                        onChange={({}, data) => {
                                          setInputTaskDescriptionUpdateValue(
                                            data?.value ?? ""
                                          );
                                        }}
                                        fluid
                                        resize="vertical"
                                        rows={4}
                                        placeholder="Update the description title"
                                      />
                                      <div
                                        style={{
                                          marginTop: "4px",
                                          fontSize: "1em",
                                          color: "#888",
                                          textAlign: "right",
                                        }}
                                      >
                                        {
                                          inputTaskDescriptionUpdateValue?.length
                                        }
                                        /200
                                      </div>
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="inputField">
                                        EndDate:
                                      </label>
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
                                            Date.parse(
                                              inputTaskEndDateUpdateValue ?? ""
                                            )
                                          )
                                        }
                                      />
                                    </Flex>
                                    <Flex gap="gap.small">
                                      <label htmlFor="subTaskDropdown">
                                        SubTasks:
                                      </label>
                                      <Dropdown
                                        className="icons"
                                        multiple
                                        //We only show tasks that do not have subtasks within them.
                                        //If some tasks have subtasks it will not be shown
                                        items={mappedTask.filter(
                                          (Task) =>
                                            Task.id != task.id &&
                                            !Tasks.filter(
                                              (c) =>
                                                c.subTasks &&
                                                c.subTasks.length > 0
                                            ).some((b) => b.id === Task.id)
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
                                      <label htmlFor="StatusDropdown">
                                        Status:
                                      </label>
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
                                      <label htmlFor="CategoryDropdown">
                                        Category:
                                      </label>
                                      <Dropdown
                                        className="icons"
                                        multiple
                                        items={mappedCategory.filter(
                                          (cat) =>
                                            !task.categories.some(
                                              (b) => b.id === cat.id
                                            )
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
                                      <label htmlFor="TagsDropdown">
                                        Tags:
                                      </label>
                                      <Dropdown
                                        className="icons"
                                        multiple
                                        items={mappedTag.filter(
                                          (tag) =>
                                            !task.tags.some(
                                              (t) => t.id === tag.id
                                            )
                                        )}
                                        placeholder="Update your Tags"
                                        noResultsMessage="We couldn't find any matches."
                                        position="below"
                                        onChange={(_, data) =>
                                          setUpdateTag(data.value)
                                        }
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
                                    title:
                                      inputTaskTitleUpdateValue ?? task.title,
                                    description:
                                      inputTaskDescriptionUpdateValue ??
                                      task.description,
                                    endDate:
                                      inputTaskEndDateUpdateValue ??
                                      task.endDate,
                                    status: status.indexOf(updateStatus),
                                    subTasks: updateSubTasks ?? [],
                                    categories: updateCategory ?? [],
                                    tags: updateTag ?? [],
                                  };
                                  const incrementTaskAmount = (task: Task) => {
                                    const newTasks = [...Tasks];
                                    newTasks.splice(
                                      newTasks.indexOf(task),
                                      1,
                                      updatedTask
                                    );
                                    updateListTask(newTasks);
                                  };
                                  incrementTaskAmount(task);
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
                                  setInputTaskDescriptionUpdateValue(
                                    task.description
                                  );
                                  setInputTaskEndDateUpdateValue(task.endDate);
                                }}
                              />
                              <RiDeleteBin5Line
                                onClick={() => {
                                  taskDelete(task.id).then((result) => {
                                    if (result) {
                                      //What you do is update the temporary list with the ids that are different from the one you clicked on so you don't have to delete them.
                                      //of the temporary list so as not to have problems
                                      updateListTask(
                                        Tasks.filter((c) => c.id != task.id)
                                      );
                                    }
                                  });
                                }}
                                size={40}
                                style={{
                                  marginTop: "10px",
                                  marginLeft: "10px",
                                }}
                                className="deleteIcon"
                              />
                            </div>
                          </Flex>
                        </div>
                      </div>
                    );
                  }
                )}
          </div>
        </div>
      </div>
      <div className="menu-container">
        <Flex>
          <h1 className="h1c1" style={{ cursor: "default" }}>
            Menu
          </h1>
          <div style={{ width: "130px" }}></div>
          <DarkMode toggleTheme={toggleTheme} user={user!} />
        </Flex>
        <h2 className="h2c1" style={{ cursor: "default" }}>
          TASKS
        </h2>
        <div
          className="Tasks mb"
          onClick={() => handleTaskClick("Non Started", Status.NonStarted)}
        >
          <Flex>
            <IoIosTimer size={30} />
            <p
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              Non Started
            </p>
            <div style={{ width: "85px" }}></div>
            <div className="BoxNumberCount">
              <p>
                {Tasks.filter((st) => st.status == Status.NonStarted)
                  .map((sta) => sta.status)
                  .length.toString()}
              </p>
            </div>
          </Flex>
        </div>
        <div
          className="Tasks mb"
          onClick={() => handleTaskClick("In progress", Status.InProgress)}
        >
          <Flex>
            <FaRegPlayCircle size={30} />
            <p
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              In progress
            </p>
            <div style={{ width: "90px" }}></div>
            <div className="BoxNumberCount">
              <p>
                {Tasks.filter((st) => st.status == Status.InProgress)
                  .map((sta) => sta.status)
                  .length.toString()}
              </p>
            </div>
          </Flex>
        </div>
        <div
          className="Tasks mb"
          onClick={() => handleTaskClick("Paused", Status.Paused)}
        >
          <Flex>
            <PiPauseDuotone size={30} />
            <p
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              Paused
            </p>
            <div style={{ width: "114px" }}></div>
            <div className="BoxNumberCount">
              <p>
                {Tasks.filter((st) => st.status == Status.Paused)
                  .map((sta) => sta.status)
                  .length.toString()}
              </p>
            </div>
          </Flex>
        </div>
        <div
          className="Tasks mb"
          onClick={() => handleTaskClick("Late", Status.Late)}
        >
          <Flex>
            <IoCalendarOutline size={30} />
            <p
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              Late{" "}
            </p>
            <div style={{ width: "133px" }}></div>
            <div className="BoxNumberCount">
              <p>
                {Tasks.filter((st) => st.status == Status.Late)
                  .map((sta) => sta.status)
                  .length.toString()}
              </p>
              {""}
            </div>
          </Flex>
        </div>
        <div
          className="Tasks mb"
          onClick={() => handleTaskClick("Finished", Status.Finished)}
        >
          <Flex>
            <FaRegCheckCircle size={30} />
            <p
              style={{
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              Finished
            </p>
            <div style={{ width: "107px" }}></div>
            <div className="BoxNumberCount">
              <p>
                {Tasks.filter((st) => st.status == Status.Finished)
                  .map((sta) => sta.status)
                  .length.toString()}
              </p>
            </div>
          </Flex>
        </div>
        <Dialog
          style={{ overflow: "visible" }}
          cancelButton="Cancel"
          confirmButton="Create"
          header="Add Task"
          trigger={
            <Button
              content="Add Task"
              styles={{
                ":hover": {
                  backgroundColor: "#6F00FF",
                  color: "white",
                },
                height: "60px",
              }}
              size="medium"
            />
          }
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
                <label htmlFor="inputField">Title:</label>
                <Input
                  id="inputField"
                  fluid
                  maxLength="30"
                  value={inputTaskTitleValue}
                  onChange={({}, data) =>
                    setInputTitleTaskValue(data?.value ?? "")
                  }
                  placeholder="Write the task title"
                />
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "1em",
                    color: "#888",
                    textAlign: "right",
                  }}
                >
                  {inputTaskTitleValue.length}/30
                </div>
              </Flex>
              <Flex gap="gap.small">
                <label htmlFor="inputField">Description:</label>
                <TextArea
                  fluid
                  resize="vertical"
                  rows={4}
                  maxLength="200"
                  id="inputField"
                  value={inputTaskDescriptionValue}
                  onChange={({}, data) =>
                    setInputTaskDescriptionValue(data?.value ?? "")
                  }
                  placeholder="Write the task description"
                />
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "1em",
                    color: "#888",
                    textAlign: "right",
                  }}
                >
                  {inputTaskDescriptionValue.length}/200
                </div>
              </Flex>
              <div>
                <Flex gap="gap.small">
                  <label>End Date:</label>
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
              toast.warning("The task can not have a empty title.");
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
            } else if (statusValue == "Finished") {
              statusAdd = Status.Finished;
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
          {tempCategories.map((category) => {
            return (
              <div
                style={{ display: "flex", position: "relative" }}
                onClick={() => {}}
              >
                <Flex>
                  <Tooltip
                    dismissOnContentMouseEnter
                    autoSize
                    trigger={
                      <p
                        className="category-title"
                        key={category.id}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category.title}
                      </p>
                    }
                    content={
                      <div
                        style={{
                          maxWidth: "100px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {category.title}
                      </div>
                    }
                  ></Tooltip>

                  <Dialog
                    cancelButton="Cancel"
                    confirmButton="Update"
                    header="Update Category"
                    trigger={
                      <MdModeEdit
                        onClick={() => setSelectedCategory(category)}
                        size={20}
                        style={{ marginTop: "10px", marginLeft: "90px" }}
                        className="editIcon"
                      />
                    }
                    content={
                      <div>
                        <label htmlFor="UpdateField">Title:</label>
                        <Input
                          fluid
                          maxLength="30"
                          id="UpdateField"
                          value={inputCategoryUpdateValue}
                          onChange={({}, data) =>
                            setinputCategoryUpdateValue(data?.value ?? "")
                          }
                          placeholder="Update the category title "
                        />
                        <div
                          style={{
                            marginTop: "4px",
                            fontSize: "1em",
                            color: "#888",
                            textAlign: "right",
                          }}
                        >
                          {inputCategoryUpdateValue?.length}/30
                        </div>
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
                        updateListTask( Tasks.map((task) => ({
                        ...task,
                        categories: task.categories.map((cat) =>
                          cat.id === updatedCategory.id
                            ? { ...cat, title: updatedCategory.title }
                            : cat
                        ),
                      })));
                    }}
                    onCancel={() => setinputCategoryUpdateValue(category.title)}
                  />
                  {/* Dialog that we manually control if it is opne or not to have a  header button to close normally it */}
                  <Dialog
                    //It will now if the dialog must be open or not depends on the variable of the hook
                    open={CategoryDeleteDialogOpen}
                    //I prefer not having backgorund and you can see the app normally
                    backdrop={false}
                    header="Delete Category (Click  the X to close out)"
                    //Close Icon were we update  the state that control if it is open and we close it
                    headerAction={{
                      icon: <CloseIcon />,
                      title: "Close",
                      onClick: () => setCategoryDeleteDialogOpen(false),
                    }}
                    content={
                      <div>
                        <label
                          style={{ fontSize: "22px" }}
                          htmlFor="UpdateField"
                        >
                          Do you want to delete the category {category.title}?
                        </label>
                      </div>
                    }
                    //I create a footer in which we can have 2 buttons that do the diferents delete options
                    // In the final of the action of the button we close it
                    footer={{
                      children: () => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Button
                            content="Delete only Category"
                            primary
                            onClick={() => {
                              categoryDelete(category.id, true).then(
                                (result) => {
                                  if (result) {
                                    setTempCategories((cat) =>
                                      cat.filter((c) => c.id !== category.id)
                                    );
                                    updateListTask(
                                      Tasks.map((task) => ({
                                        ...task,
                                        categories: task.categories?.filter(
                                          (c) => c.id !== category.id
                                        ),
                                      }))
                                    );
                                    setCategoryDeleteDialogOpen(false);
                                  }
                                }
                              );
                            }}
                          />
                          <Button
                            content="Delete Category and Tasks"
                            secondary
                            onClick={() => {
                              categoryDelete(category.id, false).then(
                                (result) => {
                                  if (result) {
                                    setTempCategories((cat) =>
                                      cat.filter((c) => c.id !== category.id)
                                    );
                                    updateListTask(
                                      Tasks.filter(
                                        (task) =>
                                          !task.categories?.some(
                                            (c) => c.id === category.id
                                          )
                                      )
                                    );
                                    setCategoryDeleteDialogOpen(false);
                                  }
                                }
                              );
                            }}
                          />
                        </div>
                      ),
                    }}
                  />
                  {/* I set the state to open the dialog to true so this makes the dialog execute
                   and selected the category that will depend in  which you click*/}
                  <RiDeleteBin5Line
                    onClick={() => {
                      setSelectedCategory(category);
                      setCategoryDeleteDialogOpen(true);
                    }}
                    size={20}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    className="deleteIcon"
                  />
                  <div
                    className="BoxNumberCount"
                    style={{ marginLeft: "10px" }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {Tasks.filter((sta) =>
                        sta.categories.some((cat) => cat.id === category.id)
                      ).length.toString()}
                    </span>
                  </div>
                </Flex>
              </div>
            );
          })}
        </div>
        <Dialog
          cancelButton="Cancel"
          confirmButton="Create"
          header="Add Category"
          trigger={
            <Button
              content="Add  Category"
              styles={{
                ":hover": {
                  backgroundColor: "#6F00FF",
                  color: "white",
                },
              }}
            />
          }
          content={
            <div>
              <label htmlFor="inputField">Title:</label>
              <Input
                fluid
                maxLength="30"
                id="inputField"
                value={inputCategoryValue}
                onChange={({}, data) =>
                  setInputCategoryValue(data?.value ?? "")
                }
                placeholder="Write the category title"
              />
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "1em",
                  color: "#888",
                  textAlign: "right",
                }}
              >
                {inputCategoryValue.length}/30
              </div>
            </div>
          }
          onConfirm={() => {
            if (!inputCategoryValue || inputCategoryValue.trim() === "") {
              toast.warning("The category can not have a empty title");
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
          {tempTags.map((tag) => {
            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Flex>
                  <Tooltip
                    dismissOnContentMouseEnter
                    autoSize
                    trigger={
                      <p
                        className="category-title"
                        key={tag.id}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag.title}
                      </p>
                    }
                    content={
                      <div
                        style={{
                          maxWidth: "100px",
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                        }}
                      >
                        {tag.title}
                      </div>
                    }
                  ></Tooltip>

                  <Dialog
                    cancelButton="Cancel"
                    confirmButton="Update"
                    header="Update Tag"
                    trigger={
                      <MdModeEdit
                        onClick={() => setSelectedTag(tag)}
                        size={20}
                        style={{ marginTop: "10px", marginLeft: "90px" }}
                        className="editIcon"
                      />
                    }
                    content={
                      <div>
                        <label htmlFor="UpdateField">Título:</label>
                        <Input
                          fluid
                          maxLength="30"
                          id="UpdateField"
                          value={inputTagUpdateValue}
                          onChange={({}, data) =>
                            setinputTagUpdateValue(data?.value ?? "")
                          }
                          placeholder="Update the tag title"
                        />
                        <div
                          style={{
                            marginTop: "4px",
                            fontSize: "1em",
                            color: "#888",
                            textAlign: "right",
                          }}
                        >
                          {inputTagUpdateValue?.length}/30
                        </div>
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
                      //Update the list while mapping the Task and 
                      updateListTask(Tasks.map (task =>({
                        ...task,
                        //update the array of tags when id are the same and desstruct the titleand updated it 
                        tags:task.tags.map((tag)=> tag.id == updatedTag.id ?{...tag,title:updatedTag.title} : tag)
                      })));
                    }}
                    onCancel={() => setinputTagUpdateValue(tag.title)}
                  />
                  <Dialog
                    //It will now if the dialog must be open or not depends on the variable of the hook
                    open={TagDeleteDialogOpen}
                    //I prefer not having backgorund and you can see the app normally
                    backdrop={false}
                    header="Delete Tag (Click the X to close out)"
                    //Close Icon were we update  the state that control if it is open and we close it
                    headerAction={{
                      icon: <CloseIcon />,
                      title: "Close",
                      onClick: () => setTagDeleteDialogOpen(false),
                    }}
                    content={
                      <div>
                        <label
                          style={{ fontSize: "22px" }}
                          htmlFor="UpdateField"
                        >
                          Do you want to delete the tag {tag.title}?
                        </label>
                      </div>
                    }
                    //We create a footer in which we can have 2 buttons that do the diferents delete options
                    // In the final of the action of the button we close it
                    footer={{
                      children: () => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "1rem",
                          }}
                        >
                          <Button
                            content="Delete only tag"
                            primary
                            onClick={() => {
                              tagDelete(tag.id, true).then((result) => {
                                if (result) {
                                  setTempTags((tagg) =>
                                    tagg.filter((t) => t.id !== tag.id)
                                  );
                                  updateListTask(
                                    Tasks.map((task) => ({
                                      ...task,
                                      tags: task.tags?.filter(
                                        (t) => t.id !== tag.id
                                      ),
                                    }))
                                  );
                                  setTagDeleteDialogOpen(false);
                                }
                              });
                            }}
                          />
                          <Button
                            content="Delete tag and Tasks"
                            secondary
                            onClick={() => {
                              tagDelete(tag.id, false).then((result) => {
                                if (result) {
                                  setTempTags((tagg) =>
                                    tagg.filter((T) => T.id !== tag.id)
                                  );
                                  updateListTask(
                                    Tasks.filter(
                                      (task) =>
                                        !task.tags?.some((t) => t.id === tag.id)
                                    )
                                  );
                                  setTagDeleteDialogOpen(false);
                                }
                              });
                            }}
                          />
                        </div>
                      ),
                    }}
                  />
                  {/* We set the state to open the dialog to true so this makes the dialog execute
                   and selected the tag that will depend in  which you click*/}
                  <RiDeleteBin5Line
                    onClick={() => {
                      setSelectedTag(tag);
                      setTagDeleteDialogOpen(true);
                    }}
                    size={20}
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                    className="deleteIcon"
                  />
                </Flex>
                <div className="BoxNumberCount" style={{ marginLeft: "10px" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {Tasks.filter((task) =>
                      task.tags.some((tagg) => tagg.id == tag.id)
                    ).length.toString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Dialog
          cancelButton="Cancel"
          confirmButton="Create"
          header="Add Tag"
          trigger={
            <Button
              content="Add Tag"
              styles={{
                ":hover": {
                  backgroundColor: "#6F00FF",
                  color: "white",
                },
              }}
            />
          }
          content={
            <div>
              <label htmlFor="inputField">Título:</label>
              <Input
                id="inputField"
                fluid
                maxLength="30"
                value={inputTagValue}
                onChange={({}, data) => setInputTagValue(data?.value ?? "")}
                placeholder="Write the tag title"
              />
              <div
                style={{
                  marginTop: "4px",
                  fontSize: "1em",
                  color: "#888",
                  textAlign: "right",
                }}
              >
                {inputTagValue.toString().length}/30
              </div>
            </div>
          }
          onConfirm={() => {
            if (!inputTagValue || inputTagValue.trim() === "") {
              toast.warning("The tag can not have a empty title");
              return;
            }
            const idTemp = uuidv4();
            tagAdd(idTemp, inputTagValue, user?.id!!);
            const newTag = {
              id: idTemp,
              title: inputTagValue,
              idUser: user?.id!!,
            };
            setInputTagValue("");
            //We update the array by adding the new tag we have created at the end of the array.
            setTempTags([...tempTags, newTag]);
          }}
          onCancel={() => setInputTagValue("")}
        />
        <div className="footer">
          <Dialog
            confirmButton="Ok"
            header="Calendar"
            trigger={
              <div className="Tasks mb">
                <Flex>
                  <FaRegCalendarAlt size={20} />
                  <p>Calendar </p>
                </Flex>
              </div>
            }
            content={
              <div>
                <Datepicker
                  onDateChange={(_, v) => {
                    alert(
                      Tasks.filter((t) => t.endDate == v?.value.toDateString())
                        .length > 0
                        ? `The tasks for the day(${v!.value.toDateString()}) are: ${Tasks.filter(
                            (t) => t.endDate == v?.value.toDateString()
                          ).map((t) => t.title)}.`
                        : `The are no task avalaible at day (${v?.value.toDateString()})`
                    );
                  }}
                  today={new Date()}
                  buttonOnly
                  popup={{
                    trigger: (
                      <Button title="Click to Open" content="Click to Open" />
                    ),
                  }}
                />
              </div>
            }
          />
          <div className="Tasks Signout" onClick={logout}>
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
