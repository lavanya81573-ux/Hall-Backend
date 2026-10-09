export const bookingService = {
  async createBooking(bookingData) {
    return {
      id: `HB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString().split('T')[0],
      ...bookingData
    };
  }
};
