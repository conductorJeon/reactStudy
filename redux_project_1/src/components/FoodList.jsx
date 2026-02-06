import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchFoodList} from "../actions/foodActions";
import {Link} from "react-router";

function FoodList() {
    const [curpage, setCurpage] = useState(1);
    const dispatch = useDispatch(); // Action 함수

    useEffect(() => {
        dispatch(fetchFoodList(curpage));
    }, [curpage])

    /*
        state : food, recipe, seoul, board
                 |
                foods : food_list, food_detail
     */

    const food_list = useSelector(state => state.foods.food_list.list);
    if (!food_list) {
        return null;
    }

    const prev = () => setCurpage(food_list.startPage - 1)
    const next = () => setCurpage(food_list.endPage + 1)
    const pageChange = (curpage) => setCurpage(curpage)

    const pageArr = []

    if (food_list?.startPage > 1) {
        pageArr.push(
            <li key={food_list?.startPage - 1}><a className={"a-link"} onClick={prev}>&laquo;</a></li>
        )
    }

    for (let i = food_list.startPage; i <= food_list?.endPage; i++) {
        pageArr.push(
            <li className={i === curpage ? "active" : ""} key={i}><a className={"a-link"} onClick={() => pageChange(i)}>{i}</a>
            </li>
        )
    }

    if (food_list?.endPage < food_list?.totalpage) {
        pageArr.push(
            <li key={food_list?.endPage + 1}><a className={"a-link"} onClick={next}>&raquo;</a></li>
        )
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                {food_list?.map((food, index) =>
                    <div className="col-md-3" key={index}>
                        <div className="thumbnail">
                            <Link to={`/food/detail/${food.fno}`}>
                                <img src={food.poster} style={{"width":"250px","height":"150px"}} />
                                <div className="caption">
                                    <p>{food.name}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default FoodList;