import clsx from "clsx";
import { kebabCase } from "lodash";

export default function Checkbox({
  inputName,
  label,
  checked,
  onChange,
  disabled
}: {
  inputName: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        id={kebabCase(inputName)}
        name={inputName}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="appearance-none h-5 w-5 rounded-sm border border-300 checked:bg-blue-600 checked:border-transparent focus:ring-blue-500"
      />
      <label
        htmlFor={kebabCase(inputName)}
        className={clsx(
          "text-700")}
      >
        {label}
      </label>
    </div>
  );
}
