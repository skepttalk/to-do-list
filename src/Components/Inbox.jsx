import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

const Inbox = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("formData")) || [];
    setTasks(storedTasks);
    console.log(storedTasks);
  }, []);

  // Styled progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#1a90ff",
    },
  }));

  // Stats
  const [selectedCard, setSelectedCard] = useState(0);
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [overdue, setOverdue] = useState(0);

  const [filterDate, setFilterDate] = useState("DAILY");

  // Filter and update task stats
  useEffect(() => {
    if (tasks.length === 0) {
      setTotal(0);
      setCompleted(0);
      setPending(0);
      setOverdue(0);
      return;
    }

    const today = new Date();
    let filteredTasks = [];

    if (filterDate === "DAILY") {
      filteredTasks = tasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return (
          taskDate.getDate() === today.getDate() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getFullYear() === today.getFullYear()
        );
      });
    } else if (filterDate === "WEEKLY") {
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

      filteredTasks = tasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      });
    }

    // Count tasks
    let totalCount = filteredTasks.length;
    let completedCount = 0;
    let pendingCount = 0;
    let overdueCount = 0;

    filteredTasks.forEach((task) => {
      if (new Date() > new Date(task.dueDate)) overdueCount++;
      if (task.status?.toLowerCase() === "completed") completedCount++;
      else pendingCount++;
    });

    setTotal(totalCount);
    setCompleted(completedCount);
    setPending(pendingCount);
    setOverdue(overdueCount);
  }, [filterDate, tasks]);

  // Cards data
  const cards = [
    { id: 1, title: "Total Tasks", description: total },
    { id: 2, title: "Completed vs Pending", description: `${completed}/${pending}` },
    { id: 3, title: "Overdue Tasks", description: overdue },
  ];

  return (
    <div className="m-3 p-4 flex flex-col justify-center w-full">
      {/* Header */}
      <div className="flex flex-row justify-between m-8">
        <div>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#111827", letterSpacing: "-0.5px" }}
          >
            Inbox
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#111827",
              letterSpacing: "-0.5px",
              marginTop: "9px",
            }}
          >
            Quick Stats / Overview
          </Typography>
        </div>

        {/* Filter Buttons */}
        <div>
          <Button
            size="large"
            sx={{
              backgroundColor:
                filterDate === "DAILY" ? "#DCFCE7" : "#F3F4F6",
              color: filterDate === "DAILY" ? "green" : "gray",
              mr: 1,
            }}
            onClick={() => setFilterDate("DAILY")}
          >
            DAILY
          </Button>
          <Button
            size="large"
            sx={{
              backgroundColor:
                filterDate === "WEEKLY" ? "#DCFCE7" : "#F3F4F6",
              color: filterDate === "WEEKLY" ? "green" : "gray",
            }}
            onClick={() => setFilterDate("WEEKLY")}
          >
            WEEKLY
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-row m-3 space-x-6 items-center justify-between">
        {cards.map((card, index) => (
          <Card key={card.id} sx={{ borderRadius: "20px" }}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                width: "400px",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": { backgroundColor: "action.selectedHover" },
                },
              }}
            >
              <CardContent sx={{ height: "170px", width: "300px", margin: "7px" }}>
                <Typography variant="h5" component="div" sx={{ paddingRight: "20px" }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-30 bg-[#F5F5F5] rounded-[20px] p-5 mt-3 space-y-2">
        <div className="flex justify-between">
          <h1 className="text-[27px]">Task Completed</h1>
          <h1>
            {total > 0 ? Math.round((completed / total) * 100) : 0}%
          </h1>
        </div>
        <BorderLinearProgress
          variant="determinate"
          value={total > 0 ? (completed / total) * 100 : 0}
        />
      </div>

      {/* All Tasks */}
      <div className="flex flex-col mt-5 p-2 space-y-5">
        <h1>ALL TASKS ({filterDate})</h1>
        <div className="w-120 h-50 rounded-[20px] border-1 border-solid p-4">
          {total === 0 ? (
            <h1 className="flex justify-center pt-17 text-[25px] font-bold">
              No Tasks Found
            </h1>
          ) : (
            tasks
              .filter((task) => {
                const taskDate = new Date(task.dueDate);
                const today = new Date();
                if (filterDate === "DAILY") {
                  return (
                    taskDate.getDate() === today.getDate() &&
                    taskDate.getMonth() === today.getMonth() &&
                    taskDate.getFullYear() === today.getFullYear()
                  );
                } else {
                  const startOfWeek = new Date(today);
                  startOfWeek.setDate(today.getDate() - today.getDay());
                  const endOfWeek = new Date(today);
                  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                  return taskDate >= startOfWeek && taskDate <= endOfWeek;
                }
              })
              .map((task, i) => (
                <p key={i}>
                  📝 {task.title || "Untitled"} —{" "}
                  <span>{task.status || "Pending"}</span>
                </p>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
