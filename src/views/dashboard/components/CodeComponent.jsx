import { useState } from 'react';
import { Portal, Snackbar, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark  } from 'react-syntax-highlighter/dist/esm/styles/prism';


const CodeComponent = ({code}) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => setCopied(true);
    const handleCloseSnackbar = () => setCopied(false);
    return (
        <>
            <Card m={5}>
                <CardHeader sx={{padding: '4px'}}
                    action={
                        <CopyToClipboard text={code} onCopy={handleCopy}>
                            <IconButton aria-label="settings">
                                <ContentCopyIcon fontSize='small' />
                            </IconButton>
                        </CopyToClipboard>                
                    }
                    title="Comando para descarga"
                />

                <CardContent sx={{padding: '4px'}}>
                    <SyntaxHighlighter language="shell" style={materialDark} wrapLongLines={true}>
                        {code}
                    </SyntaxHighlighter>
                </CardContent>

                <Portal>
                    <Snackbar
                        open={copied}
                        autoHideDuration={1500}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        onClose={handleCloseSnackbar}
                        message="Copiado!"
                    />
                </Portal>
            </Card>
        </>
  )
}

export default CodeComponent;
