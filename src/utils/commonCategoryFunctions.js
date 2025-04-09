import toast from "react-hot-toast";
export const getAllChilds = (dataSet, key) => {
  let result = [];
  try {
    if (dataSet?.length && key) {
      const matchingItem = dataSet?.find((item) => item.key === key);
      if (matchingItem) {
        result = matchingItem?.sub_filters;
      }
    }
  } catch (error) {
    toast.error(error.message);
  }

  return result;
};
