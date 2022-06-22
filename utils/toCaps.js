//to convert first letter of string to capital letter

export default function toCaps(str) {
  if (!str) {
    return;
  }
  return str[0]?.toUpperCase() + str?.slice(1);
}
