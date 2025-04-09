import { createSlice } from "@reduxjs/toolkit";

const initState = {
  activeTab: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState: { ...initState },
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    resetCategorySection: (state) => {
      state = { ...initState };
      return state;
    },
  },
});

export const { setActiveTab, resetCategorySection } = categorySlice.actions;
export default categorySlice.reducer;
