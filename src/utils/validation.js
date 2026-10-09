export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^[0-9+\s-]{10,15}$/;
  return phoneRegex.test(phone);
};

export const validateBookingForm = (formData) => {
  const errors = {};
  if (!formData.hallId) errors.hallId = 'Please select a hall';
  if (!formData.startDate) errors.startDate = 'Start date is required';
  if (!formData.endDate) errors.endDate = 'End date is required';
  if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
    errors.endDate = 'End date must be on or after start date';
  }
  if (!formData.guestCount || formData.guestCount <= 0) {
    errors.guestCount = 'Guest count must be at least 1';
  }
  if (!formData.eventType) errors.eventType = 'Event type is required';
  if (!formData.contactName) errors.contactName = 'Contact name is required';
  if (!formData.contactEmail || !isValidEmail(formData.contactEmail)) {
    errors.contactEmail = 'Valid email is required';
  }
  if (!formData.contactPhone || !isValidPhone(formData.contactPhone)) {
    errors.contactPhone = 'Valid 10-digit phone number is required';
  }
  return errors;
};
