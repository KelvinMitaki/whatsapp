export default (color?: string, width?: number) => ({
  borderColor: color ? color : "red",
  borderWidth: width ? width : 2
});
