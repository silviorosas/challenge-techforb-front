export interface PlantaListResponse {
    id: number;
    nombrePlanta: string;
    pais: string;
    urlBandera: string;
    lecturas: number;
    alertasMedias: number;
    alertasRojas: number;
    sensoresDeshabilitados: number;
  }