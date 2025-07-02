

const Footer = () => {
    return (
      <div>
        <footer className="bg-gray-500 text-white py-8">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {/* Logo and Site Name */}
            <div className="flex items-center space-x-3">
              <img className="w-12" src="./library.jpg" alt="" />
              <span className="text-2xl font-semibold">Book Ocean</span>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-sm text-white">
                Email: support@bookocean.com
                <br />
                Phone: +1 (234) 567-8901
                <br />
                Address: 123 Ocean Street, Booktown
              </p>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <form className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded text-white w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
            &copy; 2025 Book Ocean. All rights reserved.
          </div>
        </footer>
      </div>
    );
}

export default Footer;