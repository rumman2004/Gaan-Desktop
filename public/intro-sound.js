/*
 * Gaan's launch sound: a ~3.5s sonic logo, synthesised live with the Web Audio API (no audio files).
 * Scored against src/intro.css / public/intro-light.js, on the same clock (seconds from the intro's first frame):
 *
 *   0.00  sub "thump" + soft click as the badge springs in; spark shimmer
 *   0.40  four glassy bell pings, one per ripple ring (D major pentatonic, rising)
 *   0.40-1.40  light-trace: filtered-noise whoosh + a gliding tone follows the comet around the badge
 *   1.18-1.45  glass shimmer arpeggio as the sheen crosses the logo
 *   1.50  slide: short downward air sweep (peaks mid-slide)
 *   1.60  "ta-dum" resolve: low D boom + a Dmaj9 chord, plucked letter by letter with the wordmark rising
 *   idle  warm pad rings out under the logo's breathing
 *
 * Web Audio runs on the browser's audio thread, so app startup can't stall it.
 * API (window.GAANIntroSound): prepare(), start(epochMs), play() (replay now), stop(). Opt out: localStorage["gaan:introSound"] = "off".
 */
(function () {
  "use strict";
  var AC = window.AudioContext || window.webkitAudioContext;
  var ctx = null;
  var master = null;
  var wet = null;
  var noiseBuf = null;
  var started = false;
  var closeTimer = 0;

  function enabled() {
    try {
      return localStorage.getItem("gaan:introSound") !== "off";
    } catch (e) {
      return true;
    }
  }

  // Synthetic reverb tail: decaying stereo noise, darkened with a one-pole lowpass.
  function impulse(seconds) {
    var rate = ctx.sampleRate;
    var len = Math.floor(rate * seconds);
    var buf = ctx.createBuffer(2, len, rate);
    for (var c = 0; c < 2; c++) {
      var d = buf.getChannelData(c);
      var lp = 0;
      for (var i = 0; i < len; i++) {
        var decay = Math.pow(1 - i / len, 3.2);
        lp += ((Math.random() * 2 - 1) * decay - lp) * 0.35;
        d[i] = lp;
      }
    }
    return buf;
  }

  function prepare() {
    if (!AC || ctx || !enabled()) return;
    try {
      ctx = new AC({ latencyHint: "interactive" });
    } catch (e) {
      ctx = null;
      return;
    }
    var comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 12;
    comp.ratio.value = 3;
    comp.attack.value = 0.005;
    comp.release.value = 0.2;
    master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(comp);
    comp.connect(ctx.destination);

    var conv = ctx.createConvolver();
    conv.buffer = impulse(2.2);
    wet = ctx.createGain();
    wet.gain.value = 0.5;
    wet.connect(conv);
    conv.connect(master);

    var n = ctx.sampleRate * 2;
    noiseBuf = ctx.createBuffer(1, n, ctx.sampleRate);
    var nd = noiseBuf.getChannelData(0);
    for (var i = 0; i < n; i++) nd[i] = Math.random() * 2 - 1;

    // Keep the audio device and its clock running while the page boots, so the first notes aren't eaten by device start-up.
    var warm = ctx.createConstantSource();
    var mute = ctx.createGain();
    mute.gain.value = 0;
    warm.connect(mute);
    mute.connect(ctx.destination);
    warm.start();

    if (ctx.state === "suspended") ctx.resume().catch(function () {});
  }

  // Tuning: milliseconds added to the visuals' start time. Positive = sound later. The default covers the
  // 1-2 frames a CSS animation takes to reach the screen after its timeline start. Override with
  // localStorage["gaan:introSoundOffset"] = "-40" etc.
  function offsetMs() {
    try {
      var v = parseFloat(localStorage.getItem("gaan:introSoundOffset"));
      return isFinite(v) ? v : 30;
    } catch (e) {
      return 30;
    }
  }

  // performance.now()-timebase moment -> AudioContext time at which that moment is HEARD. getOutputTimestamp()
  // pairs a context time with the performance time it is leaving the speakers, so this tracks the device's
  // real clock and latency instead of assuming currentTime follows the wall clock (it doesn't while the
  // device is starting up).
  function contextTimeAt(perfMs) {
    var ts = ctx.getOutputTimestamp ? ctx.getOutputTimestamp() : null;
    if (ts && ts.performanceTime > 0 && ts.contextTime > 0) return ts.contextTime + (perfMs - ts.performanceTime) / 1000;
    var lat = ctx.outputLatency || ctx.baseLatency || 0;
    return ctx.currentTime + (perfMs - performance.now()) / 1000 - lat;
  }

  // Dry to master, plus a reverb send; optional stereo pan.
  function route(node, send, pan) {
    var tail = node;
    if (pan && ctx.createStereoPanner) {
      var p = ctx.createStereoPanner();
      p.pan.value = pan;
      node.connect(p);
      tail = p;
    }
    tail.connect(master);
    if (send) {
      var s = ctx.createGain();
      s.gain.value = send;
      tail.connect(s);
      s.connect(wet);
    }
  }

  function env(g, t, peak, att, dec) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t + att + dec);
  }

  function osc(type, f0, f1, t, att, dec, peak, send, pan) {
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + att + dec);
    env(g, t, peak, att, dec);
    o.connect(g);
    route(g, send, pan);
    o.start(t);
    o.stop(t + att + dec + 0.05);
  }

  function noise(t, dur, type, f0, f1, q, peak, att, send, pan) {
    var src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    src.loop = true;
    var f = ctx.createBiquadFilter();
    var g = ctx.createGain();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    env(g, t, peak, att, dur - att);
    src.connect(f);
    f.connect(g);
    route(g, send, pan);
    src.start(t);
    src.stop(t + dur + 0.05);
  }

  // Glassy bell: fundamental plus inharmonic partials.
  function bell(f, t, peak, dec, pan) {
    osc("sine", f, 0, t, 0.004, dec, peak, 0.7, pan);
    osc("sine", f * 2.76, 0, t, 0.003, dec * 0.45, peak * 0.28, 0.7, pan);
    osc("sine", f * 5.4, 0, t, 0.002, dec * 0.2, peak * 0.1, 0.7, pan);
  }

  function pluck(f, t, peak, pan) {
    osc("triangle", f, 0, t, 0.006, 1.1, peak, 0.55, pan);
    osc("sine", f * 2, 0, t, 0.004, 0.5, peak * 0.3, 0.55, pan);
  }

  function score(b) {
    // 0.00: the badge pops. Sub thump, click, spark shimmer.
    osc("sine", 78, 40, b, 0.006, 0.7, 0.85, 0.1, 0);
    noise(b, 0.05, "highpass", 3000, 3200, 0.7, 0.18, 0.002, 0.2, 0);
    noise(b, 0.4, "bandpass", 4200, 7200, 1.2, 0.16, 0.01, 0.5, 0);
    osc("sine", 82, 82, b + 0.27, 0.01, 0.25, 0.08, 0.1, 0); // spring settle tick

    // 0.40-1.40: light trace. Air whoosh + gliding tone follow the comet.
    noise(b + 0.4, 1.1, "bandpass", 380, 6500, 3.5, 0.34, 0.5, 0.45, 0);
    osc("sine", 293.66, 1174.66, b + 0.4, 0.5, 0.6, 0.07, 0.5, 0.15);

    // 0.40-0.82: ripple rings, one bell each, rising through D major pentatonic.
    var notes = [880, 1174.66, 1479.98, 1760];
    for (var i = 0; i < 4; i++) bell(notes[i], b + 0.4 + i * 0.14, 0.17 - i * 0.015, 1.3, i % 2 ? 0.25 : -0.25);

    // 1.18-1.45: sheen shimmer, centred on when the gradient band crosses the logo (~1.3s).
    var sh = [2349.32, 2959.96, 3520, 4698.64];
    for (var j = 0; j < sh.length; j++) osc("sine", sh[j], 0, b + 1.18 + j * 0.07, 0.01, 0.55, 0.045, 0.8, j % 2 ? 0.4 : -0.4);
    noise(b + 1.1, 0.45, "highpass", 5000, 9000, 0.8, 0.05, 0.25, 0.6, 0);

    // 1.50-2.00: the badge slides (fastest at ~1.7s). Short downward air sweep.
    noise(b + 1.5, 0.5, "lowpass", 3500, 300, 0.8, 0.12, 0.2, 0.3, 0);

    // 1.60: resolve. Boom, then Dmaj9 plucked letter by letter, then the pad rings out.
    var r = b + 1.6;
    osc("sine", 73.42, 36.7, r, 0.008, 1.1, 0.7, 0.15, 0);
    osc("triangle", 73.42, 73.42, r, 0.02, 1.4, 0.12, 0.2, 0);
    var chord = [293.66, 369.99, 440, 659.25]; // D4 F#4 A4 E5, one per letter
    for (var k = 0; k < 4; k++) pluck(chord[k], r + k * 0.06, 0.2, [-0.3, -0.1, 0.1, 0.3][k]);
    osc("sine", 146.83, 146.83, r, 0.05, 1.8, 0.16, 0.5, 0); // D3 pad
    osc("sine", 220, 220, r, 0.08, 1.7, 0.1, 0.5, -0.15); // A3 pad
    osc("sine", 587.33, 587.33, r + 0.1, 0.08, 1.6, 0.05, 0.8, 0.2); // D5 sparkle
  }

  function start(epochMs) {
    if (!ctx || started) return;
    started = true;
    var run = function () {
      if (!ctx) return;
      var perfMs = epochMs - performance.timeOrigin + offsetMs();
      var b = contextTimeAt(perfMs);
      // Negative lead = we're behind the visuals: notes already due start immediately, later ones stay on time.
      b = Math.min(b, ctx.currentTime + 2);
      try {
        if (localStorage.getItem("gaan:introSoundDebug")) console.debug("[intro-sound] lead ms:", Math.round((b - ctx.currentTime) * 1000));
      } catch (e) {}
      score(b);
      clearTimeout(closeTimer);
      closeTimer = setTimeout(release, 6500);
    };
    ctx.resume().then(run, run);
  }

  function release() {
    var c = ctx;
    ctx = master = wet = noiseBuf = null;
    started = false;
    if (c) c.close().catch(function () {});
  }

  function stop() {
    if (!ctx || !master) return;
    var t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0, t + 0.25);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(release, 400);
  }

  window.GAANIntroSound = {
    prepare: prepare,
    start: start,
    stop: stop,
    // Replay now (for when intro.ts replays the intro).
    play: function () {
      release();
      prepare();
      start(performance.timeOrigin + performance.now());
    },
  };
})();