'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { MaxWidthWrapper } from "./components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Loader from "./components/Loader";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  Engine,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { BrainCircuit, Brain } from 'lucide-react';

export default function Home() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine:Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(() => ({
    background: {
      color: {
        value: "#ffffff",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: { enable: true },
      },
      modes: {
        push: {
          quantity: 8,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#2B57A5",
      },
      links: {
        color: "#388e3c",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        speed: 1.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 88,
      },
      opacity: {
        value: 0.8,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },

    detectRetina: true,
  }), []);

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push("/start");
  };

  return (
    <div className="relative w-full h-screen overflow-x-hidden bg-[#e0e0e0]">
      {/* Particle background */}
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute top-0 left-0 w-full h-full z-0"
        />
      )}

      {/* Watermark Icons (pulse by default, solid on hover, hidden on mobile) */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
        {/* Left BrainCircuit Icon */}
        <div className="absolute top-[38%] left-[6%] group transition-all duration-300 ease-in-out">
          <BrainCircuit
            className="w-[240px] h-[240px] opacity-10 text-[#2B57A5] animate-pulse group-hover:animate-none group-hover:opacity-20"
          />
        </div>

        {/* Right Brain Icon */}
        <div className="absolute top-[38%] right-[6%] group transition-all duration-300 ease-in-out">
          <Brain
            className="w-[240px] h-[240px] opacity-10 text-[#2B57A5] animate-pulse group-hover:animate-none group-hover:opacity-20"
          />
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full h-full">
        <MaxWidthWrapper className="h-full flex flex-col">
          {/* Header */}
          <header className="w-full mt-4">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between h-20 w-full rounded-full border border-gray-100 bg-brand-100 px-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-xs leading-snug font-semibold text-white">
                <div>World-class <span className="text-brand">Testing Services</span></div>
                <div>for your <span className="text-brand">Quality Assurance</span> Needs</div>
              </div>

              <div className="flex justify-center ">
                <Image
                  src="/company_logo.png"
                  alt="Envirocare Labs Logo"
                  width={100}
                  height={50}
                  className="h-16 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-200 mr-36"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.location.href = 'https://envirocarelabs.com'}
                  className="bg-brand hover:bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-2xl flex items-center gap-1"
                >
                  Visit
                </button>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden flex justify-center items-center bg-brand-100">
              <Image
                width={200}
                height={50}
                src="/company_logo.png"
                alt="Envirocare Labs Logo"
                className="h-10 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105 duration-200"
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex flex-col items-center text-center mt-48 sm:mt-56 lg:mt-40 xl:mt-32">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl">
              Envirocare Labs
            </h1>
            <span className="text-4xl sm:text-6xl lg:text-8xl bg-brand text-white px-4 py-2 rounded-2xl lg:rounded-3xl inline-block">
              Know Yourself
            </span>
            <div className="mt-5 flex lg:justify-end items-end w-full lg:w-[65%] mb-4">
              <div className="lg:w-[35%] w-full h-18 text-lg">
                <span className="text-brand-100">Discover insights </span>
                about your personality and how it shapes the way you think, feel, and connect with envirocarian.
              </div>
            </div>
            <div>
            </div>

            <Button
              onClick={handleClick}
              className="mt-3 md:mt-8 px-8 py-4 text-xl font-semibold text-white bg-gradient-to-r from-brand to-brand-100 hover:from-brand-100 hover:to-brand-100 shadow-xl rounded-full transition-all duration-300 flex items-center gap-3 h-12 md:w-3xl"
            >
              {isLoading ? <Loader /> : "Start"}
            </Button>
          </main>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
