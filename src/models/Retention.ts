export interface Retentions {
    id: number;
    fecha_emision: string;
    fecha_autorizacion: string;
    ruc_emisor: string;
    clave_acceso: string;
    razon_social_emisor: string;
    nombre_comercial_emisor: string;
    serie_comprobante: string;
    direccion_matriz: string;
    direccion_establecimiento: string;
    tipo_identificacion_comprador: string;
    tipo_identificacion_sujeto_retention: string;
    identificacion_comprador: string;
    contribuyente_especial: string;
    obligado_llevar_contabilidad: string;
    tipo_identificacion_sujeto_retenido: string;
    razon_social_sujeto_retenido: string;
    identificacion_sujeto_retenido: string;
    periodo_fiscal: string;
    total_retenido: string;
    xmlUrl: string;
    pdfUrl: string;
    parttner?: string;
    own?: string;
    tenant_id?: string;
}
