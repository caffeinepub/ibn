import { LandingPage } from './components/LandingPage';
import { IBNHeader } from './components/IBNHeader';
import { IBNFooter } from './components/IBNFooter';

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <IBNHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
      <IBNFooter />
    </div>
  );
}

export default App;
