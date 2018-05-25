export interface IList {
    naam: string,
    items: IListItem[]
}

export interface IListItem {
    versnelling: number,
    snelheid: number,
    terugVal: number
}