import { Hero } from './sections';
import { About } from './sections';
import { Services } from './sections';
import { Projects } from './sections';
import { News } from './sections';
import { Contacts } from './sections';
import {Footer} from './sections';
import Nav from './components/Nav';


const App = () => (
  <main className="relative">
    <Nav />
    <section className='xl:padding-l  padding-b'>
      <Hero />
    </section>
    <section className='padding'>
      <About />
    </section>
    <section className='padding'>
      <Services />
    </section>
    <section className='padding bg-slate-200'>
      <Projects />
    </section>
    <section className='padding'>
      <News />
    </section>
    <section className='padding'>
    <Contacts/>
    </section>
    <section className='padding bg-slate-900'>
      <Footer/>
    </section>
  </main>
);

export default App