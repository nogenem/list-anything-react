import querystring from "querystring";
import md5Hex from "./md5-hex";

const BASE_URL = "https://gravatar.com/avatar/";

// Código retirado de: https://github.com/sindresorhus/gravatar-url/blob/master/index.js
// para corrigir problema: http://bit.ly/2tRViJ9
export default (email, opts) => {
  if (email.indexOf("@") === -1) {
    throw new Error("Please specify an email");
  }

  const query = querystring.stringify(opts);
  return (
    BASE_URL + md5Hex(email.toLowerCase().trim()) + (query ? `?${query}` : "")
  );
};
