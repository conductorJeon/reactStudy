export interface Recipe {
    no: number;
    title: string;
    poster: string;
    chef: string;
    link: string;
    hit: number;
    likecount: number;
    replycount: number;
    jjimcount: number;
}

export interface RecipeProps {
    list: Recipe[];
    curpage: number;
    totalpage: number;
    startPage: number;
    endPage: number;
}

export interface RecipeDetailVO {
    no: number;
    title: string;
    poster: string;
    chef: string;
    chef_poster: string;
    chef_profile: string;
    info1: string;
    info2: string;
    info3: string;
    content: string;
    foodmake: string;
}

export interface RecipeDetailProps {
    vo: RecipeDetailVO;
    cList: string[];
    iList: string[];
}