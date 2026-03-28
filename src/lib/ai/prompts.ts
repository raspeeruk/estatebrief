export const PROPERTY_COLUMN_DETECTION_PROMPT = `You are analyzing CSV headers to map them to standard property portfolio data fields.

Given these CSV column headers, determine which standard field each maps to.

Standard fields:
- address: Property address / full address / location
- propertyType: Type of property (residential, commercial, HMO, etc.)
- purchasePrice: The price paid to buy the property
- currentValue: Current market value / valuation
- monthlyRent: Monthly rental income / PCM rent
- monthlyMortgage: Monthly mortgage payment
- otherMonthlyCosts: Other monthly costs / expenses / outgoings
- tenancyStatus: Current let/vacant/under-offer status
- purchaseDate: Date the property was purchased
- notes: Any notes or comments
- ignore: Not relevant to property portfolio

Be generous: "Rent PCM", "Rental Income", "Monthly Income" → monthlyRent.
"Market Value", "Valuation", "Est. Value" → currentValue.
"Mortgage Payment", "Mortgage PCM" → monthlyMortgage.

CSV Headers: {headers}

Respond with ONLY a JSON object like:
{
  "Address": "address",
  "Monthly Rent": "monthlyRent",
  ...
}`

export const PORTFOLIO_ANALYSIS_PROMPT = `You are a UK property investment analyst. Here is a property portfolio:
{properties}

1. For each property, assess whether it is underperforming (gross yield <4% is concerning for UK residential)
2. Generate 3-5 specific recommendations for the portfolio (e.g., remortgage, sell underperformer, increase rent)
3. Write a 3-sentence executive summary highlighting portfolio strengths and key actions needed
4. Flag any properties with unusually high or low yields that need review

Return JSON: { "underperformingIds": string[], "recommendations": string[], "executiveSummary": string, "flaggedForReview": {"id": string, "reason": string}[] }`
