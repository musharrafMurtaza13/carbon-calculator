import { useState } from 'react';
import { Truck, Ship, Plane, Train, Package, Snowflake, MapPin, PlusCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Checkbox from '@/components/common/Checkbox';
import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import { validateField } from '@/utils/validation';
import LocationAutocomplete from '@/components/common/LocationAutocomplete';
export default function CarbonCalculatorForm({ onSubmit, loading = false }) {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    quantity: '',
    unit: 'pallets',
    tonnesPerUnit: '',
    cooledTransport: false,
    transportMode: '',
    fuelTypes: {
      diesel: false,
      cng: false,
      bev: false,
      hvo: false
    },
    origin: '',
    destination: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [showValidation, setShowValidation] = useState(false); // Only show errors after submit attempt

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name] && showValidation) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    if (showValidation) {
      const error = validateField(fieldName, formData[fieldName], formData);
      if (error) {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
      }
    }
  };

  const handleTransportMode = (mode) => {
    setFormData(prev => ({
      ...prev,
      transportMode: mode,
      fuelTypes: {
        diesel: false,
        cng: false,
        bev: false,
        hvo: false
      }
    }));
    setTouched(prev => ({ ...prev, transportMode: true }));
    if (showValidation) {
      setErrors(prev => ({ ...prev, transportMode: '', fuelTypes: '' }));
    }
  };

  const handleFuelTypeChange = (fuelType) => {
    setFormData(prev => ({
      ...prev,
      fuelTypes: {
        ...prev.fuelTypes,
        [fuelType]: !prev.fuelTypes[fuelType]
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = 'Quantity is required and must be greater than 0';
    }

    if (!formData.tonnesPerUnit || formData.tonnesPerUnit <= 0) {
      newErrors.tonnesPerUnit = 'Tonnes per unit is required and must be greater than 0';
    } else if (formData.tonnesPerUnit > 1000) {
      newErrors.tonnesPerUnit = 'Tonnes per unit seems too high';
    }

    if (!formData.transportMode) {
      newErrors.transportMode = 'Please select a transport mode';
    }

    if (formData.transportMode === 'truck') {
      const hasFuelType = Object.values(formData.fuelTypes).some(value => value);
      if (!hasFuelType) {
        newErrors.fuelTypes = 'Please select at least one fuel type for truck transport';
      }
    }

    if (!formData.origin || formData.origin.trim().length < 2) {
      newErrors.origin = 'Origin location is required';
    }

    if (!formData.destination || formData.destination.trim().length < 2) {
      newErrors.destination = 'Destination location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setShowValidation(true); // Enable validation display

    setTouched({
      quantity: true,
      tonnesPerUnit: true,
      transportMode: true,
      origin: true,
      destination: true
    });

    if (validateForm()) {
      try {
        await onSubmit(formData);
      } catch (error) {
        setGeneralError(error.message || 'Failed to calculate carbon footprint');
      }
    }
  };

  const transportModes = [
    { id: 'truck', icon: Truck, label: 'Truck' },
    { id: 'ship', icon: Ship, label: 'Ship' },
    { id: 'plane', icon: Plane, label: 'Plane' },
    { id: 'train', icon: Train, label: 'Train' },
    { id: 'intermodal', icon: Package, label: 'Intermodal' }
  ];

  const unitOptions = [
    { value: 'pallets', label: t.pallets },
    { value: 'containers', label: t.containers },
    { value: 'boxes', label: t.boxes },
    { value: 'pieces', label: t.pieces }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && <ErrorMessage message={generalError} darkMode={darkMode} />}

      {/* First Section - Quantity, Unit, Tonnes */}
      <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Input
            label={t.quantity}
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            onBlur={() => handleBlur('quantity')}
            error={showValidation ? errors.quantity : ''}
            touched={touched.quantity && showValidation}
            darkMode={darkMode}
            placeholder={t.enterQuantity}
            required
          />

          <Select
            label={t.unit}
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            options={unitOptions}
            darkMode={darkMode}
            required
          />

          <Input
            label={t.tonnesPerUnit}
            type="number"
            name="tonnesPerUnit"
            value={formData.tonnesPerUnit}
            onChange={handleChange}
            onBlur={() => handleBlur('tonnesPerUnit')}
            error={showValidation ? errors.tonnesPerUnit : ''}
            touched={touched.tonnesPerUnit && showValidation}
            darkMode={darkMode}
            placeholder="t"
            step="0.01"
            required
          />
        </div>

        {/* Cooled Transport Checkbox */}
        <Checkbox
          name="cooledTransport"
          label={t.cooledTransport}
          checked={formData.cooledTransport}
          onChange={handleChange}
          darkMode={darkMode}
        />
      </div>

      {/* Transport Mode Section */}
      <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <label className={`block text-sm font-semibold mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {t.chooseTransport} <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap gap-4 items-center mb-4">
          {/* Truck with Fuel Types */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleTransportMode('truck')}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 transition ${formData.transportMode === 'truck'
                  ? 'border-blue-700 bg-blue-700'
                  : darkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-blue-400'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
            >
              <Truck size={28} className={formData.transportMode === 'truck' ? 'text-white' : darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>

            {/* Fuel Type Checkboxes */}
            {formData.transportMode === 'truck' && (
              <div className="flex items-center bg-blue-700 rounded-full px-4 py-2 space-x-3 flex-wrap">
                {['diesel', 'cng', 'bev', 'hvo'].map((fuelType) => (
                  <label key={fuelType} className="flex items-center text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.fuelTypes[fuelType]}
                      onChange={() => handleFuelTypeChange(fuelType)}
                      className="w-4 h-4 mr-2 rounded"
                    />
                    <span className="text-xs font-medium uppercase">{fuelType}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Other Transport Modes */}
          {transportModes.slice(1).map(({ id, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleTransportMode(id)}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg border-2 transition ${formData.transportMode === id
                  ? 'border-blue-600 bg-blue-50'
                  : darkMode
                    ? 'border-gray-600 bg-gray-700 hover:border-blue-400'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
            >
              <Icon size={28} className={formData.transportMode === id ? 'text-blue-600' : darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
          ))}
        </div>

        {showValidation && errors.transportMode && (
          <p className="text-red-500 text-sm mb-2">{errors.transportMode}</p>
        )}
        {showValidation && errors.fuelTypes && formData.transportMode === 'truck' && (
          <p className="text-red-500 text-sm">{errors.fuelTypes}</p>
        )}
      </div>

      {/* Origin and Destination Section */}
      <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="space-y-4">
          <LocationAutocomplete
            label="Origin Location"
            placeholder="Search origin city..."
            value={formData.origin}
            onChange={(val) => {
              setFormData(prev => ({ ...prev, origin: val }));
              if (errors.origin && showValidation) {
                setErrors(prev => ({ ...prev, origin: '' }));
              }
            }}
            onSelect={(location) => {
              console.log('Selected origin:', location);
              setFormData(prev => ({
                ...prev,
                origin: `${location.name}, ${location.country}`,
                originCoords: { lat: location.latitude, lng: location.longitude }
              }));
            }}
            error={showValidation ? errors.origin : ''}
            touched={touched.origin && showValidation}
            required
          />

          <LocationAutocomplete
            label="Destination Location"
            placeholder="Search destination city..."
            value={formData.destination}
            onChange={(val) => {
              setFormData(prev => ({ ...prev, destination: val }));
              if (errors.destination && showValidation) {
                setErrors(prev => ({ ...prev, destination: '' }));
              }
            }}
            onSelect={(location) => {
              console.log('Selected destination:', location);
              setFormData(prev => ({
                ...prev,
                destination: `${location.name}, ${location.country}`,
                destinationCoords: { lat: location.latitude, lng: location.longitude }
              }));
            }}
            error={showValidation ? errors.destination : ''}
            touched={touched.destination && showValidation}
            required
          />
        </div>

        <button type="button" className={`mt-4 flex items-center font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <PlusCircle size={20} className="mr-2" />
          {t.addRoute}
        </button>
      </div>

      {/* Calculate Button */}
      <div className="text-center">
        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="bg-pink-500 hover:bg-pink-600 px-12 py-4"
        >
          {t.calculate}
        </Button>
      </div>
    </form>
  );
}