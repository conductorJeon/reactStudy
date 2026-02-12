import {Fragment, useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@tanstack/react-query";
import boardClient from "../board-commons";
import {AxiosError, AxiosResponse} from "axios";

interface BoardItem {
    NO: number;
    NAME: string;
    SUBJECT: string;
    CONTENT: string;
}

interface BoardResponse {
    msg: string;
}

export default function BoardUpdate() {
    const nav = useNavigate();

    const [name, setName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");

    const nameRef = useRef<HTMLInputElement>(null);
    const subjectRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    const {no} = useParams();

    const {data, error, isError, isLoading} = useQuery<{ data: BoardItem }>({
        queryKey: ['board-update', no],
        queryFn: async() => {
            return boardClient.get<BoardItem>(`/board/update_node?no=${no}`)
        }
    })



    const board = data?.data
    console.log(board)

    useEffect(() => {
        if (board) {
            setName(board.NAME)
            setSubject(board.SUBJECT)
            setContent(board.CONTENT)
        }
    }, [board])

    const {mutate:boardUdpate} = useMutation({
        mutationFn:() => boardClient.put('/board/update_ok_node', {
            no: no,
            name: name,
            subject: subject,
            content: content,
            pwd: pwd
        }),

        onSuccess: (res:AxiosResponse<BoardResponse>) => {
            console.log(res)
            if (res.data.msg === 'yes') { // 비밀번호가 일치
                window.location.href = `/board/detail/${no}`
            } else { // 비밀번호가 틀린 상태
                alert('비밀번호가 틀립니다')
                setPwd("")
                pwdRef.current?.focus()
            }
        },

        onError: (err:AxiosError) => {
            console.log(err.message)
        }
    })

    const boardUpdateOk = () => {
        if (!name.trim()) {
            return nameRef.current?.focus();
        } else if (!subject.trim()) {
            return subjectRef.current?.focus();
        } else if (!content.trim()) {
            return contentRef.current?.focus();
        }

        boardUdpate()
    }

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError) {
        return <h1>Error...</h1>;
    }

    return (
        <Fragment>
            <div className="breadcumb-area" style={{backgroundImage: "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>react-Query + TypeScript 수정하기</h2>
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
                                <td width={"15%"}>이름</td>
                                <td width={"85%"}>
                                    <input type={"text"} size={15} className={"input-sm"}
                                           ref={nameRef} value={name} onChange={(e:any):void => setName(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>제목</td>
                                <td width={"85%"}>
                                    <input type={"subject"} size={55} className={"input-sm"}
                                           ref={subjectRef} value={subject} onChange={(e:any):void => setSubject(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>내용</td>
                                <td width={"85%"}>
                                    <textarea rows={10} cols={55} className={"input-sm"}
                                              ref={contentRef} value={content} onChange={(e:any):void => setContent(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td width={"15%"}>비밀번호</td>
                                <td width={"85%"}>
                                    <input type={"password"} size={15} className={"input-sm"}
                                           ref={pwdRef} value={pwd} onChange={(e:any):void => setPwd(e.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} className={"text-center"}>
                                    <button className={"btn btn-primary"} onClick={boardUpdateOk}>수정하기</button>&nbsp;
                                    <button className={"btn btn-primary"} onClick={() => nav(-1)}>취소</button>
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