type CredentialsCardProps = {
  name: string;
  address: string;
  birthdate: string;
  gender: string;
};

export const MyNumberCard = ({
  name,
  address,
  birthdate,
  gender,
}: CredentialsCardProps) => {
  return (
    <div
      className="w-[286px] rounded-lg shadow-lg p-6 text-white"
      style={{ background: "linear-gradient(135deg, #1e3a8a, #666)" }}
    >
      <div className="mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="mb-2">
        <p>{address}</p>
      </div>
      <div className="flex flex-row gap-4">
        <p>{birthdate}</p>
        <p>{gender}</p>
      </div>
    </div>
  );
};
