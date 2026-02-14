import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-20 sm:pt-24">
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="container-narrow">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Refund Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mb-10">
            We want you to have a great experience with Markury, provided by Nexrover. This Refund
            Policy explains when and how Nexrover (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) can offer refunds for purchases made
            through our website.
          </p>

          <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                1. Eligibility for Refunds
              </h2>
              <p>
                If you experience technical issues that prevent you from using
                Markury as advertised and we are unable to resolve the problem
                after you contact support, you may be eligible for a refund
                within a reasonable period from your purchase date (typically
                14–30 days, depending on your jurisdiction and store policies).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                2. How to Request a Refund
              </h2>
              <p>
                To request a refund, please contact our support team with your
                order details, proof of purchase, and a description of the issue
                you are facing. We may ask for additional information to help us
                diagnose and resolve the problem before processing a refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                3. Non-Refundable Situations
              </h2>
              <p>
                We generally cannot offer refunds in cases of change of mind,
                accidental purchase after download and activation, or when the
                product is functioning as described but does not meet your
                subjective expectations. Abuse of the refund policy may result
                in denial of future refund requests.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                4. Third-Party Stores
              </h2>
              <p>
                If you purchased Markury through a third-party store (such as an
                app marketplace), their respective refund policies may apply,
                and refunds may need to be requested directly through that
                store.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                5. Changes to This Policy
              </h2>
              <p>
                We may update this Refund Policy from time to time. Any changes
                will apply to future purchases and, where required by law, we
                will notify you of material updates.
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
