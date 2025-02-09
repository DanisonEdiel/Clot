export interface DebitNotes {
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
    identificacion_comprador: string;
    contribuyente_especial: string;
    obligado_llevar_contabilidad: string;
    cod_doc_modificado: string;
    num_doc_modificado: string;
    fecha_emision_doc_modificado: string;
    total_sin_impuestos: number;
    valor_modificacion: string;
    valor_ice: number;
    valor_irbpnr: number;
    razones: string[];
    motivos_adicionales: string[];
    xmlUrl: string;
    pdfUrl: string;
    parttner?: string;
    own?: string;
    tenant_id?: string;
}
