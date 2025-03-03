"use client"; // تأكد من أن الكود يعمل فقط على جانب العميل

import { Provider } from "react-redux";
import { store } from "./stor";

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
