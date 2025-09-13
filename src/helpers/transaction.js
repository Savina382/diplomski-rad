import { CATEGORIES } from "../constants/categories";
import { TYPES } from "../constants/types";

const categoryLabels = {
  [CATEGORIES.FOOD]: "Hrana",
  [CATEGORIES.TRANSPORT]: "Prevoz",
  [CATEGORIES.RENT]: "Kirija",
  [CATEGORIES.OTHER]: "Ostalo",
};

export function getCategoryLabel(category) {
  return categoryLabels[category] || "Nepoznata kategorija";
};

const typeLabels = {
  [TYPES.INCOME]: "Prihod",
  [TYPES.EXPENSE]: "Rashod",
};

export function getTypeLabel(type) {
  return typeLabels[type] || "Nepoznati tip";
};  
