"use client";

import React, { useEffect, useRef, useState } from "react";
import Marzipano from "marzipano";
import { ChevronLeft, ChevronRight } from "lucide-react";

const VirtualTour = ({ images }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let viewer;
    let scene;

    if (containerRef.current) {
      // Initialize the Marzipano viewer
      viewer = new Marzipano.Viewer(containerRef.current);

      const loadScene = (imageUrl) => {
        const source = Marzipano.ImageUrlSource.fromString(imageUrl);
        const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

        const limiter = Marzipano.RectilinearView.limit.traditional(
          1024,
          (100 * Math.PI) / 180
        );
        const view = new Marzipano.RectilinearView(
          { yaw: 0, pitch: 0, fov: Math.PI / 2 },
          limiter
        );

        if (scene) {
          scene.destroy();
        }

        scene = viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
        });

        scene.switchTo();
      };

      loadScene(images[currentIndex]);
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [currentIndex, images]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Panorama Container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>

      {/* Navigation Buttons */}
      <button
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handlePrev}
        aria-label="Previous Image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handleNext}
        aria-label="Next Image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default VirtualTour;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Marzipano from "marzipano";

// const VirtualTour = ({ images }) => {
//   const containerRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     let viewer;
//     let scene;

//     if (containerRef.current) {
//       // Initialize the Marzipano viewer
//       viewer = new Marzipano.Viewer(containerRef.current);

//       const loadScene = (imageUrl) => {
//         // Create a new Marzipano source and geometry
//         const source = Marzipano.ImageUrlSource.fromString(imageUrl);
//         const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

//         const limiter = Marzipano.RectilinearView.limit.traditional(
//           1024,
//           (100 * Math.PI) / 180
//         );
//         const view = new Marzipano.RectilinearView(
//           { yaw: 0, pitch: 0, fov: Math.PI / 2 },
//           limiter
//         );

//         // Create the scene
//         if (scene) {
//           scene.destroy(); // Remove the previous scene
//         }

//         scene = viewer.createScene({
//           source: source,
//           geometry: geometry,
//           view: view,
//         });

//         scene.switchTo(); // Load the new scene
//       };

//       // Load the initial scene
//       loadScene(images[currentIndex]);
//       //   viewer.controls().enable();
//     }

//     return () => {
//       if (viewer) {
//         viewer.destroy(); // Cleanup viewer on unmount
//       }
//     };
//   }, [currentIndex, images]);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100vh" }}>
//       {/* Panorama Container */}
//       <div
//         ref={containerRef}
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       ></div>

//       {/* Navigation Buttons */}
//       <button
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "20px",
//           transform: "translateY(-50%)",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           cursor: "pointer",
//           zIndex: 10,
//         }}
//         onClick={handlePrev}
//       >
//         Prev
//       </button>

//       <button
//         style={{
//           position: "absolute",
//           top: "50%",
//           right: "20px",
//           transform: "translateY(-50%)",
//           backgroundColor: "rgba(0, 0, 0, 0.7)",
//           color: "white",
//           border: "none",
//           padding: "10px 20px",
//           cursor: "pointer",
//           zIndex: 10,
//         }}
//         onClick={handleNext}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default VirtualTour;
