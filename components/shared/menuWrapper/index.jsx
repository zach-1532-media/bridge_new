import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
      .MuiList-root {
        margin-bottom: ${theme.spacing(1.5)};
        padding: 0;
    
        & > .MuiList-root {
          padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
        }
      }
    
        .MuiListSubheader-root {
          text-transform: uppercase;
          font-weight: bold;
          font-size: ${theme.typography.pxToRem(12)};
          color: ${theme.sidebar.menuItemIconColor};
          padding: ${theme.spacing(1, 3.5)};
          line-height: 1.4;
        }
    `,
);

export default MenuWrapper;
