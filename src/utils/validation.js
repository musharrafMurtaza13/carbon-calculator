export const validateField = (fieldName, value, formData = {}) => {
  let error = '';

  switch (fieldName) {
    case 'quantity':
      if (!value || value <= 0) {
        error = 'Quantity must be greater than 0';
      }
      break;
    
    case 'tonnesPerUnit':
      if (!value || value <= 0) {
        error = 'Tonnes per unit must be greater than 0';
      } else if (value > 1000) {
        error = 'Tonnes per unit seems too high';
      }
      break;
    
    case 'transportMode':
      if (!value) {
        error = 'Please select a transport mode';
      }
      break;
    
    case 'origin':
      if (!value || value.trim().length < 2) {
        error = 'Please enter a valid origin location';
      }
      break;
    
    case 'destination':
      if (!value || value.trim().length < 2) {
        error = 'Please enter a valid destination location';
      }
      break;
    
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
      break;
  }

  return error;
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};

  requiredFields.forEach(field => {
    const error = validateField(field, formData[field], formData);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};