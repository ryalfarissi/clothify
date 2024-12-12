import { tiny1 } from "../assets/images"

const News = () => {
    return (
        <section id="news" className="w-full max-container px-4 pt-16 lg:pt-4">
            <div className="w-full">
                <div className="w-full">
                    <div className=" mx-auto text-center mb-16">
                        <h2 className="font-bold uppercase text-[2rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">Artikel Berita</h2>
                        <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">Berita dan informasi terbaru dari kami</p>
                    </div>
                    <div className="flex flex-wrap font-montserrat max-lg:gap-5">
                        <div className="w-full px-4 py-3 lg:w-1/2 xl:w-1/3">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg bg-cover">
                                <a href="#"><img src={tiny1} alt="gambar1" className="w-full" /></a>
                                <div className="py-8 px-6">
                                    <h3 className="mb-3 font-semibold text-xl text-slate-800 truncate ">Berita Terkini 1 Tentang mengenai suatu</h3>
                                    <p className="font-medium text-slate-gray text-base mb-6">Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Pariatur, animi?</p>
                                    <a href="#"
                                        className="font-medium text-sm text-white bg-primary-kalia py-2 px-4 rounded-lg hover:opacity-80">Read
                                        More</a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 py-3 lg:w-1/2 xl:w-1/3">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg bg-cover">
                                <a href="#"><img src={tiny1} alt="gambar1" className="w-full" /></a>
                                <div className="py-8 px-6">
                                    <h3 className="mb-3 font-semibold text-xl text-slate-800 truncate">Berita Terkini 1 Tentang mengenai suatu</h3>
                                    <p className="font-medium text-slate-gray text-base mb-6">Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Pariatur, animi?</p>
                                    <a href="#"
                                        className="font-medium text-sm text-white bg-primary-kalia py-2 px-4 rounded-lg hover:opacity-80">Read
                                        More</a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 py-3 lg:w-1/2 xl:w-1/3">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg bg-cover">
                                <a href="#"><img src={tiny1} alt="gambar1" className="w-full" /></a>
                                <div className="py-8 px-6">
                                    <h3 className="mb-3 font-semibold text-xl text-slate-800 truncate">Berita Terkini 1 Tentang mengenai suatu</h3>
                                    <p className="font-medium text-slate-gray text-base mb-6">Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Pariatur, animi?</p>
                                    <a href="#"
                                        className="font-medium text-sm text-white bg-primary-kalia py-2 px-4 rounded-lg hover:opacity-80">Read
                                        More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default News