import Button from "../components/Button"
import { heroImage } from "../constants"

const Hero = () => {
    return (
        <section id="home" className=" w-full flex xl:flex-row flex-col justify-center min-h-screen p-2 gap-20 max-container">
            <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
                <p className="ml-1  text-2xl font-montserrat text-primary-kalia font-bold">Description</p>
                <h1 className=" font-palanquin text-8xl max-sm:text-4xl font-bold max-sm:leading-[82px]">CV. KALIA UTAMA NUSANTARA</h1>
                <p className="font-montserrat text-slate-gray text-lg leading-7 mt-6 mb-14 sm:max-w-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati perspiciatis laborum voluptate, quos nostrum perferendis omnis odio sapiente corrupti quisquam.</p>
                <Button label="Contact Us" />
            </div>
            <div className="relative flex flex-1 justify-center items-center xl:min-h-screen max-xl:py-20 max-sm:px-4  bg-cover bg-center">
                <img src={heroImage.src} alt={heroImage.alt} width={610} height={200} className="object-contain xl:mt-20 xl:ml-20"/>

            </div>
        </section>
    )
}

export default Hero