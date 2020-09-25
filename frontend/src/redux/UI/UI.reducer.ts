import * as Types from './UI.types';

const INITIAL_STATE = {
    reduxWorks: false,
};

const reducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case Types.GET_CATEGORIES_BEGIN:
            return {
                reduxWorks: true
            }

        default:
            return state;
    }

};

export default reducer;