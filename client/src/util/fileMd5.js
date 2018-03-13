import { Promise } from 'es6-promise';
import Crypto from "./Crypto";
import Md5 from "./md5";

let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
let chunkSize = 20 * 1024 * 1024;

export default {
  computeFileMd5BySpark: (option)=> {
    return new Promise((resolve, reject)=> {
      let file = option["file"];
      let chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      let spark = new SparkMD5.ArrayBuffer();
      let fileReader = new FileReader();
      let loadNext = () => {
        let start = currentChunk * chunkSize;
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      fileReader.onload = (e)=> {
        console.log("spark read chunk nr", currentChunk + 1, "of", chunks);
        spark.append(e.target.result);
        currentChunk++;
        option["onProgress"] && option["onProgress"](file, currentChunk / chunks);
        if (currentChunk < chunks) {
          loadNext();
        } else {
          let fileMd5 = spark.end();  // Compute hash
          console.info("spark file md5", fileMd5);
          resolve(fileMd5);
        }
      };
      fileReader.onerror = (e)=> {
        console.warn("spark file reader error", e);
        reject();
      };
      loadNext();
    });
  },
  computeFileMd5ByCrypto: (option)=> {
    return new Promise((resolve, reject)=> {
      let file = option["file"];
      let thisHash = [1732584193, -271733879, -1732584194, 271733878];
      let chunks = Math.ceil(file.size / chunkSize);
      let currentChunk = 0;
      let fileReader = new FileReader();
      let lastStart = 0;
      let lastEnd = 0;
      let loadNext = () => {
        let start = currentChunk * chunkSize;
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        lastStart = start;
        lastEnd = end;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }
      fileReader.onload = (e)=> {
        console.log("crypto read chunk nr", currentChunk + 1, "of", chunks);
        let uint8_array = new Uint8Array(e.target.result);
        let message = Crypto.util.endian(Crypto.util.bytesToWords(uint8_array));
        currentChunk++;
        option["onProgress"] && option["onProgress"](file, currentChunk / chunks);
        if (currentChunk < chunks) {
          thisHash = Md5.md5(message, thisHash);
          loadNext();
        } else {
          let nBitsTotal = file.size * 8;
          let nBitsLeft = (file.size % chunkSize) * 8;
          console.log(file.size % chunkSize, lastEnd - lastStart);
          message[nBitsLeft >>> 5] |= 0x80 << (nBitsLeft % 32);
          let nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
          let nBitsTotalL = nBitsTotal & 0xFFFFFFFF;
          message[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotalH;
          message[(((nBitsLeft + 64) >>> 9) << 4) + 14] = nBitsTotalL;
          thisHash = Md5.md5(message, thisHash);
          let fileMd5 = Crypto.util.bytesToHex(Crypto.util.wordsToBytes(Crypto.util.endian(thisHash)));
          console.info("crypto file md5", fileMd5);
          resolve(fileMd5);
        }
      };
      fileReader.onerror = (e)=> {
        console.warn("crypto file reader error", e);
        reject();
      };
      loadNext();
    });
  }
};
