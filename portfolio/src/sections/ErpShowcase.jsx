import { Suspense, useState } from 'react'

const ERPShowcase = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: "🎯",
            title: "Personalizzazione Totale",
            desc: "Ogni modulo viene progettato sulle tue esigenze specifiche",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: "⚡",
            title: "Implementazione Rapida",
            desc: "Da template a soluzione operativa in tempi record",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: "📊",
            title: "Analytics Avanzate",
            desc: "Dashboard intelligenti per decisioni data-driven",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: "🔄",
            title: "Scalabilità Garantita",
            desc: "Cresce con la tua azienda, senza limiti",
            color: "from-green-500 to-emerald-500"
        }
    ];

    const benefits = [
        { label: "Riduzione Costi Operativi", value: "40%" },
        { label: "Aumento Produttività", value: "60%" },
        { label: "Tempo di Setup", value: "2-4 sett" },
        { label: "ROI Medio", value: "6 mesi" }
    ];

    return (
        <section className='c-space my-20' id='erp-showcase'>
            {/* Hero Section */}
            <div className='relative mb-20'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl'></div>
                <div className='relative'>
                    <p className='head-text mb-4'>NextERP - Il Tuo ERP Su Misura</p>
                    <p className='text-xl text-white-600 max-w-3xl'>
                        Non un software standard, ma <span className='text-white font-semibold'>la soluzione perfetta</span> per il tuo business.
                        Dalla logistica alla produzione, dall'inventario alle vendite.
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-8 mb-16'>
                {/* Video/Demo Section */}
                <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500'></div>
                    <div className='relative border border-black-300 bg-black-200 rounded-2xl overflow-hidden h-[500px]'>
                        <video controls className="w-full h-full object-contain bg-black">
                            <source src="textures/ErpShowcase/NextERP.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/* Features Section */}
                <div className='flex flex-col gap-6'>
                    <div className='bg-black-200 border border-black-300 rounded-2xl p-8'>
                        <h3 className='text-2xl font-bold text-white mb-6'>Perché Scegliere il Nostro NextERP?</h3>
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
                    <div className='bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center'>
                        <h3 className='text-2xl font-bold text-white mb-3'>Pronto a Trasformare il Tuo Business?</h3>
                        <p className='text-white/90 mb-6'>Richiedi una demo personalizzata gratuita</p>
                        <button className='bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg'>
                            Contattami Ora
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8 mb-16'>
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>Risultati Concreti</h3>
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

            {/* Process Section */}
            <div className='bg-black-200 border border-black-300 rounded-2xl p-8'>
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>Come Funziona</h3>
                <div className='grid md:grid-cols-4 gap-6'>
                    {[
                        { num: "01", title: "Analisi", desc: "Studio approfondito delle tue esigenze" },
                        { num: "02", title: "Progettazione", desc: "Design della soluzione personalizzata" },
                        { num: "03", title: "Sviluppo", desc: "Implementazione rapida e testing" },
                        { num: "04", title: "Deploy", desc: "Formazione e supporto continuo" }
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

            {/* Industries Section */}
            <div className='mt-16'>
                <h3 className='text-2xl font-bold text-white mb-8 text-center'>Settori di Applicazione</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {[
                        { icon: "🚚", name: "Logistica" },
                        { icon: "🏭", name: "Produzione" },
                        { icon: "📦", name: "E-commerce" },
                        { icon: "🏪", name: "Retail" },
                        { icon: "🏗️", name: "Edilizia" },
                        { icon: "💊", name: "Farmaceutica" },
                        { icon: "🍽️", name: "Food & Beverage" },
                        { icon: "⚙️", name: "Manufacturing" }
                    ].map((industry, index) => (
                        <div 
                            key={index}
                            className='bg-black-200 border border-black-300 rounded-xl p-6 text-center hover:border-purple-500 transition-all duration-300 hover:scale-105 cursor-pointer'
                        >
                            <div className='text-4xl mb-2'>{industry.icon}</div>
                            <p className='text-white-800 font-medium'>{industry.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ERPShowcase