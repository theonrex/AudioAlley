import React from "react";
import Select from "react-select";
import styled from "styled-components";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    borderRadius: 0,
    backgroundColor: state.isFocused ? "#eee" : "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#000" : "#fff",
    color: state.isSelected ? "#fff" : "#000",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#000",
  }),
};

const CustomSelect = ({ options }) => {
  return (
    <StyledSelect
      options={options}
      styles={customStyles}
      defaultValue={options[0]}
    />
  );
};

const StyledSelect = styled(Select)`
  width: 200px;
`;

export default CustomSelect;
