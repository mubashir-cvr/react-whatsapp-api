import React from 'react';
import { SiPrintables } from 'react-icons/si';

const Loading = () => {
    return (
        <div className="flex w-full h-full justify-center items-center">
          <div className="loading-icon-container flex flex-col gap-6 w-62 items-center">
            <SiPrintables className="loading-icon text-pink-900 flex" />
            <div className="blinking-line rounded-lg bg-pink-900 flex"></div>
          </div>
        </div>
      );
};

export default Loading;