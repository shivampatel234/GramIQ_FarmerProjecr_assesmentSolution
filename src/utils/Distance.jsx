// import { getDistance } from "geolib";

// export const calculateDistance = (lat, lon) => {
//   const fixedPoint = {
//     latitude: 21.2400895,
//     longitude: 78.9099647,
//   };

//   return getDistance(
//     { latitude: lat, longitude: lon },
//     fixedPoint
//   ); // distance in meters
// };

import { getDistance } from "geolib";

export const calculateDistance = (lat, lon) => {
  const fixedPoint = {
    latitude: 21.2400895,
    longitude: 78.9099647,
  };

  const distanceInMeters = getDistance(
    { latitude: lat, longitude: lon },
    fixedPoint
  );

  return distanceInMeters / 1000; // returns KM
};
