import { useState } from 'react'
import Button from '../components/Button';

const ERPShowcase = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        { icon: "🎯", title: "Total Customization", desc: "Every module is designed to perfectly match your specific business processes.", color: "from-blue-500 to-cyan-500" },
        { icon: "⚡", title: "Fast Implementation", desc: "From concept to full operation in just a few weeks.", color: "from-purple-500 to-pink-500" },
        { icon: "📊", title: "Advanced Analytics", desc: "Smart dashboards for data-driven decisions and real-time insights.", color: "from-orange-500 to-red-500" },
        { icon: "🔄", title: "Guaranteed Scalability", desc: "Built to grow with your company — without limits.", color: "from-green-500 to-emerald-500" }
    ];

    const benefits = [
        { label: "Reduced Operational Costs", value: "40%" },
        { label: "Productivity Increase", value: "60%" },
        { label: "Setup Time", value: "2–4 weeks" },
        { label: "Average ROI", value: "6 months" }
    ];

    const industries = [
        { icon: "🚚", name: "Logistics" },
        { icon: "🏭", name: "Manufacturing" },
        { icon: "📦", name: "E-commerce" },
        { icon: "🏪", name: "Retail" },
        { icon: "🏗️", name: "Construction" },
        { icon: "💊", name: "Pharmaceutical" },
        { icon: "🍽️", name: "Food & Beverage" },
        { icon: "⚙️", name: "Industrial Automation" }
    ];

    return (
        <section className='c-space my-20' id='erp-showcase'>
            {/* 🔹 HERO SECTION */}
            <div className='relative mb-20'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl'></div>
                <div className='relative'>
                    <p className='head-text mb-4'>MaiERP – Your Custom ERP Solution</p>
                    <p className='text-xl text-white-600 max-w-3xl'>
                        Not a standard software, but <span className='text-white font-semibold'>the perfect solution</span> for your business.  
                        From logistics to production, from inventory to sales – everything in one place.
                    </p>
                </div>
            </div>

            {/* 🔹 VIDEO SECTION */}
            <div className="relative group mb-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div className="relative border border-black-300 bg-black-200 rounded-2xl overflow-hidden aspect-video">
                    <video controls className="w-full h-full object-contain bg-black">
                        <source src="textures/ErpShowcase/NextERP.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* 🔹 FEATURES + CTA SIDE BY SIDE */}
            <div className='grid md:grid-cols-2 grid-cols-1 gap-8 mb-16'>
                {/* Features Section */}
                <div className='bg-black-200 border border-black-300 rounded-2xl p-8'>
                    <h3 className='text-2xl font-bold text-white mb-6'>Why Choose MaiERP?</h3>
                    <div className='space-y-4'>
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                onClick={() => setActiveFeature(index)}
                                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                    activeFeature === index 
                                        ? 'bg-gradient-to-r ' + feature.color + ' shadow-lg scale-105' 
                                        : 'bg-black-300 hover:bg-black-100'
                                }`}
                            >
                                <div className='flex items-start gap-4'>
                                    <span className='text-3xl'>{feature.icon}</span>
                                    <div className='flex-1'>
                                        <h4 className={`font-semibold mb-1 ${
                                            activeFeature === index ? 'text-white' : 'text-white-800'
                                        }`}>
                                            {feature.title}
                                        </h4>
                                        <p className={`text-sm ${
                                            activeFeature === index ? 'text-white/90' : 'text-white-600'
                                        }`}>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className='bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center flex flex-col justify-center'>
                    <h3 className='text-2xl font-bold text-white mb-3'>Ready to Transform Your Business?</h3>
                    <p className='text-white/90 mb-6'>Book your free consultation and discover how MaiERP can transform your business.</p>
                    <a href="#contact" className='bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg'>
                        Contact Me
                    </a>
                </div>
            </div>

            {/* 🔹 BENEFITS SECTION */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8 mb-16'>
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>Real Business Impact</h3>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
                    {benefits.map((benefit, index) => (
                        <div key={index} className='text-center'>
                            <div className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2'>
                                {benefit.value}
                            </div>
                            <p className='text-white-600 text-sm'>{benefit.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔹 PROCESS SECTION */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8 mb-16'>
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>How It Works</h3>
                <div className='grid md:grid-cols-4 gap-6'>
                    {[
                        { num: "01", title: "Analysis", desc: "In-depth study of your company’s structure and workflow." },
                        { num: "02", title: "Design", desc: "Tailored architecture built around your real business needs." },
                        { num: "03", title: "Development", desc: "Fast implementation, testing and refinement." },
                        { num: "04", title: "Deployment", desc: "Training, onboarding and continuous support." }
                    ].map((step, index) => (
                        <div key={index} className='relative'>
                            <div className='flex flex-col items-center text-center'>
                                <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4'>
                                    {step.num}
                                </div>
                                <h4 className='text-white font-semibold mb-2'>{step.title}</h4>
                                <p className='text-white-600 text-sm'>{step.desc}</p>
                            </div>
                            {index < 3 && (
                                <div className='hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 -z-10'></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔹 INDUSTRIES SECTION */}
            <div className='mt-16 mb-16'> 
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>Industries We Serve</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {industries.map((industry, index) => (
                        <div key={index} className='bg-black-200 border border-black-300 rounded-xl p-6 text-center hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer'>
                            <div className='text-4xl mb-2'>{industry.icon}</div>
                            <p className='text-white-800 font-medium'>{industry.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 🔹 TECHNOLOGY STACK */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8 text-center mb-16'>
                <h3 className='text-2xl font-bold text-white mb-4'>Built with Cutting-Edge Technologies</h3>
                <p className='text-white-700 max-w-2xl mx-auto mb-8'>
                    MaiERP combines modern web technologies and proven architectures 
                    to deliver speed, reliability, and seamless scalability.
                </p>
                <div className='flex flex-wrap justify-center gap-6 text-5xl'>
                    <span title=".NET">💠</span>
                    <span title="React">⚛️</span>
                    <span title="TailwindCSS">🎨</span>
                    <span title="Azure">☁️</span>
                    <span title="SQL Server">🗃️</span>
                </div>
            </div>

            {/* 🔹 ABOUT SECTION */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8 text-center'>
                <h3 className='text-2xl font-bold text-white mb-4'>About MaiERP</h3>
                <p className='text-white-700 max-w-2xl mx-auto mb-4'>
                    MaiERP is a fully customizable ERP platform designed and developed by 
                    <span className='text-white font-semibold'> Marco Maier</span>, 
                    a full-stack developer specialized in digital transformation for small and medium businesses.  
                    Each feature is engineered to simplify processes, reduce costs, and boost operational performance.
                </p>
                <a href="#about" className='text-purple-500 hover:text-purple-300 font-semibold underline'>
                    About →
                </a>
            </div>

            {/* 🔹 FINAL CTA */}
            <div className='text-center mt-20'>
                <h3 className='text-3xl font-bold text-white mb-4'>Start your digital transformation today</h3>
                <p className='text-white-700 mb-6'>Empower your business with a solution made just for you.</p>
                <a href="#contact" className='bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-10 py-4 rounded-lg hover:scale-105 transition-transform duration-300'>
                    Book your Free Consultation
                </a>
            </div>
        </section>
    )
}

export default ERPShowcase
