// src/components/Hero.jsx
"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hola, soy María
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Consultora Digital", 1000,
                "Desarrolladora Web", 1000,
                "Soluciones para PYMES", 1000,
              ]}
              wrapper="span" speed={50} repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Convierto problemas de negocio en soluciones digitales eficientes. Conectando la estrategia con la ejecución técnica.
          </p>
          <div>
            <Link href="/#contact" legacyBehavior>
                <a className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white">
                    Contacta conmigo
                </a>
            </Link>
            <Link href="/#solutions" legacyBehavior>
                <a className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3">
                    <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                        Descubre mis soluciones
                    </span>
                </a>
            </Link>
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300} height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;