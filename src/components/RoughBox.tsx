import { useRef, useEffect, type ReactNode } from "react";

interface RoughBoxProps {
  children: ReactNode;
  className?: string;
  fillColor?: string;
  strokeColor?: string;
  roughness?: number;
  padding?: string;
}

export default function RoughBox({
  children,
  className = "",
  fillColor,
  strokeColor = "var(--color-ink, #3b2f1e)",
  roughness = 1.5,
  padding = "p-6",
}: RoughBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const draw = async () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const { default: rough } = await import("roughjs");
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w + 8;
      canvas.height = h + 8;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

      rc.rectangle(4, 4, w, h, {
        roughness,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: fillColor,
        fillStyle: fillColor ? "cross-hatch" : undefined,
        fillWeight: fillColor ? 0.5 : undefined,
        bowing: 2,
      });
    };

    draw();
    const resizeObserver = new ResizeObserver(() => draw());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [fillColor, strokeColor, roughness]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute -top-1 -left-1 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className={`relative z-[1] ${padding}`}>{children}</div>
    </div>
  );
}
