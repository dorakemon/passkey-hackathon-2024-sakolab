export default ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-white">発行完了</h2>
      <img src="/Fireworks.gif" alt="Success" width="350" className="mt-6" />
    </div>
  );
};
