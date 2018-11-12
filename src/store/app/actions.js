
export const ADD_TRIP = 'ADD_TRIP';

export function addTrip(day, driverOfDay, driverOfWeek) {
  return {
    type: ADD_TRIP,
    day,
    driverOfDay,
    driverOfWeek,
  }
}
