import Link from 'next/link'

export default function BlogCTA() {
  return (
    <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100 my-10 text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to upgrade your screen annotations?</h3>
      <p className="text-gray-700 mb-6 max-w-lg mx-auto">
        Try Markury, the modern onscreen drawing tool built for real-time presentations, remote collaboration, and seamless recording.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="btn-primary inline-flex justify-center items-center">
          Get Started
        </Link>
        <Link href="/user-guide" className="btn-secondary inline-flex justify-center items-center">
          Read Guide
        </Link>
      </div>
    </div>
  )
}
