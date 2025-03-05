import React from "react";

type InputProps = {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  className?: string;
  error?: string;
};

export default function Input({
  id,
  type = "text",
  placeholder,
  onChange,
  ref,
  className,
  error,
}: InputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value);
  }

  return (
    <>
      <input
        id={id}
        ref={ref}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        className={`border
          ${error ? "border-red-500" : "border-slate-200"}
          py-1
          px-3
          rounded-md
          bg-slate-200  
          hover:border-slate-300
          hover:bg-slate-50
          focus:border-slate-300
          ${className}
          `}
      />
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </>
  );
}
