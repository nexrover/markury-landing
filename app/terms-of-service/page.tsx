import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-20 sm:pt-24">
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 max-w-2xl mb-10">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of
            Markury, provided by Nexrover, including our website, desktop application, and related
            services (collectively, the &quot;Service&quot;). By using the Service, you
            agree to be bound by these Terms.
          </p>

          <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. Use of the Service
              </h2>
              <p>
                You may use the Service only in accordance with these Terms and
                all applicable laws. You are responsible for maintaining the
                security of your devices, accounts, and license information and
                for all activity that occurs under your account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. License
              </h2>
              <p>
                Subject to your compliance with these Terms and payment of any
                applicable fees, we grant you a limited, non-exclusive,
                non-transferable license to install and use the Markury
                application for your personal or internal business purposes.
                You may not reverse engineer, decompile, resell, or redistribute
                the Service except as expressly permitted by us in writing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. Payments
              </h2>
              <p>
                All fees are due at the time of purchase and are processed
                through our third-party payment provider. Prices and features
                are subject to change, but changes will not affect an existing
                license term that has already been paid for.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Intellectual Property
              </h2>
              <p>
                Markury, including all related trademarks, logos, and content,
                is owned by us or our licensors and is protected by intellectual
                property laws. These Terms do not grant you any ownership rights
                in the Service or its content.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis,
                without warranties of any kind, whether express or implied. To
                the maximum extent permitted by law, we disclaim all warranties,
                including any implied warranties of merchantability, fitness for
                a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, we will not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or data, arising out of
                or in connection with your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                7. Termination
              </h2>
              <p>
                We may suspend or terminate your access to the Service at any
                time if we reasonably believe you have violated these Terms or
                are using the Service in a way that could harm us or others. You
                may stop using the Service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                8. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. If we make material
                changes, we will notify you by updating the date at the top of
                this page or by other appropriate means. Your continued use of
                the Service after any changes indicates your acceptance of the
                updated Terms.
              </p>
            </section>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
