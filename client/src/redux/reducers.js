import { combineReducers } from 'redux';

function userInfo(state = {}, action) {
	switch (action.type) {
		case 'SET_USER_INFO':
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

export default combineReducers({
	userInfo
})