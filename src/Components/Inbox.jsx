import React, { useEffect, useState } from 'react'
import {Typography,Grid} from "@mui/material";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
const Inbox = () => {
    const [tasks, setTasks] = useState([]);

  // Fetch tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));


 const [selectedCard, setSelectedCard] = useState(0);
const cards = [
  
  {
    id: 1,
    title: 'Total Tasks',
    description: '  0',
  },
  {
    id: 2,
    title: ' Completed vs Pending',
    description: '0/0',
  },
  {
    id: 3,
    title: 'Overdue Tasks ',
    description: '0',
  },
];

  return (
    <div className='m-3 p-4 flex flex-col  justify-center w-full  '>

    <div className='flex flex-row justify-between m-8'>
        <div className=''>

        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#111827", letterSpacing: "-0.5px",  }}
        >
          Inbox
        </Typography>
      <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#111827", letterSpacing: "-0.5px", marginTop:"9px"}}
        >
         Quick States / Overview
        </Typography>
    </div>
    <div >
       <Button size="large" sx={{backgroundColor:"#DCFCE7", color:"green"}} >DAILY</Button>
        <Button size="large" sx={{backgroundColor:"#F3F4F6", color:"gray"}} >WEEKLY</Button>
    </div>
        </div>

      <div className='flex flex-row m-3 space-x-6  items-center justify-between   '>
    
 {cards.map((card, index) => (
        <Card  sx={{borderRadius:"20px"}}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              width:"400px",
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            <CardContent sx={{ height: '170px', width:"300px",  margin:"7px", }}>
              <Typography variant="h5" component="div" sx={{paddingRight:"20px"}}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))  }
      </div>
      <div className='w-full h-30 bg-[#F5F5F5]  rounded-[20px] p-5 mt-3 space-y-2'>
        <div className='flex justify-between'>
        <h1 className='text-[27px]'>Task Completed</h1>
        <h1>NaN%</h1>
        </div>
        <BorderLinearProgress variant="determinate" value={0}  />
      </div>
       <div className='flex flex-col  mt-5 p-2 space-y-5 '><h1>ALL TASK</h1>
      <div className='w-120 h-50  rounded-[20px] border-1 border-solid'>
         <h1 className='flex justify-center pt-17 text-[25px] font-bold'>No Task Today</h1>
      </div>
       </div> 
       <div className='flex flex-col  mt-5 p-2 space-y-5'>
        <h1>Upcoming / Due Soon</h1>
        <div className='w-90 h-20 bg-[#F5F5F5]  rounded-[20px] flex flex-col justify-start p-4  '>
          <h1 className='font-bold'></h1>
          <h1>Due Tomorrow</h1>
        </div>
       </div>
    </div>

  )
}

export default Inbox
