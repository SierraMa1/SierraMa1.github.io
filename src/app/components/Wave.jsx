"use client"

import Image from 'next/image'

const WaveImage = () => {
    return (
        <div className="bottom-0 right-0 hidden md:inline-block md:absolute">
            <Image src="/wave.png" width="300" height="300" className="w-full h-full " alt="Particles " />
        </div>

    );
}

export default WaveImage;