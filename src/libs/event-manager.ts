export function toFit(
  callback: Function,
  { dismissCondition = () => false, triggerCondition = () => true },
) {
  if (!callback) {
    throw Error('Invalid required arguments');
  }

  let tick = false;
  return function() {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }

      if (triggerCondition()) {
        tick = false;
        return callback();
      }
    });
  };
}
