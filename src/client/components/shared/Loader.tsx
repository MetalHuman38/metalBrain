const Loader = () => {
  return (
    <div className="flex-center w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        loading="lazy"
        width={50}
        height={50}
        className="inline-block animate-spin rounded-full border-4 border-gray-500 border-opacity-25"
      />
    </div>
  );
};

export default Loader;
