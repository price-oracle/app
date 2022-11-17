import { Theme, darkTheme } from '@rainbow-me/rainbowkit';
import { merge } from 'lodash';

export const priceDarkTheme = merge(darkTheme(), {
  blurs: {
    modalOverlay: 'blur(11px)',
  },
  colors: {
    accentColor: 'none',
    accentColorForeground: 'none',
    // actionButtonBorder: 'rgba(224, 232, 255, 0.1)',
    // actionButtonBorderMobile: 'rgba(224, 232, 255, 0.1)',
    actionButtonSecondaryBackground: 'none',
    connectButtonInnerBackground: 'none',
    connectButtonBackground: 'none',
    // closeButton: '...',
    // closeButtonBackground: 'none',
    // connectButtonBackgroundError: '...',
    // connectButtonText: '...',
    // connectButtonTextError: '...',
    // connectionIndicator: '...',
    // downloadBottomCardBackground: '...',
    // downloadTopCardBackground: '...',
    // error: '...',
    // generalBorder: 'rgba(224, 232, 255, 0.1)',
    // generalBorderDim: 'rgba(224, 232, 255, 0.1)',
    // menuItemBackground: '#121212',
    modalBackdrop: 'rgba(0, 0, 0, 0.7)',
    // modalBackground: 'black',
    // modalBorder: 'rgba(224, 232, 255, 0.1)',
    // modalText: '...',
    // modalTextDim: '...',
    // modalTextSecondary: '...',
    profileAction: 'none',
    // profileActionHover: '...',
    // profileForeground: '...',
    // selectedOptionBorder: 'rgba(224, 232, 255, 0.1)',
    // standby: 'red',
  },
  fonts: {
    body: 'PlusJakartaSans',
  },
  radii: {
    actionButton: 'none',
    connectButton: 'none',
    menuButton: 'none',
    modal: 'none',
    modalMobile: 'none',
  },
  shadows: {
    connectButton: 'none',
    dialog: 'none',
    profileDetailsAction: 'none',
    selectedOption: 'none',
    selectedWallet: 'none',
    walletLogo: 'none',
  },
}) as Theme;
