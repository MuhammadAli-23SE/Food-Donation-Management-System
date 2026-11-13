import React from 'react';

/**
 * Reusable Textarea Component
 */
export default function Textarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const textareaId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`w-full rounded-lg border text-sm text-slate-900 bg-white px-3.5 py-2.5 transition-colors resize-y
          ${error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
            : 'border-slate-300 hover:border-slate-400 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700'
          }
          focus:outline-none disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed`}
        {...props}
      />

      {error ? (
        <p className="mt-1 text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
}
