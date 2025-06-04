export interface Unit {
  id: number;
  name: string;
  uuid: string;
}

export interface UnitsResponse {
  units: Unit[];
}
