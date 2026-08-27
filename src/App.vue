<script setup>
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import About from './components/About.vue';
import Skills from './components/Skills.vue';
import Projects from './components/Projects.vue';
import Experience from './components/Experience.vue';
import Education from './components/Education.vue';
import Certifications from './components/Certifications.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <div class="min-h-screen overflow-x-clip bg-night-950 font-sans text-slate-300 antialiased">
        <div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-5%,rgba(75,118,238,0.14),transparent_70%)]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_88%_108%,rgba(44,69,148,0.16),transparent_70%)]"></div>
        </div>

        <Navbar />

        <main id="content">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Certifications />
            <Contact />
        </main>

        <Footer />
    </div>
</template>