export const reportService = {
  async getRevenueData() {
    return [
      { month: 'Jan', revenue: 145000, bookings: 6 },
      { month: 'Feb', revenue: 190000, bookings: 8 },
      { month: 'Mar', revenue: 230000, bookings: 10 },
      { month: 'Apr', revenue: 175000, bookings: 7 },
      { month: 'May', revenue: 260000, bookings: 11 },
      { month: 'Jun', revenue: 310000, bookings: 14 },
      { month: 'Jul', revenue: 280000, bookings: 12 },
      { month: 'Aug', revenue: 340000, bookings: 15 },
      { month: 'Sep', revenue: 390000, bookings: 17 },
      { month: 'Oct', revenue: 420000, bookings: 18 }
    ];
  },

  async getUtilizationData() {
    return [
      { hallName: 'Elite Hall - Grand Ballroom', occupancyRate: 88, totalHours: 420 },
      { hallName: 'Elite Hall - Executive Suite', occupancyRate: 75, totalHours: 310 },
      { hallName: 'Elite Hall - Royal Garden Pavilion', occupancyRate: 82, totalHours: 360 }
    ];
  }
};
