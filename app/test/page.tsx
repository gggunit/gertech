export default function TestPage() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <h1 className="text-4xl font-bold text-neutral-900 mb-4">Test Page</h1>
      <p className="text-lg text-neutral-600">
        This is a simple test page without Framer Motion to check if the basic setup works.
      </p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">Card Test</h2>
        <p>Testing Tailwind CSS classes...</p>
      </div>
    </div>
  );
}
