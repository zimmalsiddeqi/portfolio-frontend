import { useTheme } from "../../hooks/useTheme";

const ThreeBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div
        className={`floating-blob w-72 h-72 top-[-10%] left-[-5%] ${
          isDark ? "bg-primary-500/20" : "bg-primary-400/30"
        } animate-blob`}
      />
      <div
        className={`floating-blob w-96 h-96 top-[20%] right-[-10%] ${
          isDark ? "bg-accent-500/15" : "bg-accent-400/25"
        } animate-blob animation-delay-2000`}
      />
      <div
        className={`floating-blob w-80 h-80 bottom-[10%] left-[20%] ${
          isDark ? "bg-primary-600/15" : "bg-pink-300/20"
        } animate-blob animation-delay-4000`}
      />
      <div
        className={`floating-blob w-64 h-64 top-[50%] right-[20%] ${
          isDark ? "bg-accent-600/10" : "bg-purple-300/20"
        } animate-blob`}
      />

      {/* Grid pattern - visible on light */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(108,99,255,0.6) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(108,99,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Mesh gradient overlay for light mode */}
      <div className="absolute inset-0 bg-mesh-light dark:hidden" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/50 dark:to-dark-900/80" />
    </div>
  );
};

export default ThreeBackground;