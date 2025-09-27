import React, { useState, useEffect, useRef, useCallback } from 'react';

// Helper for class names
const cx = (...classes) => classes.filter(Boolean).join(' ');

// Icon component is defined first to be accessible by all other components.
const Icon = ({ name, className }) => {
  const icons = {
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    rocket: <path d="M4.5 16.5c-1.5 1.5-3 1.5-4.5 0s-1.5-3 0-4.5L10.5 2c1.5-1.5 3-1.5 4.5 0s1.5 3 0 4.5L4.5 16.5z" />,
    'bar-chart-3': <path d="M3 3v18h18" />,
    'clipboard-list': <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />,
    truck: <path d="M5 18H3c0-2.76 2.24-5 5-5h2" />,
    workflow: <path d="M12 2a10 10 0 1010 10" />,
    sparkles: <path d="M9.94 2.06a2 2 0 102.12 2.12" />,
    twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 9.6 0 7.1-4.7 12.2-12.5 12.2C4.7 29.2 0 24.5 0 18.6c.6 0 1.2.1 1.8.2 2.9.3 5.4-1.1 6.8-2.6-3.1-.1-5.6-2.1-6.5-4.8.4.1.8.1 1.2.1 1.2 0 2.3-.2 3.3-.8-3.1-1.1-5.4-4.1-5.4-7.5v-.1c1 .6 2.1 1 3.3 1.1C3.3 7.2 1.2 2.9 4.2 0c3.5 4.3 8.8 7.2 14.8 7.5-.1-.6-.2-1.2-.2-1.8.1-4.2 3.5-7.6 7.7-7.6z" />,
    linkedin: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />,
    youtube: <path d="M2.5 17.5c-.9 0-1.7-.3-2.2-.8-.6-.6-.9-1.3-.9-2.2V10c0-.9.3-1.7.9-2.2.6-.6 1.3-.9 2.2-.9h19c.9 0 1.7.3 2.2.8.6.6.9 1.3.9 2.2v4.5c0 .9-.3 1.7-.9 2.2-.6.6-1.3.9-2.2-.9H2.5z" />,
    'map-pin': <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />,
    mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />,
    'chevron-left': <path d="m15 18-6-6 6-6" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,
    check: <path d="M20 6 9 17l-5-5" />,
    'calendar-plus': <path d="M16 2v4M8 2v4m-5 4h18" />,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

const GlobalStyles = () => (
    <style>{`
        body { font-family: 'Inter', sans-serif; }
        .brand-gradient { background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradient-flow 5s linear infinite; }
        @keyframes gradient-flow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .hero-section { position: relative; overflow: hidden; background-color: #111827; }
        #hero-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
        .hero-content { position: relative; z-index: 2; }
        .cta-button { transition: all 0.3s ease; }
        .cta-button:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.2); }
        .service-card, .testimonial-card { transition: all 0.3s ease; }
        .service-card:hover, .testimonial-card:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
        .gemini-button-glow { box-shadow: 0 0 15px rgba(79, 70, 229, 0.5), 0 0 5px rgba(79, 70, 229, 0.3); }
        .calendar-day.disabled { color: #d1d5db; pointer-events: none; }
        .calendar-day.selected { background-color: #3b82f6; color: white; border-radius: 50%; }
        .time-slot.selected { background-color: #3b82f6; color: white; border-color: #3b82f6; }
    `}</style>
);

const Header = ({ onBookAppointment }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleLinkClick = (e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-6 py-4"><nav className="flex justify-between items-center">
                <a href="#home" onClick={handleLinkClick} className="text-2xl font-bold"><span className="brand-gradient">Automation</span>Live</a>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#services" onClick={handleLinkClick} className="text-gray-600 hover:text-blue-600">Services</a>
                    <a href="#about-us" onClick={handleLinkClick} className="text-gray-600 hover:text-blue-600">About</a>
                    <a href="#testimonials" onClick={handleLinkClick} className="text-gray-600 hover:text-blue-600">Testimonials</a>
                    <a href="#contact" onClick={handleLinkClick} className="text-gray-600 hover:text-blue-600">Contact</a>
                    <button onClick={onBookAppointment} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md">Book Appointment</button>
                </div>
                <button onClick={() => setMobileMenuOpen(p => !p)} className="md:hidden text-gray-800"><Icon name="menu" /></button>
            </nav></div>
            {isMobileMenuOpen && (<div className="md:hidden px-6 pb-4">
                <a href="#services" onClick={handleLinkClick} className="block py-2 text-gray-600 hover:text-blue-600">Services</a>
                <a href="#about-us" onClick={handleLinkClick} className="block py-2 text-gray-600 hover:text-blue-600">About</a>
                <a href="#testimonials" onClick={handleLinkClick} className="block py-2 text-gray-600 hover:text-blue-600">Testimonials</a>
                <a href="#contact" onClick={handleLinkClick} className="block py-2 text-gray-600 hover:text-blue-600">Contact</a>
                <button onClick={() => { onBookAppointment(); setMobileMenuOpen(false); }} className="block w-full mt-2 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md">Book Appointment</button>
            </div>)}
        </header>
    );
};

const HeroCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        const resizeCanvas = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        class Particle { constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.size = Math.random()*2+1; this.speedX = Math.random()*1-0.5; this.speedY = Math.random()*1-0.5; this.color = 'rgba(147, 197, 253, 0.5)'; } update() { if (this.x > canvas.width || this.x < 0) this.speedX *= -1; if (this.y > canvas.height || this.y < 0) this.speedY *= -1; this.x += this.speedX; this.y += this.speedY; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
        const initParticles = () => { const num = window.innerWidth < 768 ? 50 : 150; particles = []; for (let i = 0; i < num; i++) particles.push(new Particle()); };
        const handleParticles = () => { for (let i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); for (let j = i; j < particles.length; j++) { const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y); if (dist < 120) { ctx.beginPath(); ctx.strokeStyle = `rgba(147, 197, 253, ${1 - dist / 120})`; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } } };
        let animFrameId;
        const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); handleParticles(); animFrameId = requestAnimationFrame(animate); };
        initParticles(); animate();
        return () => { window.removeEventListener('resize', resizeCanvas); cancelAnimationFrame(animFrameId); };
    }, []);
    return <canvas id="hero-canvas" ref={canvasRef}></canvas>;
};

const Hero = ({ onBookAppointment }) => (
    <section id="home" className="hero-section text-white pt-24 pb-32">
        <HeroCanvas />
        <div className="hero-content container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Automate Your Workflow. Amplify Your Productivity.</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">We build custom automation solutions using tools like ClickUp, Zapier, and Make.com to eliminate repetitive tasks and unlock your team's true potential.</p>
            <button onClick={onBookAppointment} className="cta-button bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-lg">Book a Free Consultation</button>
        </div>
    </section>
);

const servicesData = [
    { icon: 'zap', title: 'Expert Tool Integration', text: 'We specialize in connecting your favorite apps like <strong>ClickUp</strong>, <strong>Zapier</strong>, & <strong>Make.com</strong>.', color: 'blue' },
    { icon: 'rocket', title: 'Productivity Boosting', text: "We design workflows that handle repetitive tasks, so your team can focus on high-impact work.", color: 'blue' },
    { icon: 'bar-chart-3', title: 'Automated Reporting', text: 'Get the data you need, when you need it. We build systems that automatically compile and deliver reports.', color: 'blue' },
    { icon: 'clipboard-list', title: 'Automated Project Management', text: 'Streamline projects from start to finish. We automate task creation, progress tracking, and team notifications.', color: 'purple' },
    { icon: 'truck', title: 'Supply Chain Enhancement', text: 'Optimize your supply chain with automated inventory management, order processing, and logistics.', color: 'green' },
    { icon: 'workflow', title: 'Custom Workflow Design', text: 'Have a unique challenge? We design and build bespoke automation solutions from the ground up to fit your needs.', color: 'indigo' },
];

const ServiceCard = ({ icon, title, text, color }) => (<div className="service-card bg-gray-50 p-8 rounded-xl shadow-sm border"><div className={cx(`flex items-center justify-center h-16 w-16 rounded-full bg-${color}-100 text-${color}-600 mb-6`)}><Icon name={icon} /></div><h3 className="text-xl font-semibold mb-3">{title}</h3><p className="text-gray-600" dangerouslySetInnerHTML={{ __html: text }}></p></div>);
const Services = () => (<section id="services" className="py-20 bg-white"><div className="container mx-auto px-6"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Our Automation Services</h2><p className="text-gray-600 mt-2 max-w-2xl mx-auto">We provide end-to-end solutions to connect your tools and build seamless workflows.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{servicesData.map(s => <ServiceCard key={s.title} {...s} />)}</div></div></section>);
const About = () => (<section id="about-us" className="py-20 bg-gray-50"><div className="container mx-auto px-6"><div className="grid lg:grid-cols-2 gap-12 items-center"><div className="order-2 lg:order-1"><h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Crafting the Future of Work</h2><p className="text-gray-600 mb-4 leading-relaxed">Based in Jaipur, Rajasthan, Automation Live was founded on a simple principle: your team's talent is too valuable to be wasted on repetitive, manual tasks. We saw brilliant professionals bogged down by tedious processes and knew there was a better way.</p><p className="text-gray-600 mb-6 leading-relaxed">Our mission is to become your dedicated automation partner. We dive deep into your unique challenges to design and implement robust, intelligent workflows that empower your team to focus on innovation and growth.</p><a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="cta-button bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg inline-block">Partner With Us</a></div><div className="order-1 lg:order-2"><img src="https://placehold.co/600x450/e0e7ff/4338ca?text=Automation+Experts" alt="Team" className="rounded-xl shadow-2xl w-full h-auto" /></div></div></div></section>);

const SolutionGenerator = () => {
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleGenerate = async () => {
        if (problem.trim().length < 20) { setError('Please describe your problem in more detail.'); setTimeout(() => setError(''), 4000); return; }
        setIsLoading(true); setError(''); setSolution('');
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=`;
        const systemPrompt = `You are "Automation Live"'s expert consultant. A client described a problem. Provide a clear, friendly, actionable automation blueprint. Start with an empathetic opening. Break down the solution into a step-by-step numbered list, mentioning specific tools (Make.com, Zapier, ClickUp API). End with a call to action to book a call.`;
        try {
            const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents: [{ parts: [{ text: `Here is my problem: "${problem}"` }] }], }), });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) setSolution(text.replace(/\n\d\.\s/g, (m) => `<br><br>${m}`).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'));
            else throw new Error('No content received.');
        } catch (err) { console.error("Error calling Gemini API:", err); setError('Sorry, we couldn\'t generate a solution. Please try again.'); } finally { setIsLoading(false); }
    };
    return (<section id="solution-generator" className="py-20 bg-white"><div className="container mx-auto px-6"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Get a Custom Automation Blueprint</h2><p className="text-gray-600 mt-2 max-w-2xl mx-auto">Describe a business problem, and our AI will generate a potential solution.</p></div><div className="max-w-3xl mx-auto bg-gray-50 p-8 sm:p-10 rounded-xl shadow-lg border"><label htmlFor="problem-description" className="block font-medium mb-2">Tell us your problem in detail:</label><textarea id="problem-description" rows="6" value={problem} onChange={(e) => setProblem(e.target.value)} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Example: 'Every time we sign a new client, I have to manually create a folder, a project in ClickUp, and then send a welcome email...'"></textarea><button onClick={handleGenerate} disabled={isLoading} className="mt-4 w-full bg-indigo-600 text-white font-semibold p-4 rounded-lg hover:bg-indigo-700 cta-button flex items-center justify-center gap-2 gemini-button-glow disabled:opacity-50"><Icon name="sparkles" className="w-5 h-5" />{isLoading ? 'Generating...' : 'Generate My Solution'}</button><div className="mt-8">{isLoading && <div>Loading...</div>}{error && <div className="p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}{solution && <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200" dangerouslySetInnerHTML={{ __html: solution }}></div>}</div></div></div></section>);
};

const testimonialsData = [ { name: 'Rahul Kumar', title: 'Sr. Manager, Knorish.', text: '"A complete game-changer, The ClickUp integration they built saves our team at least 10 hours a week."', avatar: 'RK' }, { name: 'Coming Soon', title: 'Marketing Head, DataDriven Co.', text: '"Something more extra-ordinary coming...."', avatar: 'CS' }, { name: 'Coming Soon', title: 'Founder, Creative Solutions', text: '"we are cooking, serve you more delicious."', avatar: 'CS' }, { name: 'Coming Soon', title: 'Director, Onboardify Agency', text: '"Constructing......"', avatar: 'CS' }, { name: 'Coming Soon', title: 'VP of Sales, GrowthRocket', text: '"Aahhh It\'s Cooking...."', avatar: 'CS' } ];
const TestimonialCard = ({ name, title, text, avatar }) => (<div className="testimonial-card bg-white p-8 rounded-xl shadow-sm border"><p className="text-gray-600 mb-6">{text}</p><div className="flex items-center"><img src={`https://placehold.co/48x48/E0E7FF/4F46E5?text=${avatar}`} alt="Avatar" className="w-12 h-12 rounded-full mr-4" /><div><p className="font-semibold">{name}</p><p className="text-sm text-gray-500">{title}</p></div></div></div>);
const Testimonials = () => (<section id="testimonials" className="py-20 bg-gray-50"><div className="container mx-auto px-6"><div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold">Trusted by Growing Companies</h2><p className="text-gray-600 mt-2">Here's what our clients have to say.</p></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{testimonialsData.map(t => <TestimonialCard key={t.name} {...t} />)}</div></div></section>);

// ====================================================================
// START: UPDATED Contact Component
// ====================================================================
const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        // IMPORTANT: Replace with your actual Web3Forms Access Key
        data.append("access_key", "YOUR_ACCESS_KEY_HERE");
        data.append("from_name", "AutomationLive Website");
        data.append("subject", "New Contact Form Submission");

        setStatus("Sending...");
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            if (result.success) {
                setStatus("Thank you! Your message has been sent.");
                form.reset();
                setTimeout(() => setStatus(''), 5000);
            } else {
                console.error("Submission error:", result);
                setStatus(result.message);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus("Something went wrong. Please try again.");
        }
    };

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Let's Build Your Automated Future</h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Have a question or want to start a project? Send us a message.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 sm:p-10 rounded-xl shadow-lg border">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block font-medium mb-2">Full Name</label>
                            <input type="text" id="name" name="name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block font-medium mb-2">Email Address</label>
                            <input type="email" id="email" name="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block font-medium mb-2">Message</label>
                            <textarea id="message" name="message" rows="5" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-4 rounded-lg hover:bg-blue-700 cta-button">Send Message</button>
                    </form>
                    {status && <div className={cx("mt-4 text-center font-medium", status.includes("Thank") ? "text-green-600" : "text-red-600")}>{status}</div>}
                </div>
            </div>
        </section>
    );
};
// ====================================================================
// END: UPDATED Contact Component
// ====================================================================

const Footer = () => (
    <footer className="bg-gray-900 text-white"><div className="container mx-auto px-6 py-16"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1"><a href="#home" className="text-2xl font-bold mb-2 inline-block"><span className="brand-gradient">Automation</span>Live</a><p className="text-gray-400 text-sm">Intelligent workflow automation to streamline your success.</p><div className="flex space-x-4 mt-6"><a href="#" className="text-gray-400 hover:text-white"><Icon name="twitter" className="w-5 h-5" /></a><a href="#" className="text-gray-400 hover:text-white"><Icon name="linkedin" className="w-5 h-5" /></a><a href="#" className="text-gray-400 hover:text-white"><Icon name="youtube" className="w-5 h-5" /></a></div></div>
        <div><h4 className="font-semibold tracking-wider uppercase text-gray-300 mb-4">Services</h4><ul className="space-y-3"><li><a href="#services" className="text-gray-400 hover:text-white">Tool Integration</a></li><li><a href="#services" className="text-gray-400 hover:text-white">Project Management</a></li><li><a href="#services" className="text-gray-400 hover:text-white">Supply Chain</a></li><li><a href="#solution-generator" className="text-gray-400 hover:text-white">Custom Solutions</a></li></ul></div>
        <div><h4 className="font-semibold tracking-wider uppercase text-gray-300 mb-4">Company</h4><ul className="space-y-3"><li><a href="#about-us" className="text-gray-400 hover:text-white">About Us</a></li><li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li><li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li><li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li></ul></div>
        <div><h4 className="font-semibold tracking-wider uppercase text-gray-300 mb-4">Get in Touch</h4><ul className="space-y-4 text-gray-400"><li className="flex items-start"><Icon name="map-pin" className="w-5 h-5 mr-3 mt-1 shrink-0 text-blue-400" /><span>Jaipur, Rajasthan, India</span></li><li className="flex items-start"><Icon name="mail" className="w-5 h-5 mr-3 mt-1 shrink-0 text-blue-400" /><a href="mailto:info@automationlive.in" className="hover:text-white">info@automationlive.in</a></li><li className="flex items-start"><Icon name="phone" className="w-5 h-5 mr-3 mt-1 shrink-0 text-blue-400" /><a href="tel:+919462804501" className="hover:text-white">+91 (946) 280-4501</a></li></ul></div>
    </div><div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500"><p>&copy; {new Date().getFullYear()} Automation Live. All Rights Reserved.</p></div></div></footer>
);

// ====================================================================
// START: UPDATED BookingModal Component
// ====================================================================
const BookingModal = ({ isOpen, onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [details, setDetails] = useState({ name: '', email: '' });
    const [step, setStep] = useState('booking');

    const resetForm = useCallback(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setDetails({ name: '', email: '' });
        setStep('booking');
