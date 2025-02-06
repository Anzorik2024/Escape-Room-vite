type EmptyPlugProps = {
  text: string;
}

function EmptyPlug({text}: EmptyPlugProps): JSX.Element{
  return(
    <div className="container">
      <div className="page-content__title-wrapper page-content__title-wrapper--underlined">
        <h1 className="title--size-s">{text}</h1>
      </div>
    </div>
  );
}

export default EmptyPlug;
