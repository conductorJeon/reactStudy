import {useState, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {fetchRecipeFind} from '../actions/recipeActions'

function RecipeFind() {
    const dispatch = useDispatch()
    const [curpage, setCurpage] = useState(1)
    const fdRef = useRef(null)
    const [fd, setFd] = useState('간식')

    useEffect(() => {
        dispatch(fetchRecipeFind(curpage, fd))
    }, [curpage, fd])

    const recipe_find = useSelector(state => state.recipes.recipe_find.recipe)
    const totalpage = useSelector(state => state.recipes.recipe_find.totalpage)

    return (
        <div className="container">
            <div className="row">
                <input type={"text"} className={"input-sm"} ref={fdRef} value={fd}
                       onChange={(e) => setFd(e.target.value)}/>
                <button className={"btn-sm btn-default"}>검색</button>
            </div>
            <div className="row" style={{"marginTop": "20px"}}>
                {
                    recipe_find && recipe_find.map((recipe, index) =>
                        <div className="col-md-3" key={index}>
                            <div className="thumbnail">
                                <Link to={`/recipe/detail/${recipe.NO}`}>
                                    <img src={recipe.POSTER} style={{"width": "250px", "height": "150px"}}
                                         title={recipe.TITLE}
                                    />
                                    <div className="caption">
                                        <p>{recipe.TITLE}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="row text-center" style={{"marginTop": "20px"}}>
                <button className={"btn-sm btn-warning"}>이전</button>
                {curpage} page / {totalpage} pages
                <button className={"btn-sm btn-warning"}>다음</button>
            </div>
        </div>
    )
}

export default RecipeFind