import React from 'react';
import { useSwipeable } from 'react-swipeable';

const SwipeGestures = ({ onSwipedLeft, onSwipedRight, children }) => {
  const handlers = useSwipeable({
    onSwipedLeft,
    onSwipedRight,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return <div {...handlers}>{children}</div>;
};

export default SwipeGestures;
