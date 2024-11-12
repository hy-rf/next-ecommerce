import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">How do I create an account?</li>
          <li className="mb-2">How can I add items to my cart?</li>
          <li className="mb-2">What payment methods do you accept?</li>
          <li className="mb-2">How can I track my order?</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>If you need further assistance, please don't hesitate to contact us:</p>
        <p>Email: heyu880202@gmail.com</p>
      </section>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}