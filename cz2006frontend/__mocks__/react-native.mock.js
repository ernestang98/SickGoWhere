jest.mock('react-native/Libraries/Image/resolveAssetSource', () => {
    return () => ({uri: 'asset://test.png'});
});

jest.mock('NativeEventEmitter', () => {
    function MockEventEmitter() {}
    MockEventEmitter.prototype.addListener = function() {};
    MockEventEmitter.prototype.removeListener = function() {};
    return MockEventEmitter;
});
