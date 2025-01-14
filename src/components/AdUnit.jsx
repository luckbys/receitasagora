import React, { useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const AdUnit = ({ slot, format = 'auto', responsive = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!window.adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', 'ca-pub-7273911343718108');
      document.head.appendChild(script);
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Erro ao carregar anúncio:', error);
    }
  }, []);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        my: { xs: 1, sm: 2 },
        mx: { xs: -2, sm: 0 },
        minHeight: { xs: 80, sm: 100 },
        bgcolor: 'background.paper',
        borderRadius: { xs: 0, sm: 2 },
        overflow: 'hidden',
        '& ins': {
          display: 'block',
          width: '100%',
          height: '100%'
        }
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          width: isMobile ? '100vw' : '100%',
          maxWidth: '100%'
        }}
        data-ad-client="ca-pub-7273911343718108"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </Box>
  );
};

export default AdUnit; 