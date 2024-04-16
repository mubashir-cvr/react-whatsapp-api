import React from 'react';
import Select from 'react-select';



const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '10px',
      border: state.isFocused ? 'none' : '1px solid rgb(131, 24, 67)',
      outline: state.isFocused ? 'none':'none',
      '&:hover': {
        outline: 'none',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '10px',
      backgroundColor: state.isSelected ? '#e3e3e3' : state.isFocused ? '#e3e3e3' : 'white',
      color: state.isSelected ? 'rgb(131, 24, 67)' : state.isFocused ? 'rgb(131, 24, 67)' : 'rgb(131, 24, 67)',
     
    }),
  };

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];



const SearchSelect = () => {
  const handleChange = (selectedOption) => {
    console.log('Selected:', selectedOption);
  };

  return (
    <Select className='w-64'
      options={options}
      onChange={handleChange}
      isSearchable={true}
      placeholder="Select..."
      styles={customStyles}
    />
  );
};

export default SearchSelect;