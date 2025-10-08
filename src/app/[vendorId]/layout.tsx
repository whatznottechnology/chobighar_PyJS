import { generateMetadata } from './metadata';

// Export metadata generation
export { generateMetadata };

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
