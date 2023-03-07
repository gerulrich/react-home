import PageContainer from '../../components/container/PageContainer';

const OnDemandPage = () => {
    return (
        <PageContainer title="On Demand">
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={8}>
                        Reproductor
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        Lista de canales
                    </Grid>
                </Grid>
            </Box>
    </PageContainer>
);

};

export default OnDemandPage;