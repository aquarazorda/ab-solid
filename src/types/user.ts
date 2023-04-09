import { P } from "ts-pattern";

const addressSchema = {
  AddressLine1: P.optional(P.string),
  AddressLine2: P.optional(P.string),
  AddressLine3: P.optional(P.string),
  Town: P.optional(P.string),
  Region: P.optional(P.string),
  PostCode: P.optional(P.string),
  County: P.optional(P.string),
};

export type Address = P.infer<typeof addressSchema>;

export const userSchema = {
  UserID: P.number,
  Name: P.string,
  Surname: P.string,
  MiddleName: P.optional(P.string),
  Gender: P.number,
  UserName: P.string,
  CountryID: P.number,
  address: addressSchema,
  BirthDate: P.string,
  Email: P.string,
  Tel: P.string,
  StatusID: P.number,
  IsOTPOn: P.boolean,
  HasClubCard: P.boolean,
  Language: P.string,
  TelephoneCode: P.string,
  DateRegistered: P.string,
  ActiveNotifications: P.number,
  PreferredCurrencyID: P.number,
  VerifiedContactChannel: P.number,
  AdditionalData: {
    maiden_name: P.string,
    mothers_maiden_name: P.string,
  },
};

export type User = P.infer<typeof userSchema>;
