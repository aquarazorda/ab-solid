import { useConfig } from "~/config";
import { useUser } from "~/states/user";

function formatNumber(num: number, options: Intl.NumberFormatOptions) {
  const formatter = new Intl.NumberFormat("en-US", options);
  return formatter.format(num);
}

export const formatBalance = (balance: number, poker?: boolean) => {
  const { isAm } = useConfig();
  if (!balance) {
    return !isAm ? "0.00" : "0";
  }

  if (!isAm) {
    return poker
      ? balance.toFixed(2)
      : formatNumber(Math.floor(Number(balance)) / 100, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  }

  return poker
    ? formatNumber(balance, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : formatNumber(Number(balance) / 100, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

export const getCurrencySymbol = (currencyId?: keyof typeof currencySymbols) => {
  const [user] = useUser();

  if (!currencyId) {
    const id = user.PreferredCurrencyID as keyof typeof currencySymbols;
    return currencySymbols[id];
  }

  return currencySymbols[currencyId];
};

const currencyNames = {
  2: "GEL",
  3: "USD",
  6: "RUB",
  7: "UAH",
  4: "EUR",
  5: "GBP",
  8: "AMD",
};

const currencySymbols = {
  2: "GEL",
  3: "$",
  6: "₽",
  7: "UAH",
  4: "€",
  5: "GBP",
  8: "AMD",
};
