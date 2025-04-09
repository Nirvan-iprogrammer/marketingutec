import { createSlice } from "@reduxjs/toolkit";

const initState = {
  masterCategories: [],
  masterSKUs: [],
  allCategories: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: { ...initState },
  reducers: {
    setMasterCategories: (state, { payload }) => {
      state.masterCategories = payload;
    },
    setMasterSKU: (state, { payload }) => {
      state.masterSKUs = payload;
    },
    setAllCategories: (state, { payload }) => {
      state.allCategories = payload;
    },
  },
});

export const { setMasterCategories, setMasterSKU, setAllCategories } =
  productSlice.actions;
export default productSlice.reducer;
