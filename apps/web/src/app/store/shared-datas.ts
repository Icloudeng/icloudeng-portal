import { createContext, useContext } from 'react';

import { QShareDataType } from '@/cms/items';

export type ISharedData = QShareDataType & {
  locale: string;
};

const defaultValue: ISharedData = {
  languages: [],
  TopbarLinks: [],
  NavbarLinks: [],
  FooterLinks: [],
  NavbarButtons: [],
  CompanyDetails: undefined,
  Chatwoot: undefined,
  Layout: undefined,
  locale: 'en',
  Matomo: undefined,
  Kroki: undefined,
  News: [],
};

export const sharedDataContext = createContext<ISharedData>({} as ISharedData);

export const SharedDataProvider = sharedDataContext.Provider;
export const SharedDataConsumer = sharedDataContext.Consumer;

export const useSharedData = () =>
  useContext(sharedDataContext) || defaultValue;
