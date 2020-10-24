const widgetPositionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_POS_ACTION':
            return {
                ...state, ...action.payload,
            }
        default:
            return state
    }
}
export default widgetPositionReducer;