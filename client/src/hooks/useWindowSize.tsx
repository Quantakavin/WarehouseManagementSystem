import { useState, useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { Close } from "../app/reducers/SidebarSlice";

const getWindowSize = () => {
  const { innerWidth: viewportwidth, innerHeight: viewportheight } = window;
  return {
    viewportwidth,
    viewportheight
  };
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
      if (getWindowSize().viewportheight < 800) {
        dispatch(Close())
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;