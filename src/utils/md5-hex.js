import crypto from "crypto";

// Código retirado de: https://github.com/sindresorhus/md5-hex/blob/master/index.js
// para corrigir problema: http://bit.ly/2tRViJ9
const update = (buf, hash) => {
  const inputEncoding = typeof buf === "string" ? "utf8" : undefined;
  hash.update(buf, inputEncoding);
};

export default (...inputs) => {
  const hash = crypto.createHash("md5");
  inputs.forEach(input => update(input, hash));
  return hash.digest("hex");
};
