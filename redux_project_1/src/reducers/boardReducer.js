import {
    FETCH_FOOD_LIST,
    FETCH_BOARD_DETAIL,
    FETCH_BOARD_INSERT,
    FETCH_BOARD_UPDATE,
    FETCH_BOARD_UPDATE_OK,
    FETCH_BOARD_DELETE,
    FETCH_BOARD_LIST
} from "../actions/types";
import {RESET} from "../actions/types";

/*
    Map => {}
    List => []
    vo => {}
    String => ''

    const {isLoading, isError, data, refetch:함수} = useQuery({
        async() => await axios...
    })
 */

const boardState = {
    board_list: {}, // Map
    board_detail: {}, // BoardEntity
    board_update: {},
    result: ''
}

export default function boardReducer(state = boardState, action) {
    switch (action.type) {
        case FETCH_BOARD_LIST:
            return {
                ...state,
                board_list: action.payload
            }
        case FETCH_BOARD_INSERT:
            return {
                ...state,
                result: action.payload
            }
        case RESET:
            return {
                ...state,
                result: action.payload
            }
        case FETCH_BOARD_DETAIL:
            return {
                ...state,
                board_detail: action.payload
            }
        case FETCH_BOARD_UPDATE:
            return {
                ...state,
                board_update: action.payload
            }
        case FETCH_BOARD_UPDATE_OK:
            return {
                ...state,
                result: action.payload
            }
        default:
            return state
    }
}