import React from 'react';
import { MechanicalScene } from './MechanicalScene';

interface SceneBackgroundProps {
  scrollProgress: number;
  activeSection: number;
  explosionFactor: number;
  isDarkTheme: boolean;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  scrollProgress,
  activeSection,
  explosionFactor,
  isDarkTheme,
}) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500">
      {/* 3D Canvas Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <MechanicalScene
          scrollProgress={scrollProgress}
          activeSection={activeSection}
          explosionFactor={explosionFactor}
          isDarkTheme={isDarkTheme}
        />
      </div>

      {/* Subtle Studio Lighting Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isDarkTheme
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(11,12,14,0.7)_80%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(235,234,229,0.5)_85%)]'
        }`}
      />

      {/* Ambient Engineering Crosshairs in Corners */}
      <div className="absolute top-8 left-8 hidden lg:block select-none opacity-40">
        <div className="w-4 h-4 border-t border-l border-current" />
        <div className="font-mono text-[9px] mt-1 tracking-widest uppercase">
          ORIGIN_XYZ [0.00, 0.00, 0.00]
        </div>
      </div>

      <div className="absolute top-8 right-8 hidden lg:block select-none text-right opacity-40">
        <div className="w-4 h-4 border-t border-r border-current ml-auto" />
        <div className="font-mono text-[9px] mt-1 tracking-widest uppercase">
          SEC_ID // 0{activeSection + 1}
        </div>
      </div>

      <div className="absolute bottom-8 left-8 hidden lg:block select-none opacity-40">
        <div className="w-4 h-4 border-b border-l border-current" />
        <div className="font-mono text-[9px] mt-1 tracking-widest uppercase">
          INVOCAD // 3D_SHOWROOM_ENGINE
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block select-none text-right opacity-40">
        <div className="w-4 h-4 border-b border-r border-current ml-auto" />
        <div className="font-mono text-[9px] mt-1 tracking-widest uppercase">
          FPS: 60.0 // HARDWARE ACCELERATED
        </div>
      </div>
    </div>
  );
};
