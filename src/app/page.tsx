import Header from './trainings/Header';
import TrainingInfo from './trainings/page';

export default function Home() {
  return (
    <div className="w-full">
      <div className="border-b container py-2 px-12">
        <Header />
      </div>
      <div className='container pt-4'>
        <TrainingInfo />
      </div>
    </div>
  );
}
