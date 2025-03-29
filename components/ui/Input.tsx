import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      {...props}
    />
  );
};
