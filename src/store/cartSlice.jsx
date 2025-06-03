import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isCartOpen:false,

}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{

        toggleCart(state){
            state.isCartOpen=!state.isCartOpen;
        }
    }
})

export const {
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
