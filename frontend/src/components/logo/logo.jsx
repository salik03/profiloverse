import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components'; // Add space between imports
import profiloverseLogo from 'src/components/logo/PROfiloverse.png'; // Add space between imports

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  // Remove unused variable 'useTheme'
  // const theme = useTheme();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src={profiloverseLogo}
        alt="PROfiloverse Logo"
        style={{ width: '100%', height: '100%', cursor: 'pointer' }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;