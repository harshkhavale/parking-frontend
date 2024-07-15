// src/utils/formatDate.js
export const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
      return date.toLocaleString('en-US', {
        weekday: 'short', // e.g., Mon
        year: 'numeric', // e.g., 2024
        month: 'short', // e.g., Jul
        day: 'numeric', // e.g., 15
        hour: 'numeric', // e.g., 3
        minute: 'numeric', // e.g., 14
        hour12: true, // e.g., AM/PM format
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };
  