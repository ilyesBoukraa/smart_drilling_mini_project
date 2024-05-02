import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

// import Iconify from 'src/components/iconify';

import { Typography } from '@mui/material';

import { HEADER } from './config-layout';
// import LanguagePopover from './common/language-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  /*
  <Box sx={{ flexGrow: 1 }} />    
  <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
  </Stack>
  */

  const renderContent = (
    <Link
      to="https://smartdrillingops.com/"
      target="_blank"
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
    >
      <Avatar alt="Logo" src="/favicon/smart_drilling-32x32.png" sx={{ mr: 2 }} />
      <Typography variant="h6" sx={{ color: 'black', mr: 2 }}>
        Smart Drilling Ops
      </Typography>
    </Link>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: '100%', // `calc(100% - ${NAV.WIDTH + 1}px)`
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

/*
 {!lgUp && (
  <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
  <Iconify icon="eva:menu-2-fill" />
 </IconButton>
  )}
*/
