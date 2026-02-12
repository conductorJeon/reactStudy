import {Fragment} from "react";
import {Link, useNavigate, useNavigationType, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import boardClient from "../board-commons";

interface BoardDetailProps {
    NO: number;
    NAME: string;
    SUBJECT: string;
    CONTENT: string;
    DBDAY: string;
    HIT: number;
}

export default function BoardDetail() {
    const {no} = useParams();
    const nav = useNavigate();
    const type = useNavigationType();
    console.log(type)
    const {data, error, isError, isLoading} = useQuery<{data:BoardDetailProps}>({
        queryKey: ['board-detail', no],
        queryFn: async() => {
            return boardClient.get(`/board/detail_node?no=${no}`)
            // /board/detail?no=1 => req.query.no => getParameter() => 매개 변수
            // /board/detail/1 => req.params.no => PathVariable
        }
    })

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>Error... : {error.message}</h1>;
    }

    if (!data) return null;

    const board = data.data

    return (
        <Fragment>
            <div className="breadcumb-area" style={{backgroundImage: "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>react-Query + TypeScript 상세보기</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td width={"20%"} className="text-center">번호</td>
                                <td width={"30%"} className="text-center">{board.NO}</td>
                                <td width={"20%"} className="text-center">작성일</td>
                                <td width={"30%"} className="text-center">{board.DBDAY}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className="text-center">이름</td>
                                <td width={"30%"} className="text-center">{board.NAME}</td>
                                <td width={"20%"} className="text-center">조회수</td>
                                <td width={"30%"} className="text-center">{board.HIT}</td>
                            </tr>
                            <tr>
                                <td width={"20%"} className="text-center">제목</td>
                                <td colSpan={3} className="text-center">{board.SUBJECT}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-left" valign={"top"} height={200}>
                                    <pre style={{whiteSpace: "pre-wrap", backgroundColor: "white", border: "none"}}>{board.CONTENT}</pre>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className={"text-right"}>
                                    <Link to={"/board/list"} className="btn btn-primary">목록</Link>&nbsp;
                                    <Link to={"/board/update/" + board.NO} className="btn btn-primary">수정</Link>&nbsp;
                                    <Link to={"/board/delete/" + board.NO} className="btn btn-primary">삭제</Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}