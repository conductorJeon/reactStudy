import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {boardDetailActions} from "../actions/boardActions";
import {Link} from "react-router";

function BoardDetail() {
    const {no} = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(boardDetailActions(no));
    }, []);

    const detail = useSelector((state) => state.boards.board_detail);
    if (!detail) {
        return null;
    }

    return (
        <div className="container">
            <div className="row">
                <h3 className="text-center">게시글 내용</h3>
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="text-center success" width={"20%"}번호></th>
                        <td className="text-center" width={"30%"}>{detail.no}</td>
                        <th className="text-center success" width={"20%"}>작성일</th>
                        <td className="text-center" width={"30%"}>{detail.regdate}</td>
                    </tr>
                    <tr>
                        <th className="text-center success" width={"20%"}>이름</th>
                        <td className="text-center" width={"30%"}>{detail.name}</td>
                        <th className="text-center success" width={"20%"}>조회수</th>
                        <td className="text-center" width={"30%"}>{detail.hit}</td>
                    </tr>
                    <tr>
                        <th className="text-center success" width={"20%"}>제목</th>
                        <td colSpan={3}>{detail.subject}</td>
                    </tr>
                    <tr>
                        <td colSpan={4} className={"text-left"} height={200} valign={"top"}>
                            <pre style={{"white-space": "pre-wrap"}}>{detail.content}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4} className={"text-right"}>
                            <Link to={"/board/update/" + detail.no} className={"btn-xs btn-primary"}>수정</Link>
                            <Link to={"/board/delete/" + detail.no} className={"btn-xs btn-warning"}>삭제</Link>
                            <Link to={"/board/list"} className={"btn-xs btn-info"}>목록</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BoardDetail;