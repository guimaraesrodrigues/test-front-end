
interface FactInterface {
    id?: string;
    url?: string;
    value?: string;
    icon_url?: string;
    categories?: string[];
}

export class FactModel implements FactInterface {
    public id?: string;
    public url?: string;
    public value?: string;
    public icon_url?: string;
    public categories?: string[];

    constructor({
        id,
        url,
        value,
        icon_url,
        categories
    }: FactInterface) {
        this.id = id;
        this.url = url;
        this.value = value;
        this.icon_url = icon_url;
        this.categories = categories;
    }
}
export interface FactQueryResult {
    total?: number, 
    result?: FactModel[]
  }