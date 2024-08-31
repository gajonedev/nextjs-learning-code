export const Loader = () => {
  return (
    <svg
      className="loader-container"
      viewBox="0 0 40 40"
      height="40"
      width="40"
    >
      <circle
        className="loader-track"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
      />
      <circle
        className="loader-car"
        cx="20"
        cy="20"
        r="17.5"
        pathLength="100"
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
};
