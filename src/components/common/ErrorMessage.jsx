export default function ErrorMessage({ message, darkMode = false }) {
  if (!message) return null;

  return (
    <div className={`border px-4 py-3 rounded ${
      darkMode ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-100 border-red-400 text-red-700'
    }`}>
      {message}
    </div>
  );
}