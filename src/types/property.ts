export type PropertyType = 'residential' | 'commercial' | 'hmo' | 'holiday-let' | 'development' | 'unknown'
export type TenancyStatus = 'let' | 'vacant' | 'under-offer' | 'for-sale'

export interface Property {
  id: string
  address: string
  propertyType: PropertyType
  purchasePrice: number
  currentValue: number | null
  monthlyRent: number
  monthlyMortgage: number | null
  monthlyOtherCosts: number
  tenancyStatus: TenancyStatus
  purchaseDate: string | null
  // Calculated:
  grossYield: number // (annual rent / current value) * 100
  netYield: number // (annual rent - annual costs) / current value * 100
  capitalGrowth: number | null // (currentValue - purchasePrice) / purchasePrice * 100
  annualProfit: number
  isUnderperforming: boolean
  notes: string
}

export interface PortfolioDTO {
  id: string
  ownerName: string
  reportDate: string
  properties: Record<string, Property>
  summary: {
    totalProperties: number
    totalPortfolioValue: number
    totalAnnualRent: number
    totalAnnualProfit: number
    averageGrossYield: number
    averageNetYield: number
    totalCapitalGrowth: number | null
    vacantProperties: number
    underperformingProperties: number
  }
  executiveSummary: string
  recommendations: string[]
}
