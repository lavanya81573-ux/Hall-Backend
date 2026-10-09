import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [selectedHallIds, setSelectedHallIds] = useState([]);

  const toggleCompareHall = (hallId) => {
    setSelectedHallIds((prev) => {
      if (prev.includes(hallId)) {
        return prev.filter((id) => id !== hallId);
      } else {
        if (prev.length >= 4) {
          alert('You can compare a maximum of 4 halls side-by-side.');
          return prev;
        }
        return [...prev, hallId];
      }
    });
  };

  const removeHallFromCompare = (hallId) => {
    setSelectedHallIds((prev) => prev.filter((id) => id !== hallId));
  };

  const clearCompare = () => {
    setSelectedHallIds([]);
  };

  return (
    <CompareContext.Provider
      value={{
        selectedHallIds,
        toggleCompareHall,
        removeHallFromCompare,
        clearCompare,
        compareCount: selectedHallIds.length
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
