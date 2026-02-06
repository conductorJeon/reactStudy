import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {boardInsertionActions, boardResetActions} from "../actions/boardActions";

function BoardInsert() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    // ref => 태그 (input)
    const nameRef = useRef(null);
    const subjectRef = useRef(null);
    const contentRef = useRef(null);
    const pwdRef = useRef(null);

    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [pwd, setPwd] = useState("");

    const insert = () => {
        if (name.trim() === "") {
            nameRef.current.focus();
            return;
        }
        if (subject.trim() === "") {
            subjectRef.current.focus();
            return;
        }
        if (content.trim() === "") {
            contentRef.current.focus();
            return;
        }
        if (pwd.trim() === "") {
            pwdRef.current.focus();
            return;
        }

        const params = {
            name: name,
            subject: subject,
            content: content,
            pwd: pwd,
        }

        dispatch(boardInsertionActions(params));
    }

    const result = useSelector((state) => state.boards.result)

    if (result && result === 'yes') {
        nav('/board/list')
        dispatch(boardResetActions())
    }

    const cancel = () => {
        nav('/board/list')
        dispatch(boardResetActions())
    }

    return (
        <div className={"container"}>
            <div className={"row"} style={{width: '800px'}}>
                <h3 className={"text-center"}>글쓰기</h3>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td className={"text-center"} width={"20%"}>이름</td>
                        <td width={"80%"}>
                            <input type={"text"} className={"input-sm"} size={20} ref={nameRef} value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} width={"20%"}>제목</td>
                        <td width={"80%"}>
                            <input type={"text"} className={"input-sm"} size={50} ref={subjectRef} value={subject}
                                   onChange={(e) => setSubject(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} width={"20%"}>내용</td>
                        <td width={"80%"}>
                            <textarea rows={10} cols={50} ref={contentRef} value={content}
                                      onChange={(e) => setContent(e.target.value)}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} width={"20%"}>비밀번호</td>
                        <td width={"80%"}>
                            <input type={"password"} className={"input-sm"} size={10} ref={pwdRef} value={pwd}
                                   onChange={(e) => setPwd(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} colSpan={2}>
                            <button className={"btn btn-sm btn-primary"} onClick={insert}>글쓰기</button>
                            <button className={"btn btn-sm btn-danger"} onClick={cancel}>취소</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BoardInsert;