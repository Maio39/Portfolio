const Footer = () => {
    return (
      <footer className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
        <div className="text-white-500 flex gap-2">
          <p>Terms & Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </div>
  
        <div className="flex gap-3">
          <a href="https://github.com/Maio39" 
             target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="assets/github.svg" alt="github" className="w-1/2 h-1/2" />
          </a>
          <a href="https://www.linkedin.com/in/marco-maier-987254249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
             target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="assets/linkedin.svg" alt="linkedin" className="w-1/2 h-1/2" />
          </a>
          <a href="https://www.instagram.com/_.maiermarco._?igsh=ZHo2d2x6dG92NWZu&utm_source=qr" 
             target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="assets/instagram.svg" alt="instagram" className="w-1/2 h-1/2" />
          </a>
        </div>
  
        <p className="text-white-500">© 2025 Marco Maier. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;