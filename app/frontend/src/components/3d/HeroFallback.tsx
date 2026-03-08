export const HeroFallback = () => {
    return (
        <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-accent/10 blur-[100px] flex items-center justify-center animate-pulse">
            {/* 
        In production, this should be replaced with a static base64 or optimized AVIF rasterized frame 
        of the 3D scene to satisfy the < 1.2s LCP requirement.
      */}
        </div>
    );
};
