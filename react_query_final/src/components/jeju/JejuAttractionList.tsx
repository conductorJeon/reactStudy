import {Fragment, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import apiClient from "../../http-commons";
import {JejuData} from "../../commons/commonsData";
import PagePrint from "../../commons/PagePrint";

export default function JejuAttractionList() {
    const [curpage, setCurpage] = useState(1);
    const {data, error, isError, isLoading} = useQuery<AxiosResponse<JejuData>, Error>({
        queryKey: ['jeju-attr' + curpage],
        queryFn: async () => {
            return await apiClient.get(`/jeju/attraction/${curpage}`);
        }
    });

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>;
    }

    if (isError) {
        return <h1 className={"text-center"}>Error...</h1>;
    }

    if (!data) {
        return null
    }

    return (
        <Fragment>

            <div className="breadcumb-area" style={{"backgroundImage": "url(%PUBLIC_URL%/img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>Archive Page</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcumb-nav">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="#"><i className="fa fa-home"
                                                                                   aria-hidden="true"></i> Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Archive Page</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">


                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="single-post wow fadeInUp" data-wow-delay="0.1s">

                                <div className="post-thumb">
                                    <img src="img/blog-img/2.jpg" alt=""/>
                                </div>

                                <div className="post-content">
                                    <div className="post-meta d-flex">
                                        <div className="post-author-date-area d-flex">

                                            <div className="post-author">
                                                <a href="#">By Marian</a>
                                            </div>

                                            <div className="post-date">
                                                <a href="#">May 19, 2017</a>
                                            </div>
                                        </div>

                                        <div className="post-comment-share-area d-flex">

                                            <div className="post-favourite">
                                                <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i> 10</a>
                                            </div>

                                            <div className="post-comments">
                                                <a href="#"><i className="fa fa-comment-o"
                                                               aria-hidden="true"></i> 12</a>
                                            </div>

                                            <div className="post-share">
                                                <a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#">
                                        <h4 className="post-headline">Where To Get The Best Sunday Roast In The
                                            Cotswolds</h4>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <PagePrint data={data.data} setCurpage={setCurpage}/>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}