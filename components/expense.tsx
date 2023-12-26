import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, styleNumber } from "../constants/constants";
import { ExpenseModal } from "../modals/expenseModal";

type PropType = {
  expense: ExpenseModal;
};
const Expense = ({ expense }: PropType) => {
  const returnAmountColor = () => {
    if (expense.type === "income") {
      return (
        <>
          <Text style={[styles.incomeTxt, styles.amountTxt]}>
            $ {expense.amount}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={[styles.expenseTxt, styles.amountTxt]}>
            $ {expense.amount}
          </Text>
        </>
      );
    }
  };
  return (
    <View style={styles.expenseContainer}>
      <View>
        <Text style={[styles.cardnameTxt, styles.cardTxt]}>
          Name: {expense.name}
        </Text>
        <Text style={[styles.cardTxt, styles.cardCategoryTxt]}>
          {expense.category}
        </Text>
      </View>
      <View style={styles.amountContainer}>{returnAmountColor()}</View>
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  expenseContainer: {
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: COLORS.violet,
    width: "100%",
    borderRadius: styleNumber.borderRadius,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTxt: {
    color: "white",
  },
  cardnameTxt: {
    fontSize: 17,
  },
  cardCategoryTxt: {
    color: "grey",
  },
  incomeTxt: {
    color: "green",
  },
  expenseTxt: {
    color: "red",
  },
  amountContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  amountTxt: {
    fontSize: 24,
  },
});
