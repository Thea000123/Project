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

   // Error Messages
  messages: {
    required: 'This field cannot be empty',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    minLength: (length) => `Must be at least ${length} characters`,
    maxLength: (length) => `Cannot exceed ${length} characters`,
    min: (min) => `Value cannot be less than ${min}`,
    max: (max) => `Value cannot be greater than ${max}`,
    pattern: 'Invalid format',
    cardNumber: 'Please enter a valid card number',
    cvv: 'CVV must be at least 3 digits',
    expiry: 'Please enter a valid expiry date（MM/YY）'
  },

  // Validate a single field
  validateField(field) {
    const name = field.name || field.id;
    const value = field.type === 'checkbox' ? field.checked : field.value;
    const rules = field.dataset.validate ? field.dataset.validate.split('|') : [];
    const errors = [];

    for (const rule of rules) {
      const [ruleName, ruleParam] = rule.split(':');
      
      let isValid = true;
      
      switch (ruleName) {
        case 'required':
          isValid = this.rules.required(value);
          break;
        case 'email':
          isValid = this.rules.email(value);
          break;
        case 'phone':
          isValid = this.rules.phone(value);
          break;
        case 'minLength':
          isValid = this.rules.minLength(value, parseInt(ruleParam));
          break;
        case 'maxLength':
          isValid = this.rules.maxLength(value, parseInt(ruleParam));
          break;
        case 'min':
          isValid = this.rules.min(value, parseFloat(ruleParam));
          break;
        case 'max':
          isValid = this.rules.max(value, parseFloat(ruleParam));
          break;
        case 'pattern':
          isValid = this.rules.pattern(value, ruleParam);
          break;
        case 'cardNumber':
          isValid = this.rules.cardNumber(value);
          break;
        case 'cvv':
          isValid = this.rules.cvv(value);
          break;
        case 'expiry':
          isValid = this.rules.expiry(value);
          break;
      }

      if (!isValid) {
        let message = this.messages[ruleName];
        if (typeof message === 'function') {
          message = message(ruleParam);
        }
        errors.push(message);
      }
    }

    return errors;
  },
