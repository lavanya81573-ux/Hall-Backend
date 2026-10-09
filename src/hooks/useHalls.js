import { useBookingContext } from '../context/BookingContext';

export const useHalls = () => {
  const { halls, addHall, updateHall, deleteHall } = useBookingContext();

  const getHallById = (id) => {
    return halls.find(h => h.id === id || h.slug === id);
  };

  const filterHalls = (filters = {}) => {
    let result = [...halls];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
    }
    if (filters.maxPrice) {
      result = result.filter(h => h.pricePerDay <= filters.maxPrice);
    }
    if (filters.minCapacity) {
      result = result.filter(h => h.capacity >= filters.minCapacity);
    }
    return result;
  };

  return {
    halls,
    getHallById,
    filterHalls,
    addHall,
    updateHall,
    deleteHall
  };
};
