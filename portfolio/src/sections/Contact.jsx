import { useRef, useState } from "react"

function Contact() {
    const formRef = useRef()
    const [loading,setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    })
    const handleChange = () => {}
    const handleSubmit = () => {}
  return (
    <section className="c-space my-20">
        <div className="relative min-h-screen flex items-center justify-center flex-col">
            <img src="/assets/terminal.png" alt="terminal background" className="absolute inset-0 min-h-screen" />
            <div className="contact-container">
                <h3 className="head-text">Let's Talk</h3>
                <p className="text-lg text-white-600 mt-3">
                    Whether you're looking to build a new website, improve your existing platform,
                    or bring a unique project to life, I'm here to help.
                </p>
                <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">

                </form>
            </div>
        </div>
    </section>
  )
}

export default Contact