import React from "react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="flex flex-col mb-[50px]">
{/* About Company */}
<article className="relative py-20 px-4 md:px-8 overflow-hidden mb-5">
  <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 relative z-10">
    {/* Company Logo */}
    <div className="flex justify-center w-full md:w-1/3 mb-8 md:mb-0">
      <img
        src="/Qmever.png"
        alt="Qmever Bangladesh E-commerce Logo"
        className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-[25%] shadow-2xl shadow-gray-500 hover:scale-105 transform transition duration-500"
      />
    </div>

    {/* About Text */}
    <div className="w-full md:w-2/3 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-wide text-[#062919]">
        About <span className="text-green-600">Qmever</span>
      </h1>
      <p className="text-base md:text-lg leading-relaxed text-gray-700 mb-4">
        <strong>Qmever</strong> is a modern <em>Bangladesh e-commerce platform</em> designed to make online shopping simple, fast, and reliable. Our mission is to seamlessly connect buyers and sellers, offering quality products from trusted sources at competitive prices.
      </p>
      <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-4">
        Discover the latest trends, exclusive deals, and enjoy a smooth shopping experience. We prioritize <strong>security</strong>, <strong>fast delivery</strong>, and <strong>customer satisfaction</strong> to ensure every purchase is enjoyable and worry-free.
      </p>
      <p className="text-base md:text-lg leading-relaxed text-gray-600">
        Whether you’re a casual shopper or a business, Qmever provides innovative tools and services for growth. We are committed to <strong>quality management</strong>, <strong>innovation</strong>, and <strong>trust</strong>.
      </p>
    </div>
  </div>
</article>


      {/* ভেঙে বোঝানো Section */}
      <section className="relative py-20 overflow-hidden mb-5">
        <div className="absolute top-0 left-0 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-green-300 rounded-full blur-3xl opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold shadow-sm mb-4">
              Quality • Value • Rules
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#062919] drop-shadow-md">
              ভেঙে বোঝানো
            </h2>
            <p className="mt-5 text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              <span className="font-semibold text-green-700">Qmever</span> বিশ্বাস করে 
              <span className="font-semibold"> মান নিয়ন্ত্রণ</span>, 
              <span className="font-semibold"> গ্রাহকের প্রতি সঠিক মূল্য</span> এবং 
              <span className="font-semibold"> ব্যবসার প্রতিটি নিয়ম মানা</span> — 
              এগুলোই টেকসই ই-কমার্সের মূলভিত্তি।
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group relative rounded-3xl bg-white border border-gray-100 p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 opacity-0 group-hover:opacity-100 rounded-3xl transition"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-600 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                  📊
                </div>
                <h3 className="text-2xl font-bold text-[#062919] mb-3">
                  Quality Managing
                </h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  মান নিয়ন্ত্রণ ও উন্নয়ন।
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li>স্ট্যান্ডার্ড নির্ধারণ</li>
                  <li>QC চেকলিস্ট ও অডিট</li>
                  <li>নিরবচ্ছিন্ন উন্নয়ন (Kaizen)</li>
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-3xl bg-white border border-gray-100 p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 opacity-0 group-hover:opacity-100 rounded-3xl transition"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-600 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                  🛒
                </div>
                <h3 className="text-2xl font-bold text-[#062919] mb-3">
                  E-com Value
                </h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  ই-কমার্সে গ্রাহকের জন্য সঠিক দাম, নির্ভরযোগ্যতা ও আস্থা তৈরি।
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li>ন্যায্য মূল্য ও স্বচ্ছতা</li>
                  <li>দ্রুত ডেলিভারি ও ট্র্যাকিং</li>
                  <li>ঝামেলাহীন রিটার্ন/রিফান্ড</li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-3xl bg-white border border-gray-100 p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 opacity-0 group-hover:opacity-100 rounded-3xl transition"></div>
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-green-100 text-green-600 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                  📜
                </div>
                <h3 className="text-2xl font-bold text-[#062919] mb-3">
                  Every Rule
                </h3>
                <p className="text-gray-700 leading-relaxed mb-5">
                  ব্যবসার প্রতিটি নিয়ম, নৈতিকতা ও মানদণ্ড মেনে চলা।
                </p>
                <ul className="text-sm text-gray-600 list-disc pl-5 space-y-2">
                  <li>SOP ও নীতি মেনে অপারেশন</li>
                  <li>ডেটা প্রাইভেসি ও সিকিউরিটি</li>
                  <li>কনজিউমার রাইটস কমপ্লায়েন্স</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-6">
        {/* Contact Info */}
        <address className="not-italic lg:w-1/2 p-6 md:p-8 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-[#062919] mb-4">Get in Touch</h2>

          {/* WhatsApp */}
          <div className="flex items-center border-2 border-[#062919] rounded-lg px-5 py-3 shadow-sm hover:shadow-md transition">
            <span className="text-2xl text-green-600 border-r-2 border-gray-300 pr-3">
              <IoLogoWhatsapp />
            </span>
            <a href="" className="ml-3 text-lg font-semibold text-gray-700">
              +880 1813-######
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center border-2 border-[#062919] rounded-lg px-5 py-3 shadow-sm hover:shadow-md transition">
            <span className="text-2xl text-blue-600 border-r-2 border-gray-300 pr-3">
              <TfiEmail />
            </span>
            <a href="mailto:qmever.bd@gmail.com" className="ml-3 text-lg font-semibold text-gray-700">
              qmever.bd@gmail.com
            </a>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4 mt-4">
            <a href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61568471566477" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
              <FaFacebookF />
            </a>
            {/* <a href="https://instagram.com/qmever" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition">
              <FaInstagram />
            </a> */}
           
          </div>

          {/* Map */}
          <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg mt-6">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5313164957697!2d89.19146881117503!3d22.86467507919838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff6dbaefdd6df9%3A0x3f852db6431d2749!2sQmever!5e1!3m2!1sen!2sbd!4v1757448155874!5m2!1sen!2sbd"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Qmever Office Location"
            ></iframe>
          </div>
        </address>

        {/* Contact Form */}
        <div className="lg:w-1/2 p-6 md:p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#062919] mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input type="text" name="name" placeholder="Enter your name"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062919]" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Your Email</label>
              <input type="email" name="email" placeholder="Enter your email"
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062919]" />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Your Message</label>
              <textarea rows="4" name="message" placeholder="Write your message..."
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#062919]"></textarea>
            </div>
            <button type="submit"
              className="w-full bg-[#062919] text-white py-3 rounded-lg hover:bg-[#084d31] duration-200">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#062919] w-full fixed bottom-0 z-[999] left-0 text-white text-center py-4">
        © {new Date().getFullYear()} Qmever.com. All rights reserved.
      </footer>
    </section>
  );
};

export default Contact;
