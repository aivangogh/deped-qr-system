import QRCode from 'react-qr-code';

export default function GenerateQRCode({ value }: { value: string }) {
  return (
    <>
      <div className="h-auto w-100 max-w-64 m-0 mx-auto">
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={value}
          viewBox={`0 0 256 256`}
        />
      </div>
    </>
  );
}