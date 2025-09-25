import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState ={
    data:[],
    status:'idle',
    error:null,
}

export const fetchData = createAsyncThunk(
    'filter/fetchData',
    async (_,{rejectWithValue})=>{
        try{
            const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
            return res.data

        }catch(err){
            return rejectWithValue(err?.response.status || err.message)
        }finally{
            console.log('Api ran')
        }

    }
)

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(fetchData.pending, (state)=>{
            state.status = 'Pending'
        })
        builder.addCase(fetchData.fulfilled, (state,action)=>{
            state.status = 'Fulfilled'
            state.data = action.payload
        })
        builder.addCase(fetchData.rejected, (state,action)=>{
            state.status = 'Rejected'
            state.error = action.payload || action.error.message
        })
    }
})

export default filterSlice.reducer