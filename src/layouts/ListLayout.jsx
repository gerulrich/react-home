import { useEffect, useState } from 'react';
import { Pagination, Grid, IconButton } from '@mui/material';
import { IconGridDots, IconList } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import { homeApi } from '../api/homeApi';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ListLayout = (props) => {
    const {initialState, url, title, onUpdate, children} = props;
    const [result, setResult] = useState(initialState);
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(parseInt(params.get('page')) || 1);
    const showPagination = result.paging.total > 0;
    const [gridMode, setGridMode] = useState(false);

    useEffect(() => {
        getData(page).then(result => {
            setResult(result);
            onUpdate(result);
        }).catch(error => console.error(error));
    }, [page]);

    const getData = async (page = 1) => {
        const { data } = await homeApi.get(`${url}?offset=${(page-1) * 25}&limit=25`);
        return { ...data }
    }     
 
    const onPageChange = (event, value) => {
        navigate(`?page=${ value }`)
        setPage(value);
    }

    return (
            <PageContainer title={title}>
                <Grid container spacing={3} mt={0.5} justifyContent="space-between">    
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
   
  )
}
