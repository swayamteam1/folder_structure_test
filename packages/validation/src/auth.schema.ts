export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateLoginPayload(payload: any): ValidationResult {
  const errors: Record<string, string> = {};
  if (!payload?.email || !/\S+@\S+\.\S+/.test(payload.email)) {
    errors.email = 'Valid email is required';
  }
  if (!payload?.password || payload.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateRegisterPayload(payload: any): ValidationResult {
  const { errors } = validateLoginPayload(payload);
  if (!payload?.name || payload.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
