import { calculateInvestmentResults, formatter } from "../util/investment";
const keys = ["year", "interest", "valueEndOfYear", "annualInvestment"];

export default function Results({ inputValues }) {
  const results = calculateInvestmentResults(inputValues);
  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <th>Year</th>
        <th>Interest (Year)</th>
        <th>Investment Value</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </thead>

      <tbody>
        {results &&
          results.map((data) => {
            const totalInterest =
              data.valueEndOfYear - data.annualInvestment * data.year;
            const totalAmountInvested = data.valueEndOfYear - totalInterest;
            return (
              <tr>
                <td>{data.year}</td>
                <td>{formatter.format(data.valueEndOfYear)}</td>
                <td>{formatter.format(data.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmountInvested)}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
