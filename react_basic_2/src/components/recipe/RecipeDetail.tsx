import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import apiClient from "../../commons/http-commons";
import {RecipeDetailVO, RecipeDetailProps} from "../../types";

function RecipeDetail() {
    const {no} = useParams<string>();
    const nav = useNavigate();
    const [detail, setDetail] = useState<RecipeDetailProps>();

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await apiClient.get(`/recipe/detail_react/${no}`)
            setDetail(res.data);
            console.log(res.data);
            return res.data
        }
        fetchDetail();
    }, [no])

    if (!detail) {
        return null;
    }

    const html = detail.cList.map((data, idx) =>
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
                                <img src={detail?.vo.poster} style={{width: '800px', height: '450px'}} className={"img-rounded"} />
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-center"} colSpan={3}>
                                {detail?.vo.content}
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-center"}>{detail?.vo.info1}</td>
                            <td className={"text-center"}>{detail?.vo.info2}</td>
                            <td className={"text-center"}>{detail?.vo.info3}</td>
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
                <table className="table">
                    <tbody>
                        <tr>
                            <td colSpan={2}><b>[쉐프 정보]</b></td>
                        </tr>
                        <tr>
                            <td width={"20%"} rowSpan={2}>
                                <img src={detail.vo.chef_poster} style={{width: '130px', height: '130px'}} />
                            </td>
                            <td width={"80%"}>{detail.vo.chef}</td>
                        </tr>
                        <tr>
                            <td width={"80%"}>{detail.vo.chef_profile}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default RecipeDetail;