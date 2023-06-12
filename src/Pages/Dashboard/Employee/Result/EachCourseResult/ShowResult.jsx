/* eslint-disable react/prop-types */

const ShowResult = ({ result }) => {
  return (
    <tr className="font-roboto font-semibold text-base md:text-lg">
      <td>{result?.examDate}</td>
      <td>{result?.totalMark}</td>
    </tr>
  );
};

export default ShowResult;
