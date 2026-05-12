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

  // Display field errors
  showFieldError(field, errors) {
    // Support both .form-group (generic) and checkout-specific selectors
    const formGroup = field.closest('.form-group, .co-form-group, .co-card-box > div');

    // Always apply error class to the field itself
    field.classList.remove('input-error');
    field.classList.add('input-error');
    field.style.boxShadow = '0 0 0 2px #ef4444';
    field.style.background = '#fff1f1';

    // Remove old inline error if exists
    const oldError = field.parentNode.querySelector('.form-error');
    if (oldError) oldError.remove();

    // Inject error message below the field
    if (errors.length > 0) {
      const errorElement = document.createElement('span');
      errorElement.className = 'form-error';
      errorElement.style.cssText = 'display:block;font-size:0.72rem;color:#ef4444;margin-top:3px;';
      errorElement.textContent = errors[0];
      // Insert after the field (or after its parent wrapper if inside .co-input-with-btn)
      const insertTarget = field.closest('.co-input-with-btn') || field;
      insertTarget.parentNode.insertBefore(errorElement, insertTarget.nextSibling);
    }
  },

  // Clear field errors
  clearFieldError(field) {
    field.classList.remove('input-error');
    field.style.boxShadow = '';
    field.style.background = '';

    const oldError = field.parentNode.querySelector('.form-error');
    if (oldError) oldError.remove();

    // Also check wrapper parent
    const wrapper = field.closest('.co-input-with-btn');
    if (wrapper) {
      const wrapperError = wrapper.parentNode.querySelector('.form-error');
      if (wrapperError) wrapperError.remove();
    }
  },

  // Validate entire form
  validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    let isValid = true;
    const fields = form.querySelectorAll('input, select, textarea');

    fields.forEach(field => {
      const errors = this.validateField(field);
      
      if (errors.length > 0) {
        isValid = false;
        this.showFieldError(field, errors);
      } else {
        this.clearFieldError(field);
      }
    });

    return isValid;
  },

  // Initialise form validation
  initForm(formId, options = {}) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Real-time validation
    const fields = form.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
      // Validate on blur (when field loses focus)
      field.addEventListener('blur', () => {
        const errors = this.validateField(field);
        if (errors.length > 0) {
          this.showFieldError(field, errors);
        } else {
          this.clearFieldError(field);
        }
      });

       // Clear errors on input
      field.addEventListener('input', () => {
        this.clearFieldError(field);
      });
    });


    // form submition
    form.addEventListener('submit', (e) => {
      if (!this.validateForm(formId)) {
        e.preventDefault();
        Toast.show('Please check that the form is filled in correctly', 'error');
      } else if (options.onSubmit) {
        e.preventDefault();
        options.onSubmit(new FormData(form));
      }
    });
  },

  // Format card number (space-separated every 4 digits)
  formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = formatted;
    return formatted;
  },

   // Format expiry date
  formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + ' / ' + value.substring(2, 4);
    }
    input.value = value;
    return value;
  }
};

// Export for global use
window.Validation = Validation;