import { useParams} from 'react-router-dom';

function BookingPage():JSX.Element {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <div></div>
  );

}

export default BookingPage;
