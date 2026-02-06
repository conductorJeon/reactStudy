import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {boardListActions} from "../actions/boardActions";
import {Link} from "react-router";

function BoardList() {
    const dispatch = useDispatch();
    const [curpage, setCurpage] = useState(1);

    useEffect(() => {
        dispatch(boardListActions(curpage));
    }, [curpage]);

    const board_list = useSelector((state) => state.boards.board_list.list);
    const totalpage = useSelector((state) => state.boards.board_list.totalpage);

    if (!board_list) {
        return null;
    }

    // 이벤트 처리
    const prev = () => {
        setCurpage(curpage > 1 ? curpage - 1 : curpage);
    }

    const next = () => {
        setCurpage(curpage < totalpage ? curpage + 1 : curpage);
    }

    return (
        <div className="container">
            <div className="row">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <Link to={"/board/insert"} className={"btn btn-sm btn-primary"}>새 글</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    <thead>
                        <tr className="danger">
                            <th className={"text-center"} width={"10%"}>번호</th>
                            <th className={"text-center"} width={"45%"}>제목</th>
                            <th className={"text-center"} width={"15%"}>이름</th>
                            <th className={"text-center"} width={"20%"}>작성일</th>
                            <th className={"text-center"} width={"10%"}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        board_list.map((vo, index) =>
                            <tr key={index}>
                                <td className={"text-center"} width={"10%"}>{vo.no}</td>
                                <td width={"45%"}><Link to={"/board/detail/" + vo.no }>{vo.subject}</Link></td>
                                <td className={"text-center"} width={"15%"}>{vo.name}</td>
                                <td className={"text-center"} width={"20%"}>{vo.dbday}</td>
                                <td className={"text-center"} width={"10%"}>{vo.hit}</td>
                            </tr>
                        )
                    }
                    <tr>
                        <td colSpan={5} className={"text-center"}>
                            <button className={"btn btn-sm btn-primary"} onClick={prev}>이전</button>
                            {curpage} page / {totalpage} pages
                            <button className={"btn btn-sm btn-primary"} onClick={next}>다음</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default BoardList;
