import React from 'react';
import { BounceLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <BounceLoader size={90} color="#72a24d" />
    </div>
  );
};

export default Spinner;
