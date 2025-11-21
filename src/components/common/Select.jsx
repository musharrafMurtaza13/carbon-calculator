export default function Select({
  label,
  options,
  error,
  touched,
  darkMode = false,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className={`block text-sm font-semibold mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {label}
          {props.required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
        } ${error && touched ? 'border-red-500' : ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}