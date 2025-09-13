import style from "./select-input.module.css";
import FieldLabel from "./field-label";

export function SelectInput({
  id,
  onChange,
  disabled,
  hasError,
  className,
  value,
  options = [],
  placeholder = "Izaberite opciju...",
  ...rest
}) {
  return (
    <select
      id={id}
      onChange={(e) => onChange(e.target.value, id)}
      disabled={disabled}
      className={`${style.selectInput} ${
        hasError ? style.hasError : ""
      } ${className}`}
      value={value}
      {...rest}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function SelectInputField({
  id,
  onChange,
  disabled,
  hasError,
  className,
  inputClassName,
  value,
  label,
  bottomText,
  options,
  placeholder,
  ...rest
}) {
  return (
    <FieldLabel
      id={id}
      label={label}
      bottomText={bottomText}
      hasError={hasError}
      displayLabel
      className={className}
      disabled={disabled}
    >
      <SelectInput
        id={id}
        onChange={onChange}
        disabled={disabled}
        hasError={hasError}
        className={inputClassName}
        value={value}
        options={options}
        placeholder={placeholder}
        {...rest}
      />
    </FieldLabel>
  );
}
