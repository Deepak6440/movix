import { createSlice } from "@reduxjs/toolkit";


export const homeSlice = createSlice({
    name:'homeSlice',
    initialState:{
        url :{},
        genres:{}
    },
    reducers:{
        getAPiConfigurations : (state,action)=>{
            state.url = action.payload
        },
        getGenres : (state,action) =>{
            state.genres = action.payload
        }
    }
})

export default homeSlice.reducer;
export const {getAPiConfigurations, getGenres} = homeSlice.actions