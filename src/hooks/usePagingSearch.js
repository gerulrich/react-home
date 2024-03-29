import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "./useForm";


export const usePagingSearch = (state = {albums: [], channels: [], pages: 0, current: 0 }) => {

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [page, setPage] = useState(parseInt(params.get('page')) || 1);
    const [searchValue, setSearchValue] = useState(params.get('q') || '');
    const [result, setResult] = useState(state);
    const {searchText, onInputChange} = useForm({ searchText: searchValue });

    const onPageChange = (event, value) => {
        navigate(`?q=${ searchText }&page=${ value }`)
        setPage(value);
    }

    const onSearchSubmit = (event) => {
        event.preventDefault();
        searchText.length === 0 ? navigate("") : navigate(`?q=${ searchText }`);
        setSearchValue(searchText);
        setPage(1);
    };

    return {
        page,
        setPage,
        searchValue,
        result,
        setResult,
        searchText, 
        onInputChange,
        onPageChange,
        onSearchSubmit
    }

}