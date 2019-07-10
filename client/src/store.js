import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './redux/reducers';

const configureStore = createStore(
	mainReducer,
	compose(
		applyMiddleware(thunk),
		process.env.NODE_ENV !== 'production' &&
			window.devToolsExtension ? window.devToolsExtension() : f => f
	)
);

export default configureStore;