import { 
  MapPinIcon,
  CameraIcon,
  SparklesIcon,
  PaintBrushIcon,
  HandRaisedIcon,
  ComputerDesktopIcon,
  BuildingOffice2Icon,
  TruckIcon
} from '@heroicons/react/24/outline';

// Map emoji icons to Heroicons
export const iconMapping: { [key: string]: any } = {
  '🏛️': MapPinIcon,
  '📸': CameraIcon,
  '🎨': PaintBrushIcon,
  '🍽️': BuildingOffice2Icon,
  '🎭': HandRaisedIcon,
  '🚗': TruckIcon,
  '🌸': PaintBrushIcon,
  '🏖️': MapPinIcon,
  '🏨': BuildingOffice2Icon,
  '💄': SparklesIcon,
  '💇‍♀️': SparklesIcon,
  '💅': SparklesIcon,
  '📋': PaintBrushIcon,
  '🌺': PaintBrushIcon,
  '🤲': HandRaisedIcon,
  '✨': SparklesIcon,
  '📺': ComputerDesktopIcon,
  '💻': ComputerDesktopIcon,
  '✉️': ComputerDesktopIcon
};

// Default icon fallback
export const getIconComponent = (emoji: string) => {
  return iconMapping[emoji] || MapPinIcon;
};

// Generate gradient classes for Tailwind
export const getGradientClass = (gradientFrom: string, gradientTo: string) => {
  return `${gradientFrom} ${gradientTo}`;
};