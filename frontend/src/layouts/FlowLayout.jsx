import Navbar from '../components/Navbar';

export default function FlowLayout({ children, currentStep, variant = 'flow' }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <Navbar variant={variant} currentStep={currentStep} />
      <main className="flex-1 flex flex-col pt-12 pb-24 px-6 relative">
        {children}
      </main>
    </div>
  );
}
