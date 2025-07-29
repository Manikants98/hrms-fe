import { IconButton } from '@mui/material';
import React from 'react';
import { RiSettingsFill } from 'react-icons/ri';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Sidebar from '../../shared/sidebar';
import ThemeDrawer from '../../utils/theme';

const AdminLayout: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [primaryColor, setPrimaryColor] = useLocalStorage<string>(
    'primaryColor',
    getComputedStyle(document.documentElement).getPropertyValue('--color-primary')?.trim() ||
      '#e41f07'
  );
  const updatePrimaryColor = (hex: string) => {
    document.documentElement.style.setProperty('--color-primary', hex);

    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      hex = hex.replace('#', '');
      if (hex.length === 3) {
        hex = hex
          .split('')
          .map((c) => c + c)
          .join('');
      }
      const bigint = parseInt(hex, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };

    const { r, g, b } = hexToRgb(hex);

    // Define shades using RGBA (opacity for lighter look)
    const opacitySteps = {
      50: 0.05,
      100: 0.1,
      200: 0.2,
      300: 0.3,
      400: 0.4,
      500: 0.5,
      600: 0.6,
      700: 0.7,
      800: 0.8,
      900: 0.9,
      950: 0.95,
    };

    Object.entries(opacitySteps).forEach(([key, alpha]) => {
      const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      document.documentElement.style.setProperty(`--color-primary-${key}`, rgba);
    });

    setPrimaryColor(hex);
  };

  React.useEffect(() => {
    updatePrimaryColor(primaryColor);
  }, [primaryColor]);

  return (
    <div className="flex flex-row h-screen selection:bg-primary selection:text-white relative">
      <Sidebar />
      <div className="flex-1 bg-primary-50 overflow-y-auto">
        <Outlet />
        <ThemeDrawer
          open={open}
          onClose={() => setOpen(false)}
          primaryColor={primaryColor}
          onColorChange={updatePrimaryColor}
        />
      </div>
      <IconButton
        onClick={() => setOpen(true)}
        className="!fixed !rounded-r-none !rounded-l !flex !justify-center !opacity-70 !items-center !top-1/2 !size-10 !bg-primary-500 !right-0 !z-50 cursor-pointer"
      >
        <RiSettingsFill size={20} color="white" />
      </IconButton>
    </div>
  );
};

export default AdminLayout;
