import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    trading: {
      bull: string;
      bear: string;
      neutral: string;
      chart: {
        grid: string;
        axis: string;
        volume: string;
      };
    };
  }

  interface PaletteOptions {
    trading?: {
      bull?: string;
      bear?: string;
      neutral?: string;
      chart?: {
        grid?: string;
        axis?: string;
        volume?: string;
      };
    };
  }
}

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors
          primary: {
            main: '#1e3a8a',
            dark: '#1e40af',
            light: '#3b82f6'
          },
          secondary: {
            main: '#0f172a',
            dark: '#020617',
            light: '#334155'
          },
          background: {
            default: '#f8fafc',
            paper: '#ffffff'
          },
          text: {
            primary: '#0f172a',
            secondary: '#475569'
          },
          trading: {
            bull: '#10b981',
            bear: '#ef4444',
            neutral: '#6b7280',
            chart: {
              grid: '#e2e8f0',
              axis: '#94a3b8',
              volume: '#cbd5e1'
            }
          }
        }
      : {
          // Dark mode colors (trading platform inspired)
          primary: {
            main: '#60a5fa',
            dark: '#3b82f6',
            light: '#93c5fd'
          },
          secondary: {
            main: '#fbbf24',
            dark: '#f59e0b',
            light: '#fcd34d'
          },
          background: {
            default: '#0a0e1a',
            paper: '#111827'
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1'
          },
          trading: {
            bull: '#10b981',
            bear: '#ef4444',
            neutral: '#6b7280',
            chart: {
              grid: '#1f2937',
              axis: '#4b5563',
              volume: '#374151'
            }
          }
        }),
  },
  typography: {
    fontFamily: '"Roboto Mono", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      letterSpacing: '-0.025em'
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.75rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'dark' ? '#6b7280 #111827' : '#cbd5e1 #f8fafc',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#4b5563' : '#cbd5e1',
            border: 'none',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: mode === 'dark' ? '#1f2937' : '#f1f5f9',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#111827' : '#ffffff',
          borderBottom: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1f2937' : '#f8fafc',
          borderRight: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#111827' : '#ffffff',
          border: `1px solid ${mode === 'dark' ? '#374151' : '#e5e7eb'}`,
          boxShadow: mode === 'dark' 
            ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => 
  createTheme(getDesignTokens(mode));