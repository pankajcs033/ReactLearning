import { useState } from "react";

export default function InvestmentInput({ inputValues, handleValueChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investemnt</label>
          <input
            type="number"
            required
            value={inputValues.initialInvestment}
            onChange={(event) =>
              handleValueChange("initialInvestment", event.target.value)
            }
          />
        </p>
        <p>
          <label>Annual Investemnt</label>
          <input
            type="number"
            required
            value={inputValues.annualInvestment}
            onChange={(event) =>
              handleValueChange("annualInvestment", event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            required
            value={inputValues.expectedReturn}
            onChange={(event) =>
              handleValueChange("expectedReturn", event.target.value)
            }
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            required
            value={inputValues.duration}
            onChange={(event) =>
              handleValueChange("duration", event.target.value)
            }
          />
        </p>
      </div>
    </section>
  );
}
