import { Readable } from 'stream';

export const toStream = (buf, chunkSize = undefined) => {
  if (typeof buf === 'string') {
    buf = Buffer.from(buf, 'utf8');
  }
  if (!Buffer.isBuffer(buf)) {
    throw new TypeError(
      `"buf" argument must be a string or an instance of Buffer`,
    );
  }

  const reader = new Readable() as any;
  const hwm = reader._readableState.highWaterMark;

  // If chunkSize is invalid, set to highWaterMark.
  if (
    !chunkSize ||
    typeof chunkSize !== 'number' ||
    chunkSize < 1 ||
    chunkSize > hwm
  ) {
    chunkSize = hwm;
  }

  const len = buf.length;
  let start = 0;

  // Overwrite _read method to push data from buffer.
  reader._read = function () {
    while (reader.push(buf.slice(start, (start += chunkSize)))) {
      // If all data pushed, just break the loop.
      if (start >= len) {
        reader.push(null);
        break;
      }
    }
  };
  return reader;
};
