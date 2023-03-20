import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const Logo = () => {
  const {darkMode} = useSelector(state => state.ui);
  return (
    <LinkStyled to="/">
      {
        darkMode ? (<LogoLight height={70} />) : (<LogoDark height={70} />)
      }      
    </LinkStyled>
  )
};

export default Logo;
