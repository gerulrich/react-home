import { useState } from "react";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Grid, styled, Container, Box, Slide } from '@mui/material';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import { AudioPlayer } from "../../player/audio/AudioPlayer";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));


const FixedFooter = styled(Grid)(({theme}) => ({
  position: 'fixed',
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  minHeight: '70px',
  zIndex: 10000,
  opacity: 0.9,
  backgroundColor: theme.palette.background.default,
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: 0
}));

const FullLayout = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {songs} = useSelector(state => state.player);
  
  
  return (
    <>
    <MainWrapper
      className='mainwrapper'
      >
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)} />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
        className="page-wrapper"
      >
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container sx={{
          paddingTop: "20px",
          maxWidth: '1200px',
        }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
        <Slide direction="up" in={songs.length > 0}>
            <FixedFooter 
                justifyContent='center'
                direction="row"
                alignItems="center"
                container
            >
                <AudioPlayer />
            </FixedFooter>
        </Slide>
    </>
  );
};

export default FullLayout;
