import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk('fetchdata/post', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data
})


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: [],
        loading: false,
        isDataGot: false,
    },
    reducers: {
        setIsDataGot: (state, action) => {
            state.isDataGot = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(fetchData.rejected, (state) => {
            state.loading = false;
        })
    } 
})

export const {setIsDataGot} = dataSlice.actions;
export default dataSlice.reducer;