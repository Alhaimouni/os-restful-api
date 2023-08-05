export function tryCatcher(t, c) {
  try {
    t;
  } catch (e) {
    c;
  }
}
