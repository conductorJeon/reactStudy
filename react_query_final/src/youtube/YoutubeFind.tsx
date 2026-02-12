import {Fragment, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {YoutubeApi} from "./YoutubeApi";

export default function YoutubeFind() {
    const [fd, setFd] = useState<string>("");
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['youtube', fd],
        queryFn: () => YoutubeApi(fd),
        enabled: fd.trim().length > 0,
    });


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error : {error.message}</div>;
    }

    if (!data) {
        return null
    }
    console.log(data)

    return (
        <Fragment>
            <div className="breadcumb-area" style={{"backgroundImage": "url(../../img/bg-img/breadcumb.jpg)"}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12">
                            <div className="bradcumb-title text-center">
                                <h2>Youtube Find</h2>
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
                                <input type={"text"} size={20} className={"input-sm"} />
                                <button className={"btn-sm btn-outline-primary"}>동영상 검색</button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <section className="archive-area section_padding_80">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <input type={"text"} size={20} className={"input-sm"} onChange={(e) => setFd(e.target.value)} />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}