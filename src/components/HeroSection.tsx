import { useEffect, useState } from "react";
import { motion, useReducedMotion, Easing } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import HeroSearchBar from "./HeroSearchBar";

const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

/**
 * These are the car-related subpaths extracted from your uploaded SVG.
 * (We intentionally do NOT include the huge full-canvas/background subpaths.)
 */
const CAR_PATHS: string[] = [
  `M 279.23 243.52 C260.52,245.65 253.40,245.97 228.00,245.86 C195.15,245.71 185.09,244.68 179.57,240.92 C174.42,237.41 174.60,233.75 180.08,230.96 C183.08,229.43 184.50,229.17 185.46,229.96 C186.44,230.78 189.21,229.64 196.63,225.38 C202.06,222.26 207.62,218.93 209.00,217.98 C215.01,213.83 261.73,190.00 273.00,185.34 C290.76,178.01 294.72,177.00 309.50,176.04 C348.17,173.53 423.34,173.94 426.08,176.68 C426.77,177.37 424.73,179.58 419.80,183.50 C415.78,186.68 402.93,198.89 391.23,210.61 L 369.95 231.92 L 356.23 233.88 C328.93,237.78 319.94,238.91 279.23,243.52 Z`,
  `M 573.29 280.31 C569.27,282.34 561.49,282.17 554.00,279.89 C550.42,278.80 544.98,277.95 541.91,278.00 C535.81,278.10 534.61,277.30 533.70,272.50 C533.12,269.43 535.43,259.51 537.25,257.24 C538.22,256.04 537.97,252.05 536.41,243.59 C535.84,240.50 535.96,239.86 537.00,240.50 C538.00,241.12 538.16,240.74 537.67,238.91 C537.32,237.58 537.02,235.49 537.01,234.25 C537.01,232.88 536.39,232.00 535.44,232.00 C533.07,232.00 534.21,230.78 546.31,220.34 C552.47,215.04 561.28,207.13 565.89,202.78 C575.76,193.46 575.75,193.41 563.00,190.03 C558.33,188.79 552.10,186.93 549.16,185.89 C546.22,184.85 543.67,184.00 543.48,184.00 C542.93,184.00 525.60,198.25 524.50,199.61 C522.98,201.49 514.97,207.35 509.70,210.43 C504.82,213.29 486.89,220.57 481.27,221.97 C478.32,222.71 478.13,222.62 479.06,220.89 C479.62,219.85 479.82,219.00 479.52,219.00 C479.22,219.00 479.64,217.41 480.45,215.46 L 481.93 211.91 L 477.22 208.89 L 472.50 205.86 L 459.50 206.21 C445.12,206.60 441.65,207.72 435.19,214.09 C432.63,216.62 431.95,218.04 432.19,220.42 C432.64,224.86 435.97,226.36 443.50,225.54 C456.81,224.10 460.81,223.12 467.66,219.64 C471.61,217.64 475.07,216.00 475.36,216.00 C475.99,216.00 475.37,219.59 474.50,221.00 C474.16,221.55 474.47,222.02 475.19,222.04 C475.91,222.06 475.26,222.75 473.75,223.57 C472.24,224.39 471.00,225.66 471.00,226.39 C471.00,227.29 469.09,227.90 465.16,228.25 C461.95,228.54 457.84,229.55 456.03,230.48 C453.68,231.70 452.53,231.86 452.04,231.06 C451.65,230.44 450.59,230.22 449.68,230.57 C448.76,230.92 448.22,231.55 448.48,231.97 C449.24,233.19 437.52,243.83 434.62,244.56 C432.82,245.01 431.16,244.63 429.36,243.36 C421.41,237.73 418.20,236.04 415.45,236.02 C413.78,236.01 408.38,235.14 403.45,234.08 C398.53,233.03 392.86,231.96 390.86,231.71 C388.85,231.45 386.76,230.97 386.20,230.63 C383.86,229.18 421.88,190.86 433.02,183.43 C448.67,173.00 466.47,169.74 504.50,170.36 C529.94,170.78 532.28,171.14 544.43,176.51 C547.54,177.89 553.10,180.98 556.79,183.39 C562.85,187.34 564.22,187.81 571.00,188.25 C578.51,188.73 590.00,192.73 590.00,194.86 C590.00,195.39 586.29,198.87 581.75,202.60 C568.40,213.57 559.00,223.06 559.00,225.56 C559.00,226.79 561.55,231.32 564.67,235.64 C582.92,260.94 584.22,263.00 583.55,265.66 C582.47,269.96 576.27,278.81 573.29,280.31 Z`,
  `M 289.39 339.25 C295.80,344.72 298.00,345.98 298.00,344.20 C298.00,343.76 291.92,337.64 284.50,330.59 C277.08,323.55 271.00,317.25 271.00,316.59 C271.00,315.25 293.97,292.44 304.27,283.56 C308.00,280.34 310.82,277.49 310.55,277.22 C309.48,276.15 294.60,288.50 280.67,302.00 L 266.06 316.17 L 248.78 318.04 C239.28,319.07 227.45,320.37 222.50,320.94 C217.55,321.50 210.68,322.25 207.23,322.61 C203.78,322.97 200.68,323.71 200.34,324.26 C199.66,325.36 209.13,324.80 230.00,322.51 C236.88,321.76 248.04,320.61 254.81,319.96 L 267.12 318.77 L 274.88 326.14 C279.15,330.19 285.68,336.09 289.39,339.25 Z`,
  `M 104.50 355.42 C105.32,355.56 106.09,355.69 106.79,355.80 C112.22,356.73 114.21,357.06 114.78,356.31 C115.11,355.88 114.98,355.09 114.76,353.85 C114.71,353.57 114.66,353.26 114.61,352.94 L 113.96 348.87 L 118.73 349.39 C121.35,349.68 122.60,349.68 121.50,349.38 C120.40,349.09 117.77,348.40 115.67,347.86 C112.96,347.17 112.00,346.45 112.39,345.44 C113.06,343.68 111.38,343.50 110.64,345.25 C110.27,346.14 109.79,345.98 108.98,344.69 C108.08,343.28 107.54,343.14 106.43,344.06 C104.73,345.47 100.00,344.47 100.00,342.70 C100.00,341.31 107.83,341.57 109.37,343.02 C109.85,343.47 110.86,343.61 111.62,343.31 C113.34,342.65 113.44,338.38 111.75,337.74 C109.17,336.76 90.90,333.77 90.42,334.25 C90.14,334.52 90.45,338.86 91.09,343.89 C92.42,354.24 91.20,353.19 104.50,355.42 Z`,
  `M 89.80 300.20 C88.04,304.49 86.26,308.00 85.84,308.00 C85.07,308.00 83.39,305.37 82.97,303.50 C82.85,302.95 82.51,301.90 82.23,301.16 C81.95,300.42 82.42,298.40 83.27,296.66 C86.27,290.57 105.80,267.76 107.25,268.66 C107.73,268.95 107.31,269.79 106.31,270.52 C105.31,271.24 104.49,272.21 104.47,272.67 C104.46,273.13 103.73,274.62 102.84,276.00 C97.34,284.56 92.57,293.41 89.80,300.20 Z`,
  `M 568.46 313.93 C568.82,314.52 570.10,315.00 571.31,315.01 C574.52,315.01 603.37,309.81 604.23,309.07 C604.63,308.72 603.35,307.57 601.38,306.51 C597.82,304.59 597.76,304.59 589.65,306.82 C585.17,308.05 578.60,309.73 575.06,310.55 C567.90,312.22 567.52,312.41 568.46,313.93 Z`,
  `M 636.47 217.43 C634.92,221.12 635.77,222.19 638.05,219.43 C641.67,215.07 648.00,214.24 650.59,217.79 C651.36,218.85 652.52,219.09 654.46,218.60 C657.23,217.90 657.38,217.10 654.84,216.57 C654.10,216.42 652.38,215.81 651.00,215.21 C649.28,214.47 649.03,214.11 650.20,214.06 C652.57,213.98 657.07,216.00 659.75,218.37 C660.99,219.46 662.00,219.87 662.00,219.29 C662.00,216.48 652.04,209.00 647.71,209.00 C643.64,209.00 639.13,212.51 636.47,217.43 Z`,
  `M 93.00 336.00 C93.00,335.45 94.15,335.00 95.56,335.00 C97.01,335.00 97.85,335.43 97.50,336.00 C97.16,336.55 96.01,337.00 94.94,337.00 C93.87,337.00 93.00,336.55 93.00,336.00 Z`,
  `M 88.00 321.25 C85.17,319.83 84.48,318.90 84.40,316.37 C84.35,314.64 83.30,311.83 82.09,310.12 C78.83,305.54 78.37,301.00 80.85,297.98 C82.84,295.57 82.88,295.56 82.34,297.74 C82.03,298.96 82.08,300.76 82.45,301.74 C82.82,302.71 83.02,303.50 82.90,303.50 C82.77,303.50 83.20,304.51 83.87,305.75 C84.53,306.99 85.42,308.00 85.84,308.00 C86.26,308.00 88.03,304.51 89.78,300.25 C96.58,283.65 110.35,263.93 121.85,254.32 C130.66,246.97 138.71,241.80 140.76,242.19 C141.92,242.42 138.08,247.23 127.73,258.51 C119.65,267.30 110.67,277.08 107.77,280.24 C104.68,283.61 102.48,286.94 102.45,288.31 C102.40,290.44 99.08,296.11 96.48,298.50 C95.88,299.05 94.31,301.98 92.98,305.00 C91.65,308.02 89.76,311.57 88.78,312.88 C86.32,316.19 86.53,317.43 90.08,320.41 C93.66,323.42 92.94,323.71 88.00,321.25 Z`,
  `M 463.80 318.75 C462.46,316.96 461.07,315.00 460.71,314.40 C460.31,313.71 462.81,312.21 467.28,310.46 C471.25,308.91 479.33,305.47 485.22,302.82 C491.17,300.15 497.44,298.00 499.30,298.00 C501.15,298.00 509.60,296.63 518.08,294.95 C546.41,289.35 556.00,288.08 556.00,289.91 C556.00,290.51 555.60,291.00 555.12,291.00 C554.63,291.00 554.00,291.91 553.70,293.02 C553.41,294.13 551.79,295.53 550.09,296.12 C548.39,296.71 547.00,297.63 547.00,298.16 C547.00,298.69 546.60,298.87 546.10,298.56 C545.01,297.89 522.63,304.90 522.19,306.06 C522.01,306.52 521.27,306.66 520.53,306.37 C519.80,306.09 517.27,306.79 514.91,307.93 C512.55,309.07 509.89,310.00 508.99,310.00 C508.09,310.00 505.36,310.64 502.93,311.42 C500.49,312.21 495.12,313.84 491.00,315.05 C486.88,316.26 480.18,318.32 476.12,319.63 C472.06,320.93 468.18,322.00 467.49,322.00 C466.80,322.00 465.14,320.54 463.80,318.75 Z`,
  `M 533.54 308.65 C532.52,307.91 532.01,306.79 532.41,306.15 C532.80,305.51 532.53,304.97 531.81,304.93 C529.20,304.78 541.59,300.91 545.18,300.75 C547.20,300.65 548.60,300.16 548.27,299.64 C547.92,299.07 548.25,299.03 549.08,299.55 C551.65,301.14 553.83,300.67 554.92,298.27 C556.06,295.78 562.39,292.50 564.06,293.54 C565.66,294.52 564.31,295.69 557.09,299.59 C552.52,302.06 550.30,303.84 550.47,304.90 C550.61,305.78 550.22,306.83 549.61,307.23 C547.96,308.33 543.00,308.15 543.00,307.00 C543.00,306.45 542.55,306.00 542.00,306.00 C541.45,306.00 541.00,306.63 541.00,307.39 C541.00,310.02 536.45,310.78 533.54,308.65 Z`,
  `M 124.00 313.96 C124.00,314.50 123.08,315.42 121.95,316.02 C120.06,317.04 120.01,317.04 120.41,315.67 C120.65,314.88 121.52,314.00 122.36,313.72 C123.20,313.45 123.98,313.40 124.00,313.96 Z`,
];

