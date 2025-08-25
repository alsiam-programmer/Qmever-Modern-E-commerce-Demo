import React, { useState, useRef, useEffect } from "react";

const ZoomableImage = ({ src, alt, maxZoom = 3, minZoom = 1 }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const containerRef = useRef(null);
  const [lastPinchDistance, setLastPinchDistance] = useState(null);

  // constrain position to container bounds based on zoom
  const constrainPosition = (x, y, currentZoom = zoom) => {
    if (!containerRef.current) return { x, y };
    const container = containerRef.current;
    const limitX = Math.max((container.offsetWidth * currentZoom - container.offsetWidth) / 2, 0);
    const limitY = Math.max((container.offsetHeight * currentZoom - container.offsetHeight) / 2, 0);
    return {
      x: Math.min(Math.max(x, -limitX), limitX),
      y: Math.min(Math.max(y, -limitY), limitY),
    };
  };

  // handle zoom (wheel)
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newZoom = Math.min(Math.max(zoom + delta, minZoom), maxZoom);
    setPosition(prev => constrainPosition(prev.x, prev.y, newZoom));
    setZoom(newZoom);
  };

  // double click to toggle zoom
  const handleDoubleClick = () => {
    const newZoom = zoom === 1 ? 2 : 1;
    setZoom(newZoom);
    setPosition(constrainPosition(position.x, position.y, newZoom));
  };

  // mouse drag
  const handleMouseDown = (e) => {
    if (zoom > 1) setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (dragStart) setPosition(constrainPosition(e.clientX - dragStart.x, e.clientY - dragStart.y));
  };
  const handleMouseUp = () => setDragStart(null);

  // touch start
  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && zoom > 1) {
      const touch = e.touches[0];
      setTouchStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      setLastPinchDistance(Math.sqrt(dx * dx + dy * dy));
    }
  };

  // touch move
  const handleTouchMove = (e) => {
    if (touchStart && e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition(constrainPosition(touch.clientX - touchStart.x, touch.clientY - touchStart.y));
    } else if (e.touches.length === 2 && lastPinchDistance) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scaleChange = distance / lastPinchDistance;
      const newZoom = Math.min(Math.max(zoom * scaleChange, minZoom), maxZoom);
      setZoom(newZoom);
      setLastPinchDistance(distance);
    }
  };

  // touch end
  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) setLastPinchDistance(null);
    if (e.touches.length === 0) setTouchStart(null);
  };

  // recalc position whenever zoom changes
  useEffect(() => {
    setPosition(prev => constrainPosition(prev.x, prev.y, zoom));
  }, [zoom]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        cursor: zoom > 1 ? (dragStart ? "grabbing" : "grab") : "auto",
        touchAction: "none",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
          transformOrigin: "center center",
          transition: dragStart || touchStart ? "none" : "transform 0.2s ease",
          userSelect: "none",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "all",
        }}
        draggable={false}
      />
    </div>
  );
};

export default ZoomableImage;
