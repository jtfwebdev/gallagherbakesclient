import HeroImage from '../Images/pexels-danik-prihodko-8176299.webp';

const Hero = () => {

    return ( 
        <div className="
            w-full relative h-[60vh] bg-primary-100
            max-[1200px]:h-[50vh]
            max-[900px]:h-[45vh]
            max-[650px]:h-[40vh]
            max-[500px]:h-[35vh]
            ">
            <img src={HeroImage} alt="" className="object-cover w-full h-full absolute" />
            <div className="
            w-full h-full z-10 bg-gradient-to-t from-primary-100 from-15% to-60% absolute
            max-[700px]:from-25%
            "></div>
            <div className="w-full h-full z-20 absolute flex flex-col items-center justify-end">
                <h1 className="
                mb-8 font-header text-9xl text-secondary-100 font-bold
                max-[900px]:text-8xl
                max-[700px]:text-7xl   
                max-[500px]:text-6xl
                max-[425px]:text-5xl
                ">Gallagher Bakes</h1>
                <h2 className="
                font-header text-2xl text-secondary-100 font-bold
                max-[900px]:text-xl
                max-[500px]:text-base
                max-[425px]:-mt-4 
                max-[380px]:px-8 max-[380px]:text-center
                ">Family-run bakery established in the Midlands since 1977.</h2>
            </div>
        </div>
     );
}
 
export default Hero;