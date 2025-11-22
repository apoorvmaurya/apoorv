import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Community from '@/components/sections/Community';
import Contact from '@/components/sections/Contact';
import ChatBot from '@/components/chatbot/ChatBot';

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navigation />

            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Community />
            <Contact />

            <Footer />

            {/* AI Chatbot */}
            <ChatBot />
        </main>
    );
}
