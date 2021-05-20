import React from "react";

const ErrorIcon = "fas fa-exclamation";

const AlertTemplate = ({ style, options, message, close }) => {
  return (
    <>
      <div
        style={style}
        className={`text-white px-6 py-4 border-0 rounded relative mb-4 ${
          options.type === "info" ? "bg-lightBlue-500" : null
        } ${options.type === "success" ? "bg-emerald-500" : null} ${
          options.type === "error" ? "bg-red-500" : null
        }`}
      >
        <span className="text-xl inline-block mr-5 align-middle">
          <i
            className={`${options.type === "info" ? "fas fa-info" : null} ${
              options.type === "success" ? "fas fa-check" : null
            } ${options.type === "error" ? "fas fa-exclamation" : null}`}
          />
        </span>
        <span className="inline-block align-middle mr-8">
          <b className="capitalize">{message}</b>
        </span>
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none px-2"
          onClick={close}
        >
          <span>×</span>
        </button>
      </div>
    </>
  );
};

export default AlertTemplate;
