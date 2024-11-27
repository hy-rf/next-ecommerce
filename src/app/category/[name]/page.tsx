type Params = {
  name: string;
};

// TODO: add a function in which get products that match category name as given name.

export default async function Page({ params }: { params: Params }) {
  const { name } = params;
  return (
    <>
      <h3>{name}</h3>
    </>
  );
}
