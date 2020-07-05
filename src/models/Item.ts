export interface Item {
  id: number;
  by?: string;
  type?: string;
  /** Post creation time, number of ms since 1970 */
  time?: number;
  text?: string;
  deleted?: boolean;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  parts?: number[];
  descendants?: number;
  score?: number;
  title?: string;
  createDate?: Date;
}

export default class ItemModel implements Item {
  public readonly id: number;

  public readonly by?: string | undefined;

  public readonly type?: string | undefined;

  public readonly time?: number | undefined;

  public readonly text?: string | undefined;

  public readonly deleted?: boolean | undefined;

  public readonly dead?: boolean | undefined;

  public readonly parent?: number | undefined;

  public readonly poll?: number | undefined;

  public readonly kids?: number[] | undefined;

  public readonly url?: string | undefined;

  public readonly parts?: number[] | undefined;

  public readonly descendants?: number | undefined;

  public readonly score?: number | undefined;

  public readonly title?: string | undefined;

  public readonly createDate?: Date;

  public kidsItems?: ItemModel[];

  constructor(fields: Item) {
    if (!fields.id) {
      throw new Error(`Error instantiating News Item, id is required: ${fields.id}`);
    }

    this.id = fields.id;
    this.by = fields.by;
    this.type = fields.type;
    this.time = fields.time;
    this.dead = fields.dead;
    this.deleted = fields.deleted;
    this.descendants = fields.descendants;
    this.kids = fields.kids;
    this.parent = fields.parent;
    this.parts = fields.parts;
    this.poll = fields.poll;
    this.text = fields.text;
    this.url = fields.url;
    this.title = fields.title;
    this.createDate = this.time ? new Date(this.time * 1000) : undefined;
    this.kidsItems = [];
  }
}
