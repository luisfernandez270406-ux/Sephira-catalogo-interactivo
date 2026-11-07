const priceFormatter = new Intl.NumberFormat("es-VE", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value) => priceFormatter.format(value);