import img from '../assets/photos/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='Not found' />
        <h3>It looks like we can't find page you're looking for </h3>
      </div>
    </Wrapper>
  );
};
export default Error;
