import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent -z-10 blur-3xl pointer-events-none" />
      <Navbar variant="main" />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
