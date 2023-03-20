import { styled } from '@mui/material';

const TerminalWrapper = styled('div')({
    borderRadius: '5px 5px 0 0',
    position: 'relative',
    margin: '5px',
    boxShadow: '0px 0px 10px rgba(0,0,0,.4)'
});

const TerminalBar = styled('div')({
    background: '#E8E6E8',
    color: 'black',
    padding: '5px',
    bordeRadius: '5px 5px 0 0',
});

const TerminalBody = styled('div')({
    background: 'black',
    color: '#7AFB4C',
    padding: '8px',
    overflow: 'auto',
    bordeRadius: '5px 5px 5px 5px',
    fontFamily: 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace',
});

export const Terminal = ({title, content}) => {
  return (
    <TerminalWrapper>
        <TerminalBar>
            <div style={{textAlign: 'center'}}>{title}</div>
        </TerminalBar>
        <TerminalBody>
            {content.map((line, index) => (<p key={index}>{line}</p>))}
        </TerminalBody>
    </TerminalWrapper>
  )
}
