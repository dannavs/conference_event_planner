import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
        {
        img: "https://images.thdstatic.com/productImages/94f88328-7ea3-4cc9-87cb-bd3e9ca5b961/svn/lukyamzn-projectors-ph012lt003-64_600.jpg",
        name: "Projectors",
        cost: 200,
        quantity: 0,
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnhjP1HdOXS9vTTi1x9vEkMbcYu883F64UBQ&s",
        name: "Speaker",
        cost: 35,
        quantity: 0,
    },
    {
        img: "https://m.media-amazon.com/images/I/61ROUTUhseL._AC_UF894,1000_QL80_.jpg",
        name: "Microphones",
        cost: 45,
        quantity: 0,
    },
    {
        img: "https://lh3.googleusercontent.com/proxy/r0df19ZQBLj38RfmoLx6I0E4aorodIxsba7znaT2ebJKUZhxBMYB7ulSf8ODFGahqdYsD5OOKvga4OcPSM_ymyDuxs-XpSk0r3Dggm9GafQB6IUKd6uwBT-xaepzLBUXTQ12vXC_ZxMT44S54cNzZ2exPaZZWMfAGacPlymF5xxOh1sI",
        name: "Whiteboards",
        cost: 80,
        quantity: 0,
    },

    {
        img: "https://cdn.shopify.com/s/files/1/0248/8198/7665/products/conferenceroom12_2048x.jpeg?v=1733973600",
        name: "Signage",
        cost: 80,
        quantity: 0,
    },

  ],


  reducers: {
    incrementAvQuantity: (state, action) => {
        const item = state[action.payload];
        if (item) {
            item.quantity++;
        }
    },
    decrementAvQuantity: (state, action) => {
        const item = state[action.payload];
        if (item && item.quantity > 0) {
            item.quantity--;
        }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;