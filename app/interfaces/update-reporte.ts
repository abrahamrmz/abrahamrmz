export interface UpdateReporte {
    action: string;
    reporte: number;
    tecnico: number;
    id: string;
    estatus?: string;
    SOLUCION: string;
    OBSERVACIONES: string;
    DESCRIPCION: string;
    DIAGNOSTICO?: string;
    contadorBN?: number;
    contadorC?: number;
    contadorESC?: number;
    P_NEGRO?: number;
    P_MAGENTA?: number;
    P_CYAN?: number;
    P_YELLOW?: number;
}
