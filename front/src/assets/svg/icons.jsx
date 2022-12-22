export const ArrowBack = ({ size, fill }) => {
  return (
    <svg
      width={size ?? "35"}
      height={size ?? "35"}
      viewBox="0 0 35 35"
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.91675 16.0415L13.1251 2.9165V10.2082C30.5565 10.2082 32.5676 24.3219 32.0834 32.0832C31.3513 28.1675 31.0115 21.8748 13.1251 21.8748V29.1665L2.91675 16.0415Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ArrowRight = ({ size, fill }) => {
  return (
    <svg
      width={size ?? "35"}
      height={size ?? "35"}
      viewBox="0 0 24 24"
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 5L20 12L13 19M4 12H20H4Z"
        stroke="#58585F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const Book = ({ size, fill }) => {
  return (
    <svg
      width={size ?? "35"}
      height={size ?? "35"}
      viewBox="0 0 24 24"
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.6667 3.3501H10C7.99 3.3501 5 4.68176 5 8.3501V31.6834C5 35.3518 7.99 36.6834 10 36.6834H35V33.3501H10.02C9.25 33.3301 8.33333 33.0251 8.33333 31.6834C8.33333 31.5151 8.34833 31.3651 8.37333 31.2284C8.56 30.2701 9.345 30.0334 10.0183 30.0168H33.3333C33.3633 30.0168 33.385 30.0018 33.415 30.0001H35V6.68343C35 4.8451 33.505 3.3501 31.6667 3.3501ZM31.6667 26.6834H8.33333V8.3501C8.33333 7.00676 9.25 6.70343 10 6.68343H21.6667V18.3501L25 16.6834L28.3333 18.3501V6.68343H31.6667V26.6834Z"
        fill="#fff"
      />
    </svg>
  );
};
