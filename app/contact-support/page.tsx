import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mail01Icon } from 'hugeicons-react'

export const metadata = {
  title: 'Contact Support - Markury',
  description: 'Need help with Markury? Contact our support team.',
}

export default function ContactSupport() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-narrow">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Support</h1>
            <p className="text-xl text-gray-600 mb-12">
              Have a question or run into an issue? We're here to help.
            </p>

            <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 border border-gray-100">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-markury-cyan mx-auto mb-6 shadow-sm border border-gray-100">
                <Mail01Icon className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Send us an email and we'll get back to you as soon as possible. Whether it's a bug report, feature request, or just a question about your license.
              </p>

              <a 
                href="mailto:support@markury.app" 
                className="btn-primary inline-flex items-center gap-2"
              >
                <Mail01Icon className="w-5 h-5" />
                support@markury.app
              </a>
            </div>

            <div className="mt-12 text-gray-500 text-sm">
              <p>
                Alternatively, check our <a href="/#faq" className="text-gray-900 hover:underline">FAQ section</a> for quick answers to common questions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
