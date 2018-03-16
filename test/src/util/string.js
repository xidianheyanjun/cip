/**
 * Created by Administrator on 2017/4/14.
 */

let format = (str, obj)=> {
  if (!str || !obj) {
    return "";
  }

  let result = str;
  for (let key in obj) {
    result = result.replace(new RegExp("({" + key + "})", "g"), obj[key]);
  }
  return result;
};

let trim = (str) => {
  return !str ? "" : str.replace(/(^\s*)|(\s*$)|(\ )/g, '');
};

export default {
  format: format,
  trim: trim
};
