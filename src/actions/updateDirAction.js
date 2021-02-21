export const updateDirAction = (idx, dir) => dispatch => {
    dispatch({
        type: 'UPDATE_DIR_ACTION',
        payload: { [idx]: dir }
    })
}