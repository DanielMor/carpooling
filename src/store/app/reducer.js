import moment from 'moment';
import driversList from '../../data/drivers';
import colorsList from '../../data/colors';

const driversData = driversList
  .sort((a, b) => a.order - b.order)
  .map((d, i) => {
    return {
      ...d,
      id: i,
      colors: colorsList[i],
    };
  });

const initialState = {
  trips: {},
  startOrder: moment('2018-10-08'),
  drivers: driversData,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TRIP':
      return {
        ...state,
        trips: {
          ...state.trips,
          [action.day]: {
            driverOfDay: action.driverOfDay,
            driverOfWeek: action.driverOfWeek,
            day: action.day,
          }
        }
      };

    default:
      return state;
  }
}
