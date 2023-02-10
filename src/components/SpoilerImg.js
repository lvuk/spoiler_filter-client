const SpoilerImg = ({ showSpoilerReview }) => {
  return (
    <div style={{ borderRadius: 'inherit' }}>
      <iframe
        src='https://embed.lottiefiles.com/animation/61020'
        title='spoiler'
        width='100%'
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      />
      <button
        onClick={showSpoilerReview}
        className='btn'
        style={{
          display: 'block',
          width: '100%',
          height: '15%',
          marginTop: '-.6rem',
          borderBottomLeftRadius: 'inherit',
          borderTopRightRadius: '0',
          borderTopLeftRadius: '0',
        }}
      >
        Show
      </button>
    </div>
  );
};
export default SpoilerImg;
