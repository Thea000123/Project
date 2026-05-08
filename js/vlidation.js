/**
 * Pure JavaScript Version
 */

const Validation = {
  rules: {
    required: (value) => {
      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      return value !== null && value !== undefined;
    },

    email: (value) => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },

    phone: (value) => {
      if (!value) return true;
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      return phoneRegex.test(value);
    },

    minLength: (value, length) => {
      if (!value) return true;
      return value.length >= length;
    },

    maxLength: (value, length) => {
      if (!value) return true;
      return value.length <= length;
    },

    min: (value, min) => {
      if (!value) return true;
      return parseFloat(value) >= min;
    },
    
    max: (value, max) => {
      if (!value) return true;
      return parseFloat(value) <= max;
    },

    pattern: (value, regex) => {
      if (!value) return true;
      return new RegExp(regex).test(value);
    },

    cardNumber: (value) => {
      if (!value) return true;
      const cleaned = value.replace(/\s/g, '');
      return /^\d{13,19}$/.test(cleaned);
    },

    cvv: (value) => {
      if (!value) return true;
      return /^\d{3,4}$/.test(value);
    },

    expiry: (value) => {
      if (!value) return true;
      const expiryRegex = /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/;
      return expiryRegex.test(value);
    }
  },
