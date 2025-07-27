import React from 'react';

const ScreenReaderSupport = ({ text }) => {
  return <span className="sr-only">{text}</span>;
};

export default ScreenReaderSupport;
