import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { addtaskapi,deletetaskapi, fetchtodolist } from "../tasks/taskAPI.js";


export const fetchtasks = createAsyncThunk(
    "task/fetch", 
    async () =>{
     return await fetchtodolist();
    }
);


export const addtask = createAsyncThunk(
    "task/add",
    async (taskdata) => {
        return await addtaskapi(taskdata);
    }
);

export const deletetask = createAsyncThunk(
    "task/delete",
    async (id) => {
        return await deletetaskapi(id);
    }
);

const initialState = {
  list: [],       
  loading: false, 
  error: null,    
};


const taskslice = createSlice ({
name:"task",
initialState,
reducers:{},

extraReducers :(builder) => {
builder

.addCase(fetchtasks.pending,(state)=>{
          state.loading = true;
})

.addCase(fetchtasks.fulfilled,(state , action)=>{
          state.loading = false,
          state.list = action.payload;
})

.addCase(fetchtasks.rejected,(state,action)=>{
    state.loading = false;
    state.error = action.error.message;
})


.addCase(addtask.fulfilled,(state,action)=>{
    state.list.push(action.payload)

.addCase(deletetask.fulfilled,(state,action)=>{
    
    deletedId = action.payload;

    state.list = state.list.filter((_,index)=> index !== deletedId)
});   
});
}
})

export default taskslice.reducer;

