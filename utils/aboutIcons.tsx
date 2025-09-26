import { 
  CameraIcon, 
  HeartIcon, 
  StarIcon,
  UserGroupIcon,
  TrophyIcon,
  ViewfinderCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

export const getAboutIcon = (iconType: string) => {
  const iconMap = {
    camera: CameraIcon,
    heart: HeartIcon,
    star: StarIcon,
    users: UserGroupIcon,
    trophy: TrophyIcon,
    target: ViewfinderCircleIcon,
    shield: ShieldCheckIcon,
    lightbulb: LightBulbIcon,
  };

  return iconMap[iconType as keyof typeof iconMap] || StarIcon;
};