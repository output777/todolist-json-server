import {useState} from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handleer = (e) => {
    const {value} = e.target;
    setValue(value);
  };
  return [value, handleer];
};

export default useInput;
