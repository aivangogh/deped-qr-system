'use client';

import { ColorRing } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </>
  );
}
