import React from "react";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  value?: string | number;
  defaultValue?: string | number;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  defaultValue,
  required,
  disabled,
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative my-2.5 ${className}`}>
      <select
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      >
        <option value="" disabled hidden />
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all
        before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white
        peer-required:after:content-['\\00a0*'] peer-required:after:text-pink-500
        peer-valid:-top-2 peer-valid:text-xs
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500
        peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        {label}
      </label>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default Select;
