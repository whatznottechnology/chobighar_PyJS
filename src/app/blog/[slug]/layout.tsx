import { generateMetadata } from './metadata';

export { generateMetadata };

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
