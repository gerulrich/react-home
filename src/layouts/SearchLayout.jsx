import { useEffect, useState } from 'react';
import { InputAdornment, OutlinedInput, Pagination, Grid, IconButton } from '@mui/material';
import { IconGridDots, IconList, IconSearch } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import { usePagingSearch } from '../hooks/usePagingSearch';
import { homeApi } from '../api/homeApi';

export const SearchLayout = (props) => {
    const {initialState, url, title, onUpdate, children} = props;
    const {
        page,
        searchValue,
        result,
        setResult,
        searchText,
        onInputChange,
        onPageChange,
        onSearchSubmit
    } = usePagingSearch(initialState);

    const showPagination = searchValue !== '' && result.paging.total > 0;
    const [gridMode, setGridMode] = useState(false);

    useEffect(() => {
        getData(searchValue, page).then(result => {
            setResult(result)
            onUpdate(result)
        });
    }, [searchValue, page]);

    const getData = async (name = '', page = 1) => {
        const q = name.toLocaleLowerCase().trim();
        if (name.length === 0 || page < 1)
            return initialState;
        const { data } = await homeApi.get(`${url}?q=${q}&offset=${(page-1) * 25}&limit=25`);
        return { ...data }
    }     
 
    return (
        <>
            <PageContainer title={title}>
                <Grid container spacing={3} mt={0.5} justifyContent="space-between">    
                    <Grid item sm={6} md={6} lg={4}>
                        <form onSubmit={onSearchSubmit}>
                            <OutlinedInput
                                size="small"
                                placeholder='buscar...'
                                variant="outlined"
                                startAdornment={
                                    <InputAdornment position="start"><IconSearch /></InputAdornment>
                                }
                                name="searchText"
                                value={searchText}
                                onChange={onInputChange}
                                fullWidth />
                        </form>
                    </Grid>
                    <Grid item sm={2} justifyItems="flex-end">
                        <IconButton onClick={() => setGridMode(false)} disabled={!gridMode}>
                            <IconList />
                        </IconButton>

                        <IconButton onClick={() => setGridMode(true)} disabled={gridMode}>
                            <IconGridDots />
                        </IconButton>
                    </Grid>
                </Grid>                

                <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1} style={{display: showPagination ? '': 'none'}}>
                    <Grid container alignItems="center" justifyContent="center" m={1}>
                        <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                    </Grid>
                </Grid>

                {children}

                <Grid container alignItems="flex-start" direction="row" justifyContent="center" m={1} style={{display: showPagination ? '': 'none'}}>
                    <Grid container alignItems="center" justifyContent="center" m={1}>
                        <Pagination onChange={onPageChange} count={result.paging.total} disabled={result.paging.total <= 1} page={page} />
                    </Grid>
                </Grid>

            </PageContainer>
   
        </>
  )
}
