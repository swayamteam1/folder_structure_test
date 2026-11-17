export function validateUserUpdatePayload(payload) {
  const errors = {};
  if (payload.email && !/\S+@\S+\.\S+/.test(payload.email)) {
    errors.email = 'Valid email format is required';
  }
  if (payload.name && payload.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
