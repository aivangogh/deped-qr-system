import Enrollment from './(components)/Enrollment';

export default function ParticipantPage() {
  return (
    <div className="h-screen max-h-screen flex items-center justify-center">
      <h1>Participant Page</h1>
      <div>
        <Enrollment />
      </div>
    </div>
  );
}
