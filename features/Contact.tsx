// 'use client';

// import { useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import {toast} from "sonner";
// import { CyGroteskmed, CyGroteskreg } from '@/lib/fonts';

// export default function Contact() {
//   const formRef = useRef<HTMLFormElement | null>(null);

//   const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formRef.current) return;

//     try {
//       await emailjs.sendForm(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
//         formRef.current,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
//       );

//       toast('Email sent successfully!');
//       formRef.current.reset();
//     } catch (error) {
//       console.error('EmailJS error:', error);
//       toast('Failed to send email');
//     }
//   };

//   return (
//     <div>
//       {/* Contact */}
//       <section id="contact" className="bg-black text-white py-28">
//         <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          
//           {/* Contact Info */}
//           <div className="space-y-6">
//             <h2 className={`${CyGroteskmed.className} text-4xl font-bold`}>Contact Us</h2>
//             <p className={`${CyGroteskreg.className} text-gray-400 max-w-md`}>
//               Ready to start your project or have a question? Reach out to us, we’d love to talk.
//             </p>

//             <div className={`${CyGroteskreg.className} space-y-4 text-gray-300`}>
//               <div>
//                 <p className="text-sm text-gray-500">WhatsApp</p>
//                 <p className="font-medium">+92 313 2404456</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-medium">fazalamna666@gmail.com</p>
//               </div>

//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="font-medium">Karachi, Pakistan</p>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white rounded-3xl p-10 shadow-lg">
//             <h3 className={` ${CyGroteskmed.className} text-2xl font-semibold mb-6 text-black`}>
//               Send us an Email
//             </h3>

//             <form
//               ref={formRef}
//               onSubmit={sendEmail}
//               className="grid gap-4"
//             >
//               <input
//                 name="subject"
//                 className="p-3 rounded-md border text-black"
//                 placeholder="Subject"
//                 required
//               />
//               <input
//                 name="from_name"
//                 className="p-3 rounded-md border text-black"
//                 placeholder="Name"
//                 required
//               />

//               <input
//                 name="from_email"
//                 type="email"
//                 className="p-3 rounded-md border text-black"
//                 placeholder="Email"
//                 required
//               />

//                <input
//                 name="Phonenumber"
//                 type="text"
//                 className="p-3 rounded-md border text-black"
//                 placeholder="Phone Number"
//                 required
//               />

//               <textarea
//                 name="message"
//                 className="p-3 rounded-md border text-black"
//                 placeholder="Project details"
//                 required
//               />

//               <button
//                 type="submit"
//                 className="bg-[#C9A24D] text-black py-3 rounded-md font-medium hover:opacity-90 transition"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>

//       <footer className="text-center text-sm text-gray-500 py-6 bg-[#F7F1E8]">
//         © {new Date().getFullYear()} NextByte Studio. All rights reserved.
//       </footer>
//     </div>
//   );
// }
'use client';

import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { CyGroteskmed, CyGroteskreg } from '@/lib/fonts';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const { ref, inView } = useInView(0.1);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );
      toast('Email sent successfully!');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { label: 'WhatsApp', value: '+92 313 2404456' },
    { label: 'Email', value: 'fazalamna666@gmail.com' },
    { label: 'Location', value: 'Karachi, Pakistan' },
  ];

  const inputClass =
    'p-3 rounded-md border border-gray-200 text-black focus:outline-none focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D]/30 transition-all duration-300 placeholder:text-gray-400';

  return (
    <div>
      <section
        id="contact"
        ref={ref as React.RefObject<HTMLElement>}
        className="bg-black text-white py-28 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div
            className={`space-y-6 transition-all duration-800 ease-out ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{ transitionDuration: '0.8s' }}
          >
            <h2 className={`${CyGroteskmed.className} text-4xl font-bold`}>
              Contact Us
            </h2>
            <p className={`${CyGroteskreg.className} text-gray-400 max-w-md`}>
              Ready to start your project or have a question? Reach out to us,
              we'd love to talk.
            </p>

            <div className={`${CyGroteskreg.className} space-y-6 text-gray-300`}>
              {contactInfo.map((info, i) => (
                <div
                  key={info.label}
                  className={`group transition-all duration-600 ${
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  <p className="text-sm text-gray-500 mb-0.5">{info.label}</p>
                  <p className="font-medium transition-colors duration-300 group-hover:text-[#C9A24D]">
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`bg-white rounded-3xl p-10 shadow-lg transition-all duration-800 ease-out ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{ transitionDuration: '0.8s', transitionDelay: '0.15s' }}
          >
            <h3 className={`${CyGroteskmed.className} text-2xl font-semibold mb-6 text-black`}>
              Send us an Email
            </h3>

            <form ref={formRef} onSubmit={sendEmail} className="grid gap-4">
              {[
                { name: 'subject', placeholder: 'Subject', type: 'text' },
                { name: 'from_name', placeholder: 'Name', type: 'text' },
                { name: 'from_email', placeholder: 'Email', type: 'email' },
                { name: 'Phonenumber', placeholder: 'Phone Number', type: 'text' },
              ].map((field, i) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  className={inputClass}
                  placeholder={field.placeholder}
                  required
                  style={{
                    animation: inView
                      ? `fadeUp 0.5s ease forwards ${0.3 + i * 0.07}s`
                      : 'none',
                    opacity: inView ? undefined : 0,
                  }}
                />
              ))}

              <textarea
                name="message"
                className={`${inputClass} min-h-[100px] resize-none`}
                placeholder="Project details"
                required
                style={{
                  animation: inView
                    ? 'fadeUp 0.5s ease forwards 0.6s'
                    : 'none',
                  opacity: inView ? undefined : 0,
                }}
              />

              <button
                type="submit"
                disabled={sending}
                className="bg-[#C9A24D] text-black py-3 rounded-md font-medium transition-all duration-300 hover:opacity-90 hover:shadow-[0_8px_25px_rgba(201,162,77,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  animation: inView ? 'fadeUp 0.5s ease forwards 0.7s' : 'none',
                  opacity: inView ? undefined : 0,
                }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6 bg-[#F7F1E8]">
        © {new Date().getFullYear()} NextByte Studio. All rights reserved.
      </footer>

      <style jsx global>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}