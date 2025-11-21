import { Truck, Ship, Plane, Train, Package } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function TransportModeSelector({ selectedMode, onSelect }) {
  const { darkMode } = useTheme();

  const modes = [
    { id: 'truck', icon: Truck, label: 'Truck' },
    { id: 'ship', icon: Ship, label: 'Ship' },
    { id: 'plane', icon: Plane, label: 'Plane' },
    { id: 'train', icon: Train, label: 'Train' },
    { id: 'intermodal', icon: Package, label: 'Intermodal' }
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {modes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg border-2 transition ${
            selectedMode === id
              ? 'border-blue-600 bg-blue-50'
              : darkMode
                ? 'border-gray-600 bg-gray-700 hover:border-blue-400'
                : 'border-gray-300 bg-white hover:border-blue-400'
          }`}
        >
          <Icon size={32} className={selectedMode === id ? 'text-blue-600' : darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <span className="text-xs mt-1 text-gray-600">{label}</span>
        </button>
      ))}
    </div>
  );
}