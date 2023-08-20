import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';

const StyledCard = styled(Card)({
  marginTop: (theme) => theme.spacing(3),
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.1)',
});

const StyledLogLine = styled('div')(({ theme }) => ({
  fontFamily: 'monospace',
  fontSize: 14,
  color: '#333',
}));

const LogViewer = ({ logText = '' }) => {
  const parseLogLine = (line) => {
    if (line.includes('[INFO]')) {
      return (
        <StyledLogLine style={{ color: '#2196F3' }}>{line}</StyledLogLine>
      );
    } else if (line.includes('[DEBUG]')) {
      return (
        <StyledLogLine style={{ color: '#4CAF50' }}>{line}</StyledLogLine>
      );
    } else if (line.includes('[ERROR]')) {
      return (
        <StyledLogLine style={{ color: '#F44336' }}>{line}</StyledLogLine>
      );
    }
    return <StyledLogLine>{line}</StyledLogLine>;
  };

  const logLines = logText.split('\n').slice(-10).map((line, index) => (
    <div key={index}>{parseLogLine(line)}</div>
  ));

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>
          Log Viewer
        </Typography>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>{logLines}</div>
      </CardContent>
    </StyledCard>
  );
};

export default LogViewer;