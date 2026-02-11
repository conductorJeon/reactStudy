import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import apiClient from "../common/apiClient";

export default function Header() {
    const [login, setLogin] = useState<boolean>(false);

    const [id, setId] = useState<string>();
    const [password, setPassword] = useState<string>();

    const idRef = useState<HTMLInputElement>(null);
    const passwordRef = useState<HTMLInputElement>(null);

    interface LoginData {
        id: string;
        name: string;
        msg: string;
    }

    const {mutate: loginCheck} = useMutation({
        mutationFn: async (data) => {
            const res:AxiosResponse<LoginData> = await apiClient.get(`/member/login/${id}/${password}`);
            return res.data;
        },

        onSuccess: (data:LoginData) => {
            if (data.msg === 'NOID') {
                alert('아이디가 존재하지 않습니다.');
                setId('');
                setPassword('');
                idRef.current?.focus();
            } else if (data.msg === 'NOPASSWORD') {
                alert('비밀번호가 틀립니다.');
                setPassword('');
                passwordRef.current?.focus();
            } else if (data.msg === 'OK') {
                window.sessionStorage.setItem('id', data.id);
                window.sessionStorage.setItem('name', data.name);
                setLogin(true);
                window.location.reload();
            }
        },

        onError: (err:AxiosError) => {
            console.log('Login Error : ', err.message);
        }
    })

    useEffect(() => {
        if (sessionStorage.getItem('id')) {
            setLogin(true);
        }
    })

    const memberLogin = () => {
        if (id?.trim() === '') {
            idRef.current?.focus();
        }

        if (password?.trim() === '') {
            passwordRef.current?.focus();
        }

        loginCheck();
    }

    const memberLogout = () => {
        window.sessionStorage.clear();
        setId('');
        setPassword('');
        setLogin(false);
        window.location.reload();
    }

    return (
        <>
        <div id="canvas-overlay"></div>
    <div className="boxed-page">
        <nav id="navbar-header" className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand navbar-brand-center d-flex align-items-center p-0 only-mobile" href="/">
                    <img src="img/logo.png" alt=""/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="lnr lnr-menu"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex justify-content-between">
                        <li className="nav-item only-desktop">
                            <a className="nav-link" id="side-nav-open" href="#">
                                <span className="lnr lnr-menu"></span>
                            </a>
                        </li>
                        <div className="d-flex flex-lg-row flex-column">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about.html">About</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Special Dishes
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="special-dishes.html">Beef Steak Sauce</a>
                                    <a className="dropdown-item" href="special-dishes.html">Salmon Zucchini</a>
                                </div>
                            </li>
                        </div>
                    </ul>

                    <a className="navbar-brand navbar-brand-center d-flex align-items-center only-desktop" href="#">
                        <img src="img/logo.png" alt=""/>
                    </a>
                    <ul className="navbar-nav d-flex justify-content-between">
                        <div className="d-flex flex-lg-row flex-column">
                            <li className="nav-item active">
                                <a className="nav-link" href="menu.html">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="team.html">Team</a>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link" href="reservation.html">Reservation</a>
                            </li>
                        </div>
                        <li className="nav-item">
                            <a id="side-search-open" className="nav-link" href="#">
                                <span className="lnr lnr-magnifier"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    </>
        )
        }