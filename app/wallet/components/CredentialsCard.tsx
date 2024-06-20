type CredentialsCardProps = {
  name: string;
  address: string;
  birthdate: string;
  gender: string;
  link?: string;
};

export const MyNumberCard = ({
  name,
  address,
  birthdate,
  gender,
  link,
}: CredentialsCardProps) => {
  return (
    <a
      className="w-[286px] rounded-lg shadow-lg p-6 text-white"
      style={{ background: "linear-gradient(135deg, #1e3a8a, #666)" }}
      href={`/wallet/credentials/${link}`}
    >
      <div className="mb-10">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="text-sm">
        <p>{address}</p>
      </div>
      <div className="flex flex-row text-sm gap-4">
        <p>{birthdate}</p>
        <p>{gender}</p>
      </div>
    </a>
  );
};
