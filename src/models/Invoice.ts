export interface Invoices {
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
    contribuyente_especial?: string;
    obligado_llevar_contabilidad?: string;
    razon_social_comprador: string;
    identificacion_comprador: string;
    total_sin_impuestos: number;
    total_descuento: number;
    propina: number;
    importe_total: number;
    valor_ice: number;
    valor_irbpnr: number;
    xmlUrl: string;
    pdfUrl: string;
    parttner?: string;
    own?: string;
    tenant_id?: string;
  }