function BeamOnPath({
  d,
  reverse,
  delay,
  fadeOut,
}: {
  d: string;
  reverse: boolean;
  delay: number;
  fadeOut: boolean;
}) {
  return (
    <motion.path
      d={d}
      pathLength={1}
      fill="none"
      stroke="url(#neonRed)"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#beamGlow)"
      // "short beam segment" traveling along the path (normalized 0..1)
      strokeDasharray="0.14 0.86"
      initial={{ strokeDashoffset: reverse ? 0 : 1, opacity: 0 }}
      animate={{
        strokeDashoffset: reverse ? 1 : 0,
        opacity: fadeOut ? 0 : 1,
      }}
      transition={{
        strokeDashoffset: { duration: 1.15, delay, ease: easeOut },
        opacity: { duration: 0.25, delay: fadeOut ? 0 : delay },
      }}
    />
  );
}

function OutlineOnPath({
  d,
  delay,
}: {
  d: string;
  delay: number;
}) {
  return (
    <>
      {/* glow pass */}
      <motion.path
        d={d}
        pathLength={1}
        fill="none"
        stroke="url(#neonRed)"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#beamGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.28 }}
        transition={{ duration: 1.1, delay, ease: easeOut }}
      />
      {/* crisp pass */}
      <motion.path
        d={d}
        pathLength={1}
        fill="none"
        stroke="url(#neonRed)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: easeOut }}
      />
    </>
  );
}

