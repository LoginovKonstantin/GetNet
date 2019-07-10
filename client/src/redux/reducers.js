import { combineReducers } from 'redux';

// function dataHasErrored(state = false, action) {
//   switch (action.type) {
//       case ReduxActionType.DATA_HAS_ERRORED:
//           return action.hasErrored;
//       default:
//           return state;
//   }
// }

// function dataIsLoading(state = false, action) {
//   switch (action.type) {
//       case ReduxActionType.DATA_IS_LOADING:
//           return action.isLoading;
//       default:
//           return state;
//   }
// }

function increment(state = {value: 0}, action) {
  switch (action.type) {
      case 'INCREMENT':
          
          return Object.assign({}, state, {
            value: state.value + 1
          });
      default:
          return state;
  }
}

export default combineReducers({ 
  increment
 })