import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function FoodFind(){
    return (
        <div className="container">
            <div className="row">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                                <select className={"input-sm"}>
                                    <option>맛집명</option>
                                    <option>주소</option>
                                    <option>음식종류</option>
                                </select>
                                <input type={"text"} className={"input-sm"} placeholder={"검색어 입력"} />
                                <button className={"btn-sm btn-warning"}>검색</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default FoodFind