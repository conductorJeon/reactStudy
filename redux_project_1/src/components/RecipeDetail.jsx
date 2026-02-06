import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from "react-router-dom";
import {fetchFoodDetail} from "../actions/foodActions";
import {fetchRecipeDetail} from "../actions/recipeActions";

// return ==> <RecipeDetail name="" />
const RecipeDetail = () => {
    const {no}=useParams();
    const dispatch=useDispatch();
    const nav=useNavigate()

    useEffect(() => {
        dispatch(fetchRecipeDetail(no))
    }, [])

    const detail = useSelector(state => state?.recipes.recipe_detail)

    const html = detail.tList.map((data, idx) =>
        <table className={"table"} key={idx}>
            <tbody>
            <tr>
                <td className={"text-left"} width={"80%"}>{data}</td>
                <td className={"text-left"} width={"20%"}>
                    <img src={detail.iList[idx]} style={{ width: "130px", height: "100px" }} />
                </td>
            </tr>
            </tbody>
        </table>
    )

    return (
        <div className={"container"}>
            <div className={"row"}>
                <table className="table">
                    <tbody>
                    <tr>
                        <td className={"text-center"} colSpan={3}>
                            <img src={detail?.vo?.poster} style={{width: '800px', height: '450px'}} className={"img-rounded"} />
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} colSpan={3}>
                            {detail?.vo?.content}
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"}>{detail?.vo?.info1}</td>
                        <td className={"text-center"}>{detail?.vo?.info2}</td>
                        <td className={"text-center"}>{detail?.vo?.info3}</td>
                    </tr>
                    </tbody>
                </table>
                <table className="table">
                    <tbody>
                    <tr>
                        <td className={"text-center"}><b>[조리 방법]</b></td>
                    </tr>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <td colSpan={2}>{<b>[쉐프정보]</b>}</td>
                    </tr>
                    <tr>
                        <td width={"20%"} rowSpan={2}>
                            <img src={detail?.vo?.poster} style={{width: "130px", height: "100px"}}/>
                        </td>
                        <td width={"80%"}>쉐프 이름 : {detail?.vo?.chef}</td>
                    </tr>
                    <tr>
                        <td width={"80%"}>{detail?.vo?.chef_profile}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default RecipeDetail;