import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-20 sm:pt-24">
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="container-narrow">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 max-w-2xl mb-10">
              This Privacy Policy explains how Markury (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) collects, uses, and protects your information when you use
              our website, desktop application, and related services (collectively,
              the &quot;Service&quot;).
            </p>

            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. Information We Collect
              </h2>
              <p className="mb-2">
                We collect the information you provide directly to us, such as
                your name, email address, and payment information when you
                purchase a license, contact support, or subscribe to updates.
              </p>
              <p>
                We may also collect limited technical information such as device
                type, operating system version, and usage analytics to help us
                improve the Service. We do not record or transmit the contents
                of your screen annotations unless explicitly shared with us for
                support purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use your information to provide and maintain the Service,
                process payments, communicate with you, improve our product, and
                comply with legal obligations. We may send you important
                transactional emails (such as purchase confirmations and license
                details) and optional product updates or announcements, which
                you can opt out of at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. Data Sharing and Third Parties
              </h2>
              <p>
                We do not sell your personal information. We may share your
                information with trusted third-party service providers (such as
                payment processors and analytics providers) who assist us in
                operating the Service. These providers are only permitted to use
                your information on our behalf and in accordance with this
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Data Retention and Security
              </h2>
              <p>
                We retain your information only for as long as necessary to
                fulfill the purposes described in this Privacy Policy, unless a
                longer retention period is required by law. We use reasonable
                technical and organizational measures to protect your
                information, but no method of transmission or storage is
                completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Your Rights
              </h2>
              <p>
                Depending on your location, you may have certain rights regarding
                your personal information, such as the right to access, correct,
                or delete your data. To exercise these rights, please contact us
                using the contact details on our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. If we make
                material changes, we will notify you by updating the date at the
                top of this page or by other appropriate means. Your continued
                use of the Service after any changes indicates your acceptance
                of the updated policy.
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
