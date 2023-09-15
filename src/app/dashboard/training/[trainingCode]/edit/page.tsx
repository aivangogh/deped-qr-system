import EditTrainingForm from './(components)/edit-training-form';

export default function EditTraining({
  params,
}: {
  params: { trainingCode: string };
}) {
  return (
    <div className="container flex justify-center my-8">
      <EditTrainingForm trainingCode={params.trainingCode} />
    </div>
  );
}
