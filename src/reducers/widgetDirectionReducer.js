const widgetDirectionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_DIR_ACTION':
            return {
                ...state, ...action.payload,
            }
        default:
            return state
    }
}
export default widgetDirectionReducer;