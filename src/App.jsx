import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormContext from "./Components/FormCont";

import Layout from "./Components/Layout";
import Inbox from "./Components/Inbox";
import Task from "./Components/Task";
import Form from "./Components/Form";
import Edit from "./Components/Edit";

function App() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <FormContext.Provider value={{ theme, handleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inbox />} />
            <Route path="all-tasks" element={<Task />} />
            <Route path="form" element={<Form />} />
            <Route path="edit/:index" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FormContext.Provider>
  );
}

export default App;
