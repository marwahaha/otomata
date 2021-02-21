import { combineReducers } from 'redux';
import widgetDirectionReducer from './widgetDirectionReducer';
import widgetPositionReducer from './widgetPositionReducer';
export default combineReducers({
    widgetPositionReducer, widgetDirectionReducer
});