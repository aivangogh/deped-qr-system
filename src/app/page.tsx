import Header from './components/Navbar';
import TrainingInfo from './trainings/TrainingInfo';

export default function Home() {
  return (
    <div className="container pt-4">
      <TrainingInfo />
    </div>
  );
}
