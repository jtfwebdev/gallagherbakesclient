import Featured from "./Featured";
import FindUs from "./FindUs";
import Hero from "./Hero";


const Home = ({products}) => {
    return ( 
        <div className="h-[100vh] w-full bg-primary-100">
            <Hero />
            <Divider />
            <Featured products={products} />
            <FindUs />
      </div>
     );
}
 
export default Home;

const Divider = () => {
  return (
    <div className="mt-8">
      <div className="h-[6px] mb-[4px] w-[70%] opacity-70 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[6px] mb-[5px] w-[70%] opacity-60 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[5px] w-[70%] opacity-50 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[5px] mb-[6px] w-[70%] opacity-40 mx-auto bg-secondary-100 rounded-full" />
      <div className="h-[4px] mb-[6px] w-[70%] opacity-30 mx-auto bg-secondary-100 rounded-full" />
    </div>
  )
}