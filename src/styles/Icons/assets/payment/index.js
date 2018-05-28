import React from "react";
import Image from "../../../../components/Image";
import Sprite from "../../_Sprite";
export const PaymentEfinance = p => (
  <Sprite {...p} viewBox="0 0 120 80" id="payment-efinance" />
);
export const PaymentMastercard = p => (
  <Image {...p} src={require("./payment-mastercard.svg")} />
);
export const PaymentPostfinance = p => (
  <Sprite {...p} viewBox="0 0 120 80" id="payment-postfinance" />
);
export const PaymentSms = p => (
  <Sprite {...p} viewBox="0 0 120 80" id="payment-sms" />
);
export const PaymentVisa = p => (
  <Sprite {...p} viewBox="0 0 120 80" id="payment-visa" />
);
