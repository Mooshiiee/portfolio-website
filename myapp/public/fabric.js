// Script to help scroll on mobile
(function() {
  var addListener = fabric.util.addListener,
      removeListener = fabric.util.removeListener,
      addEventOptions = { passive: false };

  fabric.util.object.extend(fabric.Canvas.prototype, {
    _onTouchStart: function(e) {
      var targetR = this.findTarget(e);
      !this.allowTouchScrolling && e.preventDefault && e.preventDefault();
      targetR && e.preventDefault && e.preventDefault();
      if (this.mainTouchId === null) {
        this.mainTouchId = this.getPointerId(e);
      }
      this.__onMouseDown(e);
      this._resetTransformEventData();
      var canvasElement = this.upperCanvasEl,
          eventTypePrefix = this._getEventPrefix();
      addListener(fabric.document, 'touchend', this._onTouchEnd, addEventOptions);
      addListener(fabric.document, 'touchmove', this._onMouseMove, addEventOptions);
      removeListener(canvasElement, eventTypePrefix + 'down', this._onMouseDown);
    }
  });
})();

// Initialize Fabric canvas to match container size
const container = document.querySelector('#featuredBanner');
const canvas2 = new fabric.Canvas('canvasBanner', {
  width: container.offsetWidth,
  height: container.offsetHeight,
  allowTouchScrolling: true,
});

// Create interactive random shapes
function createRandomObject() {
  const types = ['rect2', 'circle2', 'triangle2'];
  const type = types[Math.floor(Math.random() * types.length)];
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  let obj;
  switch(type) {
    case 'rect2':
      obj = new fabric.Rect({ width: 60, height: 60, fill: color, opacity: 0.7 });
      break;
    case 'circle2':
      obj = new fabric.Circle({ radius: 30, fill: color, opacity: 0.7 });
      break;
    case 'triangle2':
      obj = new fabric.Triangle({ width: 60, height: 60, fill: color, opacity: 0.7 });
      break;
  }

  obj.set({
    left: Math.random() * (canvas2.width - 60),
    top: Math.random() * (canvas2.height - 60),
    cornerColor: '#2c3e50',
    cornerStrokeColor: '#2c3e50',
    borderColor: '#2c3e50',
    cornerSize: 6,
    transparentCorners: false
  });

  return obj;
}

// Add text
const text2 = new fabric.Text('Hello, nice to meet you!', {
  left: 980,
  top: 30,
  fontFamily: 'Arial',
  fill: '#2c3e50',
  fontSize: 20
});

// Array of image paths
const imagePaths = [
  '/images/me',
  '/images/owl.png'
];

// Load and randomly place each image
imagePaths.forEach(path => {
  fabric.Image.fromURL(path, function(img) {
    img.set({
      left: Math.random() * (canvas2.width + 100),
      top: Math.random() * (canvas2.height - 600),
      angle: Math.random() * 30 - 15 // random angle between -15 and 15
    });
    img.scaleToWidth(180 + Math.random() * 20); // width between 140 and 200
    canvas2.add(img);
  });
});


fabric.Image.fromURL('/images/me.jpg', function(oimg) { 
    img = oimg.set({left: 650, top: 120, angle:2}) 
    img.scaleToWidth(650) 
    canvas2.add(img) 
})

// Create static shapes
const rect2 = new fabric.Rect({
  left: 100,
  top: 100,
  fill: '#3498db',
  width: 60,
  height: 60,
  opacity: 0.8
});

const circle2 = new fabric.Circle({
  left: 300,
  top: 150,
  fill: '#e74c3c',
  radius: 30,
  opacity: 0.8
});

canvas2.add(rect2, circle2, text2);

// Add multiple random shapes
for (let i = 0; i < 10; i++) {
  canvas2.add(createRandomObject());
}

// Make canvas responsive
window.addEventListener('resize', () => {
  canvas2.setDimensions({
    width: container.offsetWidth,
    height: container.offsetHeight
  });
});
