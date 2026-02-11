import {Fragment, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import apiClient from "../../http-commons";

/*
        서버 연결 => 서버 데이터를 관리
        useQuery => 함수명 지정 => 반복 : refetch : 함수명
        useMutation : mutate = loginOk (주로 지정 : insert, update, delete)
                      => onSuccess
                      => Fail
        1. session
           => 브라우저마다 생성 => 포트에 따라 다르다
           => 3000
               | 로그인 요청
              8080 ====== 로그인 여부 (데이터 베이스 처리)
                               |
                          로그인된 경우
                               |
                          JavaScript를 이용해서 자체 저장
                          ----------------------------
                          자바스크립트 세션 저장
                          sessionStorage.setItem("키", "값")
                          세션 해제
                          sessionStorage.clear()
 */

export default function Header() {
    // 변수 => HTML에 바로 적용 => useState
    const [login, setLogin] = useState<boolean>(false);

    const [id, setId] = useState<string>('');
    const[pwd, setPwd] = useState<string>('');

    const idRef = useRef<HTMLInputElement>(null);
    const pwdRef = useRef<HTMLInputElement>(null);

    interface LoginData {
        msg: string; // NOID, NOPWD, OK
        id: string;
        name: string;
    }

    const {mutate: loginOk} = useMutation({
        mutationFn: async (data) => {
            console.log(data)
            const res:AxiosResponse<LoginData> = await apiClient.get(`/member/login/${id}/${pwd}`)

            return res.data
        },

        onSuccess: (data:LoginData) => {
            if (data.msg === 'NOID') {
                alert('아이디가 존재하지 않습니다.')
                setId('')
                setPwd('')
                idRef.current?.focus()
            } else if (data.msg ==='NOPWD') {
                alert('비밀번호가 틀립니다.')
                setPwd('')
                pwdRef.current?.focus()
            } else if (data.msg === 'OK') {
                window.sessionStorage.setItem("id", data.id)
                window.sessionStorage.setItem("name", data.name)
                setLogin(true)
                window.location.reload()
            }
        },

        onError: (error:AxiosError) => {
            console.log("Login Error", error.message)
        }
    })

    useEffect(() => {
        if (sessionStorage.getItem("id")) {
            setLogin(true)
        }
    })

    const memberLogin = () => {
        if (id.trim() === '') {
            idRef.current?.focus()
        }

        if (pwd.trim() === '') {
            pwdRef.current?.focus()
        }

        loginOk()
    }

    const memberLogout = () => {
        window.sessionStorage.clear(); // invalidate()
        setId('')
        setPwd('')
        setLogin(false)
        window.location.reload()
    }

    return (
        <Fragment>
            <div className="top_header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-5 col-sm-6">
                            <div className="top_social_bar">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="col-7 col-sm-6">
                            <div className="signup-search-area d-flex align-items-center justify-content-end">
                                <div className="login_register_area d-flex">
                                    {
                                        !login ? (
                                        <div className={"login"}>
                                            ID : <input ref={idRef} value={id} onChange={(e:any)=> setId(e.target.value)} type={"text"} size={10} className={"input-sm"} />
                                            &nbsp;
                                            PW : <input ref={pwdRef} value={pwd} onChange={(e:any) => setPwd(e.target.value)} type={"password"} size={10} className={"input-sm"} />
                                            &nbsp;
                                            <button className={"btn-sm btn-primary"} onClick={memberLogin}>로그인</button>
                                        </div>
                                            )
                                            : (
                                                <div className={"login"}>
                                                    {window.sessionStorage.getItem("name")} 님 로그인 중
                                                    <button className={"btn-sm btn-primary"} onClick={memberLogout}>로그아웃</button>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header_area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="logo_area text-center">
                                <Link to={"/"} className="yummy-logo">All Travel</Link>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#yummyfood-nav" aria-controls="yummyfood-nav" aria-expanded="false"
                                        aria-label="Toggle navigation"><i className="fa fa-bars"
                                                                          aria-hidden="true"></i> Menu
                                </button>
                                <div className="collapse navbar-collapse justify-content-center" id="yummyfood-nav">
                                    <ul className="navbar-nav" id="yummy-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to={"/"}>Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">서울 여행</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href="index.html">명소</a>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제 & 공연</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">부산 여행</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <a className="dropdown-item" href="index.html">명소</a>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제 & 공연</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="yummyDropdown"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">제주 여행</a>
                                            <div className="dropdown-menu" aria-labelledby="yummyDropdown">
                                                <Link className="dropdown-item" to={"jeju/attraction"}>명소</Link>
                                                <a className="dropdown-item" href="archive.html">쇼핑</a>
                                                <a className="dropdown-item" href="single.html">음식</a>
                                                <a className="dropdown-item" href="static.html">축제 & 공연</a>
                                                <a className="dropdown-item" href="contact.html">숙박</a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">여행 추천 코스</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">챗봇</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="archive.html">동영상 검색</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/board/list"}>커뮤니티</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
)
}