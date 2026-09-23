import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function DonutChart({
  data,
  totalValue,
  size = 200,
  strokeWidth = 20,
  animationDuration = 1,
  animationDelayPerSegment = 0.05,
  highlightOnHover = true,
  centerContent,
  onSegmentHover,
  className = "",
}) {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const internalTotalValue = useMemo(() => {
    if (totalValue !== undefined) {
      return totalValue;
    }

    return data.reduce(
      (sum, segment) => sum + segment.value,
      0
    );
  }, [data, totalValue]);

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    onSegmentHover?.(hoveredSegment);
  }, [hoveredSegment, onSegmentHover]);

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  let cumulativePercentage = 0;

  return (
    <div
      ref={null}
      className={`donut-chart ${className}`}
      style={{
        width: size,
        height: size,
      }}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="donut-chart-svg"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Data segments */}
        {data.map((segment, index) => {
          if (
            segment.value === 0 ||
            internalTotalValue === 0
          ) {
            return null;
          }

          const percentage =
            (segment.value / internalTotalValue) * 100;

          const segmentLength =
            (percentage / 100) * circumference;

          const strokeDasharray = `${segmentLength} ${circumference}`;

          const strokeDashoffset =
            (cumulativePercentage / 100) * circumference;

          const isActive =
            hoveredSegment?.label === segment.label;

          cumulativePercentage += percentage;

          return (
            <motion.circle
              key={segment.label || index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-strokeDashoffset}
              strokeLinecap="round"
              initial={{
                opacity: 0,
                strokeDashoffset: circumference,
              }}
              animate={{
                opacity: 1,
                strokeDashoffset: -strokeDashoffset,
              }}
              transition={{
                opacity: {
                  duration: 0.3,
                  delay:
                    index * animationDelayPerSegment,
                },
                strokeDashoffset: {
                  duration: animationDuration,
                  delay:
                    index * animationDelayPerSegment,
                  ease: "easeOut",
                },
              }}
              className={
                highlightOnHover
                  ? "donut-chart-segment donut-chart-segment-hoverable"
                  : "donut-chart-segment"
              }
              style={{
                filter: isActive
                  ? `drop-shadow(0px 0px 6px ${segment.color}) brightness(1.1)`
                  : "none",

                transform: isActive
                  ? "scale(1.03)"
                  : "scale(1)",
              }}
              onMouseEnter={() => {
                setHoveredSegment(segment);
              }}
            />
          );
        })}
      </svg>

      {/* Center content */}
      {centerContent && (
        <div
          className="donut-chart-center"
          style={{
            width: size - strokeWidth * 2.5,
            height: size - strokeWidth * 2.5,
          }}
        >
          {centerContent}
        </div>
      )}
    </div>
  );
}

export default DonutChart;