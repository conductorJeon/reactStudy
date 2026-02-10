import {useNavigate, useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {JejuItem} from "../../commons/commonsData";
import apiClient from "../../http-commons";
import {Fragment} from "react";

/*
      1. React = tanstack-query
      2. TypeScript => interface / 데이터형
      3. nodejs => 맛집
      4. 추천 => AI 이용
      5. CRUD = 게시판 / 댓글
                ----- 챗봇
      6. 로그인 처리 : session / cookie => 자바스크립트
                     -------- JWT
 */

interface DetailProps {
    dto: JejuItem;
}

export default function JejuAttractionDetail () {
    const {contentid} = useParams();
    const nav = useNavigate();
    const {data, error, isError, isLoading} = useQuery<DetailProps, Error>({
        queryKey: ['detial-jeju', contentid],
        queryFn: async() => {
            return await apiClient.get(`/jeju/detail_react/${contentid}`);
        }
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error... {error?.message}</div>;
    }

    if (!data) {
        return null;
    }

    const jejuData:JejuItem | undefined = data.dto

    return (
        <Fragment>
            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">

                    </div>
                </div>
            </section>
        </Fragment>
)
}