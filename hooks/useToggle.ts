import {useState} from 'react';

export const useToggle = (t = false) => {
  const [state, change] = useState(t);
  const toggle = () => change(s => !s);

  return {state, toggle};
};
