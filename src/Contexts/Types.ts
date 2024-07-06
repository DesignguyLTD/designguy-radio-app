interface Response {
  took: number;
  hits: Hitswrapper;
  query?: string;
  version?: string;
  apiVersion?: number;
}

interface Hitswrapper {
  hits: Hits[];
}

interface Hits {
  _id: string;
  _score: number;
  _source: Source;
}

interface Source {
  code: string;
  stream?: string;
  subtitle: string;
  type: string;
  title: string;
  secure?: boolean;
  url: string;
}

export type { Response, Hitswrapper, Hits, Source };
