import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { FieldError } from "@/components/field-error";

export function PhoneField({
  label,
  required,
  value,
  onChange,
  error,
  placeholder,
  defaultCountry = "PK",
  className = "",
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  defaultCountry?: any;
  className?: string;
}) {
  return (
    <div className={className} data-error={error ? "true" : undefined}>
      <label className="text-sm font-semibold text-ink">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div
        className={`mt-2 phone-field-wrap flex items-center h-11 px-3 rounded-lg border bg-surface-2 text-sm focus-within:bg-surface focus-within:border-primary transition-colors ${
          error ? "border-destructive/70" : "border-border"
        }`}
      >
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry}
          value={value || undefined}
          onChange={(v) => onChange(v ?? "")}
          placeholder={placeholder ?? "Enter phone number"}
          className="w-full min-w-0"
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

export { isValidPhoneNumber };
