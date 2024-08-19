
console.log("hello")
const Fili = window.Fili
var iirCalculator = new Fili.CalcCascades();

var availableFilters = iirCalculator.available();

// calculate filter coefficients
var iirFilterCoeffs = iirCalculator.lowpass({
    order: 3, // cascade 3 biquad filters (max: 12)
    characteristic: 'butterworth',
    Fs: 1000, // sampling frequency
    Fc: 100, // cutoff frequency / center frequency for bandpass, bandstop, peak
    BW: 1, // bandwidth only for bandstop and bandpass filters - optional
    gain: 0, // gain for peak, lowshelf and highshelf
    preGain: false // adds one constant multiplication for highpass and lowpass
    // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
  });
console.log(iirFilterCoeffs)
  
// create a filter instance from the calculated coeffs
var iirFilter = new Fili.IirFilter(iirFilterCoeffs);
console.log(iirFilter)

for (var cnt = 0; cnt < 10; cnt++) {
  // console.log(iirFilter.singleStep(cnt));
}

// run the filter from input array
// returns array
// console.log(iirFilter.multiStep([1,10,-5,3,1.112,17]));

// simulate the filter
// does not change the internal state
// returns array
// console.log(iirFilter.simulate([-3,-2,-1,5,6,33]));

// get the filter impact on magnitude, phase, unwrapped phase, phase delay and group delay
// returns array of n objects
// Fs = 1000 n = 100, so the array represents 0Hz, 10Hz, 20Hz....
// returns array of objects
// {dBmagnitude: -4, groupDelay: 2, magnitude: 0, phase: -7, phaseDelay: 12, unwrappedPhase: 7}
var response = iirFilter.response(100);
console.log(response)

// get the filter impact on magnitude, phase, unwrapped phase, phase delay and group delay
// for a defined frequency
// returns one object
var responsePoint = iirFilter.responsePoint({
    Fs: 1000,  // sampling frequency
    Fr: 123 // frequency of interest
  });