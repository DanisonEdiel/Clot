export function onlyNumber(e: any) {
  var k = e.which;

  if ((k < 48 || k > 57) && (k < 96 || k > 105) && k != 8) {
    e.preventDefault();
    return false;
  }
}
