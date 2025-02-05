import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
      </div>
    </div>
  );
};

export default Loader;
