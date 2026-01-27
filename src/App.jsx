  import { useState } from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import FormContext from "./Components/FormCont";

  import Layout from "./Components/Layout";
  import Inbox from "./Components/Inbox";
  import Task from "./Components/Task";
  import Form from "./Components/Form";
  import Edit from "./Components/Edit";

  function App() {
    const [theme, setTheme] = useState("white");
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("formData")) || []);

    const handleTheme = () => {
      setTheme(theme === "white" ? "black" : "white");
    };

    return (
      <FormContext.Provider value={{ theme, handleTheme, tasks, setTasks }}>
        <BrowserRouter>
          <div
            style={{
              backgroundColor: theme,
              color: theme === "white" ? "black" : "white",
              minHeight: "100vh",
            }}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Inbox />} />
                <Route path="all-tasks" element={<Task />} />
                <Route path="form" element={<Form />} />
                <Route path="edit/:index" element={<Edit />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </FormContext.Provider>
    );
  }

  export default App;
