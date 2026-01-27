import { useContext, useEffect, useState } from "react";
import FormContext from "./FormCont";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { theme, handleTheme } = useContext(FormContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtasks: "",
    dueDate: "",
    priority: "",
  });

  // const [savedData, setSavedData] = useState([]);
  // const [tableData, setTableData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5050/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      navigate("/all-tasks");

      alert("Task added successfully!");

      setFormData({
        title: "",
        description: "",
        subtasks: "",
        dueDate: "",
        priority: "",
      });
    } catch (error) {
      alert("internal errror");
    }
  };

  return (
    <>
      <form action="Form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="bg-emerald-500 text-2xl text-[20px] text-white m-2 rounded-[7px]"
          onClick={handleTheme}
        >
          Change Theme
        </button>

        <div>
          <h1 className="p-9 ml-30 font-bold text-[30px]">New Task</h1>
          <p className="ml-40 text-xl font-medium">Title</p>
          <div className="pt-5">
            <input
              className="font-bold border-1 rounded-2xl h-[35px] ml-40 w-[700px] p-2"
              type="text"
              name="title"
              placeholder="e.g, Design a new landing"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <h1 className="ml-40 pt-5 text-xl font-medium">Description</h1>
          <div className="pt-5">
            <textarea
              className="font-bold border-1 h-[190px] rounded-2xl ml-40 w-[700px] p-2"
              name="description"
              placeholder="Add more details about the task"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col">
              <h1 className="ml-40 text-xl font-medium">Due date</h1>
              <input
                className="font-bold border-1 w-[270px] rounded-2xl ml-40 p-2"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="ml-40 text-xl font-medium">Priority</h1>
              <select
                className="font-bold border-1 w-[270px] rounded-2xl ml-40 p-2"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="">No Priority</option>
                <option value="Low">Low</option>
                <option value="mid">Mid</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <h1 className="ml-40 pt-5 text-xl font-medium">Subtasks</h1>
          <div className="pt-5">
            <textarea
              className="font-bold border-1 h-[190px] rounded-2xl ml-40 w-[700px] p-2"
              name="subtasks"
              placeholder="Add more details about the task"
              value={formData.subtasks}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="space-x-11 ml-169 text-blue-400">
            <button type="reset">CANCEL</button>
            <button type="submit"> SAVE TASK</button>
          </div>
        </div>
      </form>
    </>
  );
};
export default Form;
