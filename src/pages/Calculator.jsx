import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApi } from '@/hooks/useApi';
import { carbonService } from '@/api/services/carbonService';
import CarbonCalculatorForm from '@/components/features/calculator/CarbonCalculatorForm';
import ResultsDisplay from '@/components/features/calculator/ResultsDisplay';
import Loading from '@/components/common/Loading';
import ErrorMessage from '@/components/common/ErrorMessage';

export default function Calculator() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { loading, execute } = useApi(carbonService.calculateCarbon, null, false);

  const handleCalculate = async (formData) => {
    debugger;
    setError(null);
    try {
      const data = await execute(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to calculate carbon footprint');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.carbonCalculator}
        </h1>

        {loading && <Loading />}
        {error && <ErrorMessage message={error} darkMode={darkMode} />}

        <CarbonCalculatorForm onSubmit={handleCalculate} loading={loading} />

        {result && <ResultsDisplay data={result} />}
      </div>
    </div>
  );
}