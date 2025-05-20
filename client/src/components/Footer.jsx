import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-8 border-t-4 border-gray-900">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              I am a  passionate web developer creating impactful web solutions.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-teal-400">About</a></li>
              <li><a href="#services" className="hover:text-teal-400">Services</a></li>
              <li><a href="#contact" className="hover:text-teal-400">Contact</a></li>
              <li><a href="#privacy" className="hover:text-teal-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400" aria-label="Facebook">
                {/* Facebook Icon (Unicode) */}
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400" aria-label="Twitter">
                {/* Twitter Icon (Unicode) */}
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400" aria-label="LinkedIn">
                {/* LinkedIn Icon (Unicode) */}
                <span className="text-2xl">🔗</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400" aria-label="GitHub">
                {/* GitHub Icon (Unicode) */}
                <span className="text-2xl">🐱</span>
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: moreritesh028@gmail.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy;  {new Date().getFullYear()} EduTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  
    </>
  )
}
