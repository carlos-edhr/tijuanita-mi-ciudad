/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    users: User;
    media: Media;
    voluntarios: Voluntario;
    asistentes: Asistente;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    voluntarios: VoluntariosSelect<false> | VoluntariosSelect<true>;
    asistentes: AsistentesSelect<false> | AsistentesSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  username: string;
  name?: string | null;
  image?: (string | null) | Media;
  roles?: ('super-admin' | 'user' | 'voluntario' | 'asistente')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
      }[]
    | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * Datos de las personas voluntarias
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "voluntarios".
 */
export interface Voluntario {
  id: string;
  email: string;
  name: string;
  /**
   * Número de teléfono de la persona voluntaria
   */
  telefono?: string | null;
  edad?: number | null;
  /**
   * Ocupación de la persona voluntaria
   */
  ocupacion?: string | null;
  /**
   * Respuesta a: ¿Cómo te enteraste del voluntariado?
   */
  comoSeEntero?:
    | (
        | 'Fui voluntarix en la 2da edición (Mayo 2025)'
        | 'Invitación del equipo organizador'
        | 'Redes sociales'
        | 'UABC'
        | 'IBERO'
        | 'Otro'
      )
    | null;
  /**
   * Respuesta a:  ¿En qué equipo te interesaría participar?
   */
  equipo?: ('REGISTRO' | 'SEGURIDAD' | 'MONTAJE-DESMONTAJE' | 'CONVIVENCIA') | null;
  /**
   * Respuesta a: Es necesario estar disponible de 7:30 a 14:30 horas. Se brindará un lunch e identificativo. Coordinaremos rotación y descansos.
   */
  confirmacionDeDisponibilidad?:
    | ('Estoy de acuerdo' | 'En desacuerdo' | 'Me comunicaré con la coordinadora para revisar mi caso particular')
    | null;
  /**
   * Respuesta a: La segunda capacitación será presencial (en la vía recreativa) en Playas de Tijuana el día Domingo 24 de Agosto.
   */
  capacitacion1?: ('De acuerdo' | 'Me comunicaré para resolver si no puedo en esta fecha.') | null;
  /**
   * Respuesta a: La segunda capacitación será presencial (en la vía recreativa) en Playas de Tijuana el día Domingo 24 de Agosto.
   */
  capacitacion2?:
    | (
        | 'Tengo mayor disponibilidad en la mañana (10am a 12pm)'
        | 'Tengo mayor disponibilidad en la tarde (12pm a 14pm)'
        | 'Tengo mayor disponibilidad de las 14pm en adelante'
      )
    | null;
  /**
   * Seleccionar únicamente si la persona voluntaria ya cuenta con un usuario registrado en la plataforma.
   */
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * Datos de las personas asistentes a la Vía Recreativa
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "asistentes".
 */
export interface Asistente {
  id: string;
  email: string;
  /**
   * Respuesta a: ¿Viene en compañía de un menor de edad?
   */
  acompañanteMenorDeEdad?: boolean | null;
  /**
   * Respuesta a: ¿Cuántos menores de edad vienen con usted? Responder con número,
   */
  cantidadAcompañanteMenorDeEdad?: number | null;
  /**
   * Respuesta a: ¿Qué edad tienen? / no aplica
   */
  edadesMenoresDeEdad?:
    | ('0 a 11 meses' | '1 a 3 años' | '4 a 6 años' | '7 a 13 años' | '14 a 17 años' | 'no aplica')
    | null;
  /**
   * Respuesta a: ¿Asiste alguna persona dentro de poblaciones prioritarias?
   */
  poblacionesPrioritarias?: ('No' | 'Persona con discapacidad' | 'Embarazada' | 'Persona adulta mayor') | null;
  /**
   * Respuesta a: ¿De qué zona de la ciudad asiste?
   */
  zonaCiudad?: string | null;
  /**
   * Respuesta a:  ¿Cómo se enteró del evento?
   */
  comoSeEntero?:
    | ('Instagram' | 'Facebook' | 'Póster' | 'Invitación de la escuela' | 'Recomendación de boca en boca' | 'Otro')
    | null;
  /**
   * Respuesta a: ¿Ha participado en ediciones anteriores de la Vía Recreativa?
   */
  participacionPrevia?: string | null;
  /**
   * Respuesta a: ¿Tiene alguna pregunta o comentario? Le responderemos a su correo registrado.
   */
  comentario?: string | null;
  /**
   * Seleccionar únicamente si la persona voluntaria ya cuenta con un usuario registrado en la plataforma.
   */
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'voluntarios';
        value: string | Voluntario;
      } | null)
    | ({
        relationTo: 'asistentes';
        value: string | Asistente;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  username?: T;
  name?: T;
  image?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?:
    | T
    | {
        id?: T;
        createdAt?: T;
        expiresAt?: T;
      };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "voluntarios_select".
 */
export interface VoluntariosSelect<T extends boolean = true> {
  email?: T;
  name?: T;
  telefono?: T;
  edad?: T;
  ocupacion?: T;
  comoSeEntero?: T;
  equipo?: T;
  confirmacionDeDisponibilidad?: T;
  capacitacion1?: T;
  capacitacion2?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "asistentes_select".
 */
export interface AsistentesSelect<T extends boolean = true> {
  email?: T;
  acompañanteMenorDeEdad?: T;
  cantidadAcompañanteMenorDeEdad?: T;
  edadesMenoresDeEdad?: T;
  poblacionesPrioritarias?: T;
  zonaCiudad?: T;
  comoSeEntero?: T;
  participacionPrevia?: T;
  comentario?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}