import { useDispatch } from 'react-redux';
import { addLocation, removeLocation, fetchCities } from '../redux/locationsSlice';

export const useLocationsUpdate = () => {
  const dispatch = useDispatch();

  const addLocationToList = (city, country) => {
    const locationString = `${city}, ${country}`;
    dispatch(addLocation(locationString));
  };

  const removeLocationFromList = (city, country) => {
    const locationString = `${city}, ${country}`;
    dispatch(removeLocation(locationString));
  };

  const refreshLocations = () => {
    dispatch(fetchCities());
  };

  return {
    addLocationToList,
    removeLocationFromList,
    refreshLocations
  };
}; 