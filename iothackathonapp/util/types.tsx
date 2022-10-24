export interface IOA_Reading {
  timestamp: number;
  moisture: number;
  profile: string;
}

export type ProfileReadingsMap = Map<string, Array<IOA_Reading>>;
