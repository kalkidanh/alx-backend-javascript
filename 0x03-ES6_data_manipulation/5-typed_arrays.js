export default function createInt8TypedArray(length, position, value) {
  if (position >= length) throw new Error('Position outside range');
  const buffer = new ArrayBuffer(length); // create a buffer of length
  const dataView = new DataView(buffer, 0, length);

  dataView.setInt8(position, value);
  return dataView;
}
