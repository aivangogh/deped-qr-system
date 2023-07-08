const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;

function base64Parser(dataURL: string): Buffer | ArrayBuffer | false {
  if (typeof dataURL !== 'string' || !base64Regex.test(dataURL)) {
    return false;
  }

  const validBase64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

  if (!validBase64.test(dataURL)) {
    throw new Error(
      'Error parsing base64 data, your data contains invalid characters'
    );
  }

  const stringBase64 = dataURL.replace(base64Regex, '');

  // For nodejs, return a Buffer
  if (typeof Buffer !== 'undefined' && Buffer.from) {
    return Buffer.from(stringBase64, 'base64');
  }

  // For browsers, return an ArrayBuffer
  const binaryString = window.atob(stringBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes.buffer;
}

export default base64Parser;