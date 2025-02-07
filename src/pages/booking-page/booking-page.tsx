import { useParams} from 'react-router-dom';

function BookingPage():JSX.Element {
  const { id } = useParams<{ id: string }>();

  return (
    <div></div>
  );

}

export default BookingPage;
