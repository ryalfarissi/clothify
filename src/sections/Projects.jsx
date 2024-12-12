import { cv1 } from "../assets/images"


const Projects = () => {
    return (
        <section id="projects" className="w-full max-container px-4 pt-16 lg:pt-4">
            <div className="w-full">
                <div className=" mx-auto text-center mb-16">
                    <h4 className="font-bold uppercase text-lg text-primary-kalia mb-3 font-montserrat">Projects</h4>
                    <h2 className="font-bold uppercase text-[2rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">Kerja Sama Kami</h2>
                    <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">Kemitraan strategis dengan vendor terpercaya memungkinkan kami menyediakan solusi yang disesuaikan dengan kebutuhan pelanggan, menghasilkan kepuasan maksimal bagi setiap klien.</p>
                </div>
            </div>
            <div className="w-full lg:gap-x-12 flex flex-wrap justify-center ">
                <div className="mb-12 p-4 ">
                    <div className="rounded-md shadow-md overflow-hidden lg:w-[500px] bg-white">
                        <img src={cv1} alt="kun1"/>
                    </div>
                    <h3 className="font-semibold text-slate-800 text-xl mt-5 mb-2 font-montserrat">Project Nomor 1</h3>
                    <p className="font-medium text-slate-gray text-base font-montserrat">Kerja sama antara CV. Kalia Utama Nusantara dengan PT...</p>
                </div>
                <div className="mb-12 p-4 ">
                    <div className="rounded-md shadow-md overflow-hidden lg:w-[500px] ">
                        <img src={cv1} alt="kun1" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-xl mt-5 mb-2 font-montserrat">Project Nomor 2</h3>
                    <p className="font-medium text-slate-gray text-base font-montserrat">Kerja sama antara CV. Kalia Utama Nusantara dengan PT...</p>
                </div>
                <div className="mb-12 p-4 ">
                    <div className="rounded-md shadow-md overflow-hidden lg:w-[500px] ">
                        <img src={cv1} alt="kun1" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-xl mt-5 mb-2 font-montserrat">Project Nomor 3</h3>
                    <p className="font-medium text-slate-gray text-base font-montserrat">Kerja sama antara CV. Kalia Utama Nusantara dengan PT...</p>
                </div>
                <div className="mb-12 p-4 ">
                    <div className="rounded-md shadow-md overflow-hidden lg:w-[500px] ">
                        <img src={cv1} alt="kun1" />
                    </div>
                    <h3 className="font-semibold text-slate-800 text-xl mt-5 mb-2 font-montserrat">Project Nomor 4</h3>
                    <p className="font-medium text-slate-gray text-base font-montserrat">Kerja sama antara CV. Kalia Utama Nusantara dengan PT...</p>
                </div>
            </div>

        </section>
    )
}

export default Projects