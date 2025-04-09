import React, { useState, useEffect } from "react";
import Select from "react-select";

const MultiSelectDropdown = (props) => {
  const {
    data,
    loadMoreOptions,
    handleChange,
    values,
    isLoading = false,
    placeholder,
    isMulti = true,
    isDisabled,
    isClearable = false,
    onInputChange,
    searchKey,
  } = props;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(data);
  }, [data]);

  useEffect(() => {
    loadMoreOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on component mount

  const handleScroll = (event) => {
    const { target } = event;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      loadMoreOptions();
    }
  };
  return (
    <Select
      {...props}
      isClearable={isClearable}
      isMulti={isMulti}
      options={options}
      isLoading={isLoading}
      onMenuScrollToBottom={handleScroll}
      onChange={(e) => handleChange({ e, isMulti })}
      styles={colorStyles}
      value={
        values?.length && options.filter((opt) => values?.includes(opt.id))
      }
      onInputChange={onInputChange}
      inputValue={searchKey}
      placeholder={placeholder || "Select option"}
      isDisabled={isDisabled || false}
      // Add other React-Select props as needed
    />
  );
};

export default MultiSelectDropdown;

const colorStyles = {
  control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled ? "#e9ecef" : "#FFFFFF",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)",
    border: 0,
    transition: "box-shadow 0.15s ease",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#8898aa",
    minHeight: "43px",
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#1A1919" : isDisabled ?"#e9ecef":"white",
      color: isFocused ? "#FFF" : "inherit",
      ":active": {
        backgroundColor: "#1A1919",
        color: "#FFF",
      },
      ":hover": {
        cursor: "pointer",
      },
    };
  },
  multiValue: (styles, state) => ({
    ...styles,
    backgroundColor: "#1A1919",
    color: "white",
    borderRadius: "5px",
    padding: 1,
  }),
  multiValueLabel: (styles, state) => ({
    ...styles,
    color: "white",
    fontSize: "0.875rem",
    fontWeight: "400",
    lineHeight: "1.5",
  }),
  multiValueRemove: (styles, state) => ({
    ...styles,
    color: "white",
    // ":hover": {
    //   backgroundColor: "#c9c9c9",
    // },
  }),
  indicatorSeparator: (styles, state) => ({
    ...styles,
    backgroundColor: "#ccc",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    cursor: "pointer",
  }),
};
