export default function Checkbox({
  label,
  darkMode = false,
  ...props
}) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        {...props}
      />
      <span className={`ml-3 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );
}