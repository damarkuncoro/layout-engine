/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, ReactNode } from "react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeroContextProps {
  variant: string;
  align: "left" | "center" | "right";
}

const HeroContext = createContext<HeroContextProps | undefined>(undefined);

function useHero() {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error("Hero components must be used within a Hero provider");
  }
  return context;
}

interface HeroProps {
  children: ReactNode;
  variant?: string;
  align?: "left" | "center" | "right";
  className?: string;
  fullscreen?: boolean;
}

export function Hero({
  children,
  variant = "centered",
  align = "center",
  className,
  fullscreen = false,
}: HeroProps) {
  return (
    <HeroContext.Provider value={{ variant, align }}>
      <section
        className={cn(
          "relative overflow-hidden flex flex-col justify-center",
          fullscreen ? "min-h-screen" : "py-20 md:py-32",
          className
        )}
      >
        <div className="container mx-auto px-6 relative z-10">
          {children}
        </div>
      </section>
    </HeroContext.Provider>
  );
}

Hero.Title = function HeroTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { align } = useHero();
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6",
        align === "center" && "text-center mx-auto max-w-4xl",
        align === "left" && "text-left",
        className
      )}
    >
      {children}
    </motion.h1>
  );
};

Hero.Subtitle = function HeroSubtitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { align } = useHero();
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "text-lg md:text-xl text-slate-600 mb-8 max-w-2xl",
        align === "center" && "text-center mx-auto",
        align === "left" && "text-left",
        className
      )}
    >
      {children}
    </motion.p>
  );
};

Hero.Actions = function HeroActions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { align } = useHero();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "flex flex-wrap gap-4",
        align === "center" && "justify-center",
        align === "left" && "justify-start",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

Hero.Image = function HeroImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={cn("mt-12 md:mt-16", className)}
    >
      <img
        src={src}
        alt={alt}
        className="rounded-2xl shadow-2xl w-full object-cover"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

Hero.Background = function HeroBackground({
  children,
  className,
  overlay = true,
}: {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {children}
      {overlay && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      )}
    </div>
  );
};

Hero.Video = function HeroVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={cn("w-full h-full object-cover", className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

Hero.Form = function HeroForm({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { align } = useHero();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        "mt-8 p-1 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-md",
        align === "center" && "mx-auto",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

Hero.Stats = function HeroStats({
  items,
  className,
}: {
  items: { label: string; value: string }[];
  className?: string;
}) {
  const { align } = useHero();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-12 border-t border-slate-200",
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {items.map((stat, i) => (
        <div key={i}>
          <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
};