const Hero = () => {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const [impact, setImpact] = useState(false);
  const [showOutline, setShowOutline] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setImpact(true);
      setShowOutline(true);
      setShowContent(true);
      return;
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setImpact(true), 980));
    timers.push(window.setTimeout(() => setShowOutline(true), 1150));
    timers.push(window.setTimeout(() => setShowContent(true), 1600));

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  const scrollToInventory = () => {
    document.querySelector("#inventory")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExchange = () => {
    document.querySelector("#exchange")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 lg:pt-24 pb-16 overflow-hidden noise-bg">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[560px] bg-primary/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Neon Car Animation */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 742 496" className="w-full max-w-2xl h-auto">
            <defs>
              <linearGradient id="neonRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(2 76% 55%)" stopOpacity="1" />
                <stop offset="50%" stopColor="hsl(350 85% 65%)" stopOpacity="1" />
                <stop offset="100%" stopColor="hsl(2 76% 55%)" stopOpacity="1" />
              </linearGradient>

              <filter id="beamGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="impactGlow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Two beams tracing the car paths (opposite directions) */}
            {!reduceMotion && (
              <>
                {CAR_PATHS.map((d, i) => (
                  <BeamOnPath
                    key={`beamL-${i}`}
                    d={d}
                    reverse={false}
                    delay={i * 0.02}
                    fadeOut={showOutline}
                  />
                ))}
                {CAR_PATHS.map((d, i) => (
                  <BeamOnPath
                    key={`beamR-${i}`}
                    d={d}
                    reverse={true}
                    delay={i * 0.02}
                    fadeOut={showOutline}
                  />
                ))}
              </>
            )}

            {/* Impact pulse (center-ish of the composition) */}
            {(impact || reduceMotion) && (
              <motion.circle
                cx="371"
                cy="250"
                r="10"
                fill="hsl(2 76% 55%)"
                filter="url(#impactGlow)"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.6, 2.4, 3.2] }}
                transition={{ duration: 0.6, ease: easeOut }}
              />
            )}

            {/* Final outline draw-on (all paths) */}
            {(showOutline || reduceMotion) && (
              <>
                {CAR_PATHS.map((d, i) => (
                  <OutlineOnPath key={`outline-${i}`} d={d} delay={i * 0.03} />
                ))}
              </>
            )}
          </svg>
        </div>

        {/* Content */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient leading-tight">
            {t.hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={scrollToInventory}
              size="lg"
              className="text-base px-8 gap-2 glow-red hover:glow-red-strong transition-shadow"
            >
              {t.hero.browseInventory}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              onClick={scrollToExchange}
              size="lg"
              variant="outline"
              className="text-base px-8"
            >
              {t.hero.getTradeIn}
            </Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: easeOut, delay: reduceMotion ? 0 : 0.08 }}
          className="w-full max-w-[75%] mx-auto"
        >
          <HeroSearchBar onSearch={scrollToInventory} />
        </motion.div>
      </div>

      
    </section>
  );
};

export default Hero;
