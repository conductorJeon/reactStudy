import {JejuData} from "./commonsData";
import {FC} from "react";

interface pagePrintProps {
    data: JejuData;
    setCurpage: (page: number) => void;
}

const PagePrint: FC<pagePrintProps> = ({data, setCurpage}) => {
    const {curpage, totalpage, startPage, endPage} = data;
    const pageArr = []

    const prev = () => setCurpage(startPage - 1)
    const next = () => setCurpage(endPage + 1)
    const pageChange = (page:number) => setCurpage(page)

    if (startPage > 1) {
        pageArr.push(
            <li className="page-item">
                <a className="page-link nav-link" onClick={prev}>&laquo;</a>
            </li>
        )
    }

    for (let i: number = startPage; i <= endPage; i++) {
        pageArr.push(
            <li className={i === curpage ? "active page-item" : "page-item"}>
                <a className="page-link nav-link" onClick={() => pageChange(i)}>{i}</a>
            </li>
        )
    }

    if (endPage < totalpage) {
        pageArr.push(
            <li className="page-item">
                <a className="page-link nav-link" onClick={next}>&raquo;</a>
            </li>
        )
    }

    return (
        <div className="col-12">
            <div className="pagination-area d-sm-flex mt-15">
                <nav aria-label="#">
                    <ul className="pagination">
                        {pageArr}
                    </ul>
                </nav>
                <div className="page-status">
                    <p>Page {curpage} of {totalpage}</p>
                </div>
            </div>
        </div>
    )
}
export default PagePrint;