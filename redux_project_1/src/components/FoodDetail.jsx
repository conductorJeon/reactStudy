import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {fetchFoodDetail} from "../actions/foodActions";

function FoodDetail() {
    const {fno} = useParams();
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(fetchFoodDetail(fno))
    }, [])

    const food_detail = useSelector(state => state.foods.food_detail)
    if (!food_detail) {
        return null;
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <table className="table">
                    <tbody>
                    <tr>
                        <td width={"30%"} className={"text-center"} rowSpan={8}>
                            <img src={food_detail.poster} style={{width: "350px", height: "300px"}}/>
                        </td>
                        <td colSpan={2}><h3>{food_detail.name}&nbsp;<span
                            style={{color: "orange"}}>{food_detail.score}</span></h3></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    <tr>
                        <td width={"10%"} className={"text-center"}></td>
                        <td width={"60%"}></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FoodDetail;