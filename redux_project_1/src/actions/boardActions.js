/*
    React : 화면 구현 => MVC 구조의 view => 화면 UI
            Redux 동작
            1) 사용자 요청
                dispatch(함수 호출)
                        | action 등록된 함수
                => useEffect(() => {})
                => reducer를 호출하기 위해서는 반드시 dispatch
                    => Vuex : action을 호출 => commit()
            2) action 함수는 axios => 서버를 연결
                | 실제 사용자가 요청한 데이터를 서버로부터 읽기
            3) reducer로 전송
               ------- state에 저장
                        | state / props / 지역 변수
                                            | 필요시에만 사용 => 사라진다 (HTML에 전송이 불가능)
                                    | component => component로 데이터 전송
                                      => <App> => <List> =>
                                           | => 매개변수 전송할 때 사용
                                          <List name="">
                            | 변경이 가능 => HTML에 적용
            4) 저장 state => store에 저장
                            | 전역 변수 => 모든 component에서 공유
            store => 단방향 => 양방향

            Redux =>
                단점 : 사용이 복잡
                장점 : 분업화, 데이터 관리 / 화면 출력
                      재사용이 가능, 파일 분리
                => 보완
                    react-query => tanstack-query
                                    : typescript
 */
import {
    FETCH_FOOD_LIST,
    FETCH_BOARD_DETAIL,
    FETCH_BOARD_INSERT,
    FETCH_BOARD_UPDATE,
    FETCH_BOARD_UPDATE_OK,
    FETCH_BOARD_DELETE,
    FETCH_BOARD_LIST, RESET
} from "./types";
import axios from "axios";

export const boardListActions = (page) => dispatch => {
    axios.get(`http://localhost/board/list_react/${page}`).then((response) => {
        const action = {
            type: FETCH_BOARD_LIST,
            payload: response.data
        }
        // reduce로 전송 => store에 저장
        dispatch(action);
    })
}

export const boardInsertionActions = (insertData) => dispatch => {
    axios({
        method: 'post',
        baseURL: 'http://localhost',
        url: '/board/insert_react',
        data: insertData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        const action = {
            type: FETCH_BOARD_INSERT,
            payload: response.data
        }
        dispatch(action);
    })
}

export const boardResetActions = () => dispatch => {
    const action = {
        type: RESET,
        payload: ''
    }
    dispatch(action);
}

export const boardDetailActions = (no) => dispatch => {
    axios.get(`http://localhost/board/detail_react/${no}`).then((response) => {
        const action = {
            type: FETCH_BOARD_DETAIL,
            payload: response.data
        }
        dispatch(action);
    })
}

export const boardUpdateActions = (no) => dispatch => {
    axios.get(`http://localhost/board/update_react/${no}`).then((response) => {
        const action = {
            type: FETCH_BOARD_UPDATE,
            payload: response.data
        }
        dispatch(action);
    })
}

export const boardUpdateOkActions = (updateData) => dispatch => {
    axios({
        method: 'put',
        baseURL: 'http://localhost',
        url: '/board/update_react_ok',
        data: updateData,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        const action = {
            type: FETCH_BOARD_UPDATE_OK,
            payload: response.data
        }
        dispatch(action);
    })
}



















