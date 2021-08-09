export default (function () {

    let setZoomingFactor = function () {
        // eslint-disable-next-line no-restricted-globals
        let width = screen.width;

        if (width === 1280) { // Detected 1280 x 800 resolution
            document.body.style.zoom = '110%';
            window.tabletConfig = {zoomingFact: 1.1};
        }
    };

    return {
        setZoomingFactor: setZoomingFactor
    };
})();