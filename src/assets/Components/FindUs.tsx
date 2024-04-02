const FindUs = () => {
    return ( 
        <div className="
        w-[70%] mx-auto py-8
        max-[900px]:w-[80%]
        max-[750px]:w-[90%]
        ">
            <h2 className="font-text text-secondary-100 text-2xl mb-4 border-b-2 border-secondary-100 w-fit">Find Us</h2>
            <div className="
            flex h-[50vh] items-center justify-center
            max-[650px]:flex-col max-[650px]:h-fit
            ">
                <iframe className="
                w-[60%] h-full
                max-[1150px]:w-[50%]
                max-[950px]:h-[40vh] max-[950px]:w-[45%]
                max-[650px]:w-full max-[650px]:mb-4
                "
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13646.457170244445!2d-1.5874942648502814!3d52.79756649991559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1711103828153!5m2!1sen!2suk" 
                loading="lazy"></iframe>
                <div className="
                w-[40%] h-full px-8 font-text text-secondary-100 flex flex-col items-center justify-center gap-4
                max-[1150px]:w-[50%]
                max-[950px]:w-[55%]
                max-[650px]:w-full
                ">
                    <p>You can find us on <span className="font-bold">111 Faux Street, Burton-upon-Trent, DE28 8VI.</span></p>
                    <p>Come off the A5111 just outside the Burton-upon-Trent Golf Club and take the second exit on the roundabout.</p>
                    <div className="flex flex-col justify-center items-center font-bold">
                        <h4>Opening Times:</h4>
                        <p>Monday - Friday: 09:30 - 15:30</p>
                        <p>Saturday: 10:00 - 14:00</p>
                        <p>Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FindUs;