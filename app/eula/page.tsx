import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'End User License Agreement (EULA) - Markury',
  description: 'End User License Agreement for Markury screen annotation software.',
}

export default function EULA() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-20 sm:pt-24">
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="container-narrow">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              End User License Agreement (EULA)
            </h1>
            <p className="text-gray-600 max-w-2xl mb-10">
              Last Updated: February 14, 2026. Please read this End User License Agreement carefully before using the Markury software.
            </p>

            <div className="space-y-8 text-gray-700 text-sm md:text-base leading-relaxed">
              <section>
                <p className="mb-4">
                  This End User License Agreement (&quot;Agreement&quot;) is a legal agreement between you (&quot;User&quot; or &quot;You&quot;) and Nexrover (&quot;Company,&quot; &quot;We,&quot; &quot;Us,&quot; or &quot;Our&quot;) regarding your use of the Markury software (&quot;Software&quot;).
                </p>
                <p>
                  By downloading, installing, or using the Software, you agree to be bound by the terms of this Agreement. If you do not agree to the terms of this Agreement, do not download, install, or use the Software.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  1. Grant of License
                </h2>
                <p className="mb-2">
                  Subject to your compliance with the terms of this Agreement, Nexrover grants you a non-exclusive, non-transferable, revocable license to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Install and use the Software on up to two (2) devices owned or controlled by you for your personal or professional use.</li>
                  <li>Make one backup copy of the Software solely for archival purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  2. Restrictions
                </h2>
                <p className="mb-2">You agree not to, and you will not permit others to:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Decompile, reverse engineer, disassemble, attempt to derive the source code of, or decrypt the Software.</li>
                  <li>Modify, adapt, improve, or create derivative works from the Software.</li>
                  <li>Rent, lease, lend, sell, redistribute, or sublicense the Software.</li>
                  <li>Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) of Nexrover or its affiliates, partners, suppliers or the licensors of the Software.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  3. Updates and Maintenance
                </h2>
                <p>
                  Nexrover may from time to time provide enhancements or improvements to the features/functionality of the Software, which may include patches, bug fixes, updates, upgrades and other modifications (&quot;Updates&quot;). Updates may modify or delete certain features and/or functionalities of the Software. You agree that Nexrover has no obligation to (i) provide any Updates, or (ii) continue to provide or enable any particular features and/or functionalities of the Software to you.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  4. Ownership
                </h2>
                <p>
                  The Software and all worldwide copyrights, trade secrets, and other intellectual property rights therein are the exclusive property of Nexrover and its licensors. Nexrover reserves all rights in the Software not expressly granted to you in this Agreement.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  5. Termination
                </h2>
                <p>
                  The Agreement is effective strictly until terminated by you or Nexrover. Your rights under this Agreement will terminate automatically if you fail to comply with any of its terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  6. Disclaimer of Warranties
                </h2>
                <p>
                  The Software is provided to you &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, Nexrover expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Software.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  7. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall Nexrover be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, checking data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Software).
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  8. Contact Information
                </h2>
                <p>
                  If you have any questions about this Agreement, please contact us at <a href="mailto:support@markury.app" className="text-markury-cyan hover:underline font-medium">support@markury.app</a>.
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
