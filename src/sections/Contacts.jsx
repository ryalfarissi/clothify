const Contacts = () => {
    return (
        <section id="news" className="w-full max-container px-4 pt-16 lg:pt-4">
            <div className="w-full">
                <div className=" mx-auto text-center mb-16">
                    <h4 className="font-bold uppercase text-lg text-primary-kalia mb-3 font-montserrat">Contacts</h4>
                    <h2 className="font-bold uppercase text-[1.5rem] text-slate-800 mb-4 lg:text-[3rem] font-montserrat">Hubungi Kami Kapan Saja</h2>
                    <p className="font-medium text-slate-gray md:text-lg text-base lg:max-w-2xl mx-auto font-montserrat">Kami siap membantu Anda dengan pertanyaan atau kebutuhan kapan saja. Jangan ragu untuk menghubungi kami.</p>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center mb-16 ">
                    <div className="bg-primary-kalia w-[45%] text-white rounded-xl flex flex-col p-4 shadow-lg border  lg:w-72">
                        <svg class="self-center w-[50px] h-[50px] text-gray-800 dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                        </svg>
                        <h4 className="font-semibold font-montserrat text-center text-base">Our Location</h4>
                        <p className="font-normal font-montserrat text-center text-sm">Detail lokasi disini</p>
                    </div>
                    <div className="bg-white w-[45%] text-primary-kalia rounded-xl flex flex-col p-4 shadow-lg border lg:w-72">
                        <svg class="self-center w-[50px] h-[50px] text-gray-800 dark:text-primary-kalia mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
                        </svg>
                        <h4 className="font-semibold font-montserrat text-center text-base">Phone Number</h4>
                        <p className="font-normal font-montserrat text-center text-sm">Detail nomor kontak</p>
                    </div>
                    <div className="bg-primary-kalia w-[45%] text-white rounded-xl flex flex-col p-4 shadow-lg border lg:w-72">
                        <svg class="self-center w-[50px] h-[50px] text-gray-800 dark:text-white mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                        </svg>

                        <h4 className="font-semibold font-montserrat text-center text-base">Email</h4>
                        <p className="font-normal font-montserrat text-center text-sm">Detail email disini</p>
                    </div>
                    <div className="bg-white w-[45%] text-primary-kalia rounded-xl flex flex-col p-4 shadow-lg border  lg:w-72">
                        <svg class="self-center w-[50px] h-[50px] text-gray-800 dark:text-primary-kalia mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <h4 className="font-semibold font-montserrat text-center text-base">Working Hours</h4>
                        <p className="font-normal font-montserrat text-center text-sm">Jam kerja disini</p>
                    </div>
                </div>
                <form action="">
                    <div class="w-full lg:w-2/3 lg:mx-auto">
                        <div class="w-full px-4 mb-8">
                            <label for="name" class="text-base text-primary-kalia font-semibold">Name</label>
                            <input type="text" id="name"
                                class="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia" />
                        </div>
                        <div class="w-full px-4 mb-8">
                            <label for="email" class="text-base text-primary-kalia font-semibold">E-Mail</label>
                            <input type="text" id="email"
                                class="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia" />
                        </div>
                        <div class="w-full px-4 mb-8">
                            <label for="message" class="text-base text-primary-kalia font-semibold">Message</label>
                            <textarea type="text" id="message"
                                class="w-full bg-slate-200 text-dark p-3 rounded-md focus:outline-none focus:ring-primary-kalia focus:ring-1 focus:border-primary-kalia h-32"></textarea>
                        </div>
                        <div class="w-full px-4">
                            <button
                                class="text-base font-semibold text-white bg-primary-kalia px-6 py-3 rounded-full w-full hover:opacity-80 hover:shadow-lg transition duration-300">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contacts