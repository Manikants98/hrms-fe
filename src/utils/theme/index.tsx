import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PaletteIcon from '@mui/icons-material/Palette';
import { Button, Divider, Drawer, IconButton } from '@mui/material';
import React from 'react';

/**
 * Professional ThemeDrawer component for selecting and applying custom themes.
 * Features organized color categories, custom color picker, and preview functionality.
 *
 * @param props.open - Whether the drawer is open.
 * @param props.onClose - Function to close the drawer.
 * @param props.primaryColor - Current primary color.
 * @param props.onColorChange - Function to update the primary color.
 */
const ThemeDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  primaryColor: string;
  onColorChange: (color: string) => void;
}> = ({ open, onClose, primaryColor, onColorChange }) => {
  const colors = [
    { color: '#1976d2', name: 'Material Blue' },
    { color: '#9c27b0', name: 'Purple' },
    { color: '#f44336', name: 'Red' },
    { color: '#4caf50', name: 'Green' },
    { color: '#ff9800', name: 'Orange' },
    { color: '#e91e63', name: 'Pink' },
    { color: '#00bcd4', name: 'Cyan' },
    { color: '#ff5722', name: 'Deep Orange' },
    { color: '#673ab7', name: 'Deep Purple' },
    { color: '#009688', name: 'Teal' },
    { color: '#607d8b', name: 'Blue Grey' },
    { color: '#4173A0', name: 'Indigo' },
    { color: '#795548', name: 'Brown' },
    { color: '#ff4081', name: 'Accent Pink' },
    { color: '#536dfe', name: 'Indigo Accent' },
    { color: '#000000', name: 'Black' },
  ];

  const handleColorSelect = (color: string) => {
    onColorChange(color);
  };

  const ColorButton = ({ colorData }: { colorData: { color: string; name: string } }) => {
    const isSelected = colorData.color === primaryColor;

    return (
      <div
        className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
          isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200'
        }`}
        onClick={() => handleColorSelect(colorData.color)}
      >
        <div
          className="w-full h-12 relative flex items-center justify-center"
          style={{ backgroundColor: colorData.color }}
        >
          {isSelected && (
            <CheckIcon className="text-white bg-black bg-opacity-30 rounded-full p-1 text-2xl" />
          )}
        </div>
        <div className="p-2">
          <div className="text-xs font-medium text-gray-900">{colorData.name}</div>
          <div className="text-xs text-gray-500">{colorData.color.toUpperCase()}</div>
        </div>
      </div>
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div className="w-96 h-full flex flex-col bg-white">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PaletteIcon className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Theme Palette</h2>
            </div>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </div>
          <p className="text-sm text-gray-600">
            Choose a color scheme that matches your brand and style preferences.
          </p>
        </div>

        <Divider />

        {/* Color Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {colors.map((colorData) => (
              <ColorButton key={colorData.color} colorData={colorData} />
            ))}
          </div>
        </div>

        <Divider />

        {/* Custom Color Picker */}
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Custom Color</h3>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-12 h-12 border-none rounded-lg cursor-pointer"
              aria-label="Pick custom color"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Current Color</div>
              <div className="text-xs text-gray-500">{primaryColor.toUpperCase()}</div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="p-6 pt-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Preview</h3>
          <div
            className="border border-gray-200 rounded-lg p-4"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}15 0%, ${primaryColor}05 100%)`,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: primaryColor,
                '&:hover': {
                  backgroundColor: primaryColor,
                  filter: 'brightness(0.9)',
                },
              }}
            >
              Preview Button
            </Button>
            <div className="text-xs text-center mt-2 text-gray-500">
              This is how your theme will look
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
