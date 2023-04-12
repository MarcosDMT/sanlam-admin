import moment from "moment/moment";

export const isEvenNumber = (num) => {
  return num % 2 === 0;
};
export const isLastIndex = (arrayLength, index) => {
  return arrayLength - 1 === index;
};
export const calculateAge = (date) => {
  if (date) {
    return new moment().diff(moment(date, "DD MMM YYYY"), "years");
  }
  return null;
};

export function checkIfFilesAreTooBig(files) {
  let valid = true;
  if (files) {
    files.map((file) => {
      const size = file.size / 1024 / 1024;
      if (size > 10) {
        valid = false;
      }
    });
  }
  return valid;
}
export function checkIfFilesAreCorrectType(files) {
  let valid = true;
  if (files) {
    files.map((file) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}
export function e(string) {
  let newString;
  if (string) {
    newString = string.toString().replace(/(<([^>]+)>)/gi, "");
    // if (newString){
    //     newString = mysql_real_escape_string(newString);
    // }
    return newString;
  }
}

function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, "");
}
export const getInitials = (name = "") =>
  name
    ?.replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const getAutoCompleteValue = (
  options,
  value,
  field = "id",
  intVal = { id: "", name: "" }
) => {
  return Array.isArray(options)
    ? options.find((option) => option[field] === value) ?? null
    : null;
};
