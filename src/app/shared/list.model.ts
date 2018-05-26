export interface IList {
    naam: string,
    color: string,
    items: IListItem[]
}

export interface IListItem {
    versnelling: number,
    snelheid: number,
    terugVal: number
}