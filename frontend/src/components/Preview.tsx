interface IPreviewParams {
  src: string;
}

export function Preview({ src }: IPreviewParams) {
  return (
    <div
      className="w-9 h-9 rounded-md bg- bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}
