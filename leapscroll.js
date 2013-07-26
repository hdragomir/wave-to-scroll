(function (Leap) {
  "use strict";
  const treshold = 0.7;
  const amplifier_x = 5;
  const amplifier_y = -7;
  var compare_to = null;
  Leap && Leap.loop(function (frame) {
    if (!frame.valid || frame.pointables.length < 3 || frame.hands.length !== 1) {
      compare_to = null;
      return;
    }
    if (compare_to) {
      var t = compare_to.translation(frame),
        mx = t[0],
        my = t[1];
      Math.abs(mx) > treshold || (mx = 0);
      Math.abs(my) > treshold || (my = 0);
      (mx || my) && window.scrollBy(mx * amplifier_x, my * amplifier_y);
    }
    compare_to = frame;
  });
} (typeof Leap !== "undefined" ? Leap : null));
