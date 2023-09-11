import HrtdAuthLayout from '@/layouts/HrtdAuthLayout';

export default function TrainingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HrtdAuthLayout>
        <div className="container pt-4">{children}</div>
      </HrtdAuthLayout>
    </>
  );
}
