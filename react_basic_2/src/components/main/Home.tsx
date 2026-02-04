import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import apiClient from "../../commons/http-commons";

interface Food {
    fno: number;
    name: string;
    poster: string;
}

// Map으로 전송
interface FoodListProps {
    list: Food[];
    curpage: number;
    totalpage: number;
    startPage: number;
    endPage: number;
}

function Home() {
    const [curpage, setCurpage] = useState<number>(1);
    const [foodData, setFoodData] = useState<FoodListProps>();
    // mounted => window.onload = componentDidMount
    useEffect(() => {
        const fetchList = async () => {
            const res = await apiClient.get(`/food/list_react/${curpage}`)
            console.log(res.data)
            setFoodData(res.data)
        }
        fetchList();
    }, [curpage]); // 재호출 => curpage 가 변경시마다 [] 한번만 호출

    const html = foodData?.list.map((food: Food, index: number) => {
        return (
            <div className="col-md-3" key={index}>
                <div className="thumbnail">
                    <Link to={`/food/detail/${food.fno}`}>
                        <img src={food.poster} style={{width: "250px", height: "150px"}}/>
                        <div className="caption">
                            <p>{food.name}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    })
    if (!foodData) return null;

    const prev = () => setCurpage(foodData.startPage - 1)
    const next = () => setCurpage(foodData.endPage + 1)
    const pageChange = (page: number) => setCurpage(page)

    const pageArr = []

    if (foodData?.startPage > 1) {
        pageArr.push(
            <li key={foodData?.startPage - 1}><a className={"a-link"} onClick={prev}>&laquo;</a></li>
        )
    }

    for (let i = foodData.startPage; i <= foodData?.endPage; i++) {
        pageArr.push(
            <li className={i === curpage ? "active" : ""} key={i}><a className={"a-link"} onClick={() => pageChange(i)}>{i}</a>
            </li>
        )
    }

    if (foodData?.endPage < foodData?.totalpage) {
        pageArr.push(
            <li key={foodData?.endPage + 1}><a className={"a-link"} onClick={next}>&raquo;</a></li>
        )
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row text-center"} style={{marginTop: "10px"}}>
                <ul className={"pagination"}>
                    {pageArr}
                </ul>
            </div>
        </div>
    )
}

export default Home;