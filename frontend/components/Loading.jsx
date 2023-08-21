import React from "react";
import { Oval, ThreeDots } from "react-loader-spinner";

// Oval
// Three Dots

const Loading = ({ type = "dots" }) => (
  <div className="absolute top-[30%] left-[46%] z-50">
    {type === "dots" ? (
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="#f4a700"
        ariaLabel="three-dots-loading"
        wrapperStyle=""
        wrapperClassName=""
      />
    ) : (
      <Oval
        height="100"
        width="100"
        radius="9"
        color="#f4a700"
        ariaLabel="oval-loading"
        wrapperStyle=""
        wrapperClassName=""
      />
    )}
  </div>
);


export default Loading;