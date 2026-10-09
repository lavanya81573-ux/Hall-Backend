import { MOCK_HALLS, HALL_NAME } from '../utils/constants';

export const hallService = {
  async getAllHalls() {
    return MOCK_HALLS;
  },

  async getHallById(id) {
    return MOCK_HALLS.find(h => h.id === id || h.slug === id) || MOCK_HALLS[0];
  },

  async searchHalls(query) {
    if (!query) return MOCK_HALLS;
    const q = query.toLowerCase();
    return MOCK_HALLS.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
  }
};
