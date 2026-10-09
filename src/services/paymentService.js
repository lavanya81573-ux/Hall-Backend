export const paymentService = {
  async processPayment(amount, paymentMethod) {
    return {
      success: true,
      transactionId: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      amount,
      paymentMethod,
      timestamp: new Date().toISOString()
    };
  }
};
