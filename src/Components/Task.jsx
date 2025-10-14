import React, { useEffect, useState } from "react";
import { Input } from "@base-ui-components/react/input";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";


const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  // Load tasks from localStorage 
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setTasks(storedData);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPriorityStyle = (priority) => {
    switch (priority?.toLowerCase()) {
      case "low":
        return { bgcolor: "#dcfce7", color: "#166534" };
      case "mid":
      case "medium":
        return { bgcolor: "#fef9c3", color: "#854d0e" };
      case "high":
        return { bgcolor: "#fee2e2", color: "#b91c1c" };
      default:
        return { bgcolor: "#e5e7eb", color: "#374151" };
    }
  };

  const getProgressWidth = (status) => {
    switch ((status || "").toLowerCase()) {
      case "beginning":
        return "20%";
      case "in progress":
        return "50%";
      case "near complition":
        return "80%";
      case "completed":
        return "100%";
      default:
        return "0%";
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((ele, idx) => idx !== index);
    setTasks(updatedTasks);
    localStorage.setItem("formData", JSON.stringify(updatedTasks));
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [PriorityFilter, setPriorityFilter] = useState("");
  const [StatusFilter, setStatusFilter] = useState("");
  const [DateFilter, setDateFilter] = useState("");

  const ResetFilter = () => {
    setPriorityFilter("");
    setStatusFilter("");
    setDateFilter("");
    setSearch("");
  };

  //filter for pr,st,date
  const Filter = tasks.filter((task) => {
    const matchPriority = PriorityFilter
      ? task.priority?.toLowerCase() === PriorityFilter.toLowerCase()
      : true;

    const matchStatus = StatusFilter
      ? task.status?.toLowerCase() === StatusFilter.toLowerCase()
      : true;

    const matchDate = DateFilter
      ? task.date === DateFilter || task.dueDate === DateFilter
      : true;

    return matchPriority && matchStatus && matchDate;
  });

  function handleSearch() {
    let currentTask = [];
    currentTask = tasks.filter((task) => task.title === search);
    setTasks(currentTask);
  }

  return (
    <Box sx={{ ml: 6, mr: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#111827", letterSpacing: "-0.5px" }}
        >
          All Tasks
        </Typography>

        <div className="border-2 h-8 w-[250px] rounded-[14px] border-gray-300 bg-white flex items-center justify-between pl-2">
          <IconButton onClick={handleSearch}> <SearchIcon /></IconButton>
          <Input
            className={" h-8 w-[210px]  outline-0 pr-2"}
            placeholder="Search tasks"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </Box>

      {/* Filters Section */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          border: "1px solid #d1d5db",
          borderRadius: "10px",
          p: 1,
          alignItems: "center",
          mb: 3,
          bgcolor: "#fff",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={PriorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            defaultValue=""
            label="Priority"
            sx={{ backgroundColor: "#f3f4f6", height: 40, }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Mid">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={StatusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            defaultValue=""
            label="Status"
            sx={{ backgroundColor: "#f3f4f6", height: 40 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Beginning">Beginning</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <input
          className="border-1 w-50 h-9 rounded-[10px] text-gray-500 bg-gray-200 p-3"
          type="date"
          name="DueDate"
          value={DateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <IconButton onClick={ResetFilter}>
          <ReplayIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "10px",
              px: 3,
              py: 0.7,
              fontWeight: 500,
              "&:hover": { backgroundColor: "#fecaca" },
            }}
          >
            Delete
          </Button>
        </Box>
      </Stack>

      {/* Table Section */}
      <TableContainer
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          bgcolor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#f3f4f6" }}>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Task</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Progress</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Filter.length > 0 ? (
              Filter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                (task, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Checkbox />
                    </TableCell>

                    <TableCell sx={{ fontWeight: 500, color: "#1f2937" }}>
                      {task.title || "Untitled"}
                    </TableCell>

                    <TableCell>{formatDate(task.dueDate)}</TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: "9999px",
                          display: "inline-block",
                          fontSize: "0.875rem",
                          ...getPriorityStyle(task.priority),
                        }}
                      >
                        {task.priority || "No Priority"}
                      </Box>
                    </TableCell>

                   
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
    
                        <Box
                          sx={{
                            width: 96,
                            height: 8,
                            bgcolor: "#e5e7eb",
                            borderRadius: "9999px",
                            mr: 1,
                            overflow: "hidden",
                          }}
                        >
                        
                          <Box
                            sx={{
                              height: 8,
                              bgcolor:
                                task.status?.toLowerCase() === "completed"
                                  ? "#16a34a"
                                  : task.status?.toLowerCase() === "near complition"
                                  ? "#f59e0b"
                                  : "#047857",
                              borderRadius: "9999px",
                              width: getProgressWidth(task.status),
                              transition: "width 0.4s ease",
                            }}
                          />
                        </Box>

                        {/* Progress label */}
                        <Box sx={{ color: "#4b5563", fontSize: "0.875rem" }}>
                          {task.status
                            ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
                            : "Not Started"}
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => navigate(`/edit/${index}`)}>
                        <InfoIcon sx={{ color: "#f59e0b" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={Filter.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: "1px solid #e5e7eb",
            "& .MuiTablePagination-displayedRows": { fontSize: "0.9rem" },
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default Task;
