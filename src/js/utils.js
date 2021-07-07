export default function sortArrays(prop, list) {
  return list.sort((a, b) => a[prop] - b[prop]);
}
