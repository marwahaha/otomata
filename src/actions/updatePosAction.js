export const updatePosAction = (idx, pos) => dispatch => {
    dispatch({
        type: 'UPDATE_POS_ACTION',
        payload: { [idx]: pos }
    })
}