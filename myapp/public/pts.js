const canvas = document.getElementById("pt");
canvas.width = canvas.offsetWidth;
canvas.height = 100;

Pts.quickStart( "#pt", "#ffffff" );
    
        (function() {
          var de = new Delaunay();
          var triangles = [];
          var cells = [];
          var lastPt = new Pt();
    
          let repel = (size) => {
            for (let k = 0, len = de.length; k < len; k++) {
              for (let i = 0; i < len; i++) {
                if (i !== k) {
                  let d = de[k].$subtract(de[i]);
                  if (d.magnitudeSq() < size * size) {
                    de[k].subtract(d.$divide(-size / 3));
                    de[i].subtract(d.$divide(size / 3));
                  }
                }
              }
            }
          };
    
          space.add({
            start: (bound) => {
              de = Create.delaunay(Create.distributeRandom(space.innerBound, 20));
              triangles = de.delaunay();
              cells = de.voronoi();
            },
    
            animate: (time, ftime) => {
              form.strokeOnly("#ff7f50", 1.5).polygons(triangles);
              form.fill("#007aff").points(de, 6, "circle");
              form.strokeOnly("#32cd32", 1).polygons(cells);
    
              if (de.length >= 20) {
                de[de.length - 1] = space.pointer;
                repel(70);
                triangles = de.delaunay();
                cells = de.voronoi();
    
                let nearIndex = Polygon.nearestPt(de, space.pointer);
                de.neighbors(nearIndex, true).map((n) => {
                  form.strokeOnly("rgba(0, 123, 255, 0.9)", 3).polygon(n.triangle);
                  form.strokeOnly("rgba(0, 123, 255, 0.3)", 1).circle(n.circle);
                  form.fillOnly("#ffe066").point(n.circle[0], 3);
                });
              }
            },
    
            action: (type, x, y) => {
              if (type === "move" && de.length < 100) {
                let p = new Pt(x, y);
                if (lastPt.$subtract(p).magnitudeSq() > 400) {
                  lastPt = p;
                  de.push(p);
                  triangles = de.delaunay();
                  cells = de.voronoi();
                }
              }
            }
          });
    
          space.bindMouse().bindTouch().play();
    
        })();
