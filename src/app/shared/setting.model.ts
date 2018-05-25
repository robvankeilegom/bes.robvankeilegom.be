
export interface ISetting {
  naam: string
  toerental: number
  diffVerhouding: number
  bandOmtrek: number
  versnellingen: IVersnelling[]
}

export interface IVersnelling {
  nummer: number,
  waarde: number
}