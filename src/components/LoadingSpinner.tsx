'use client';

import { Oval } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <>
      <div className="h-screen w-screen grid place-items-center">
        <Oval
          height={40}
          width={40}
          color="#2462EB"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#2462EB"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      </div>
    </>
  );
}
