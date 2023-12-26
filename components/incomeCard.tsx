import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import PieChartComponent from "./piechartComponent";
import { COLORS, styleNumber } from "../constants/constants";
import { ExpenseModal } from "../modals/expenseModal";

type PropType = {
    expensesOBJ:ExpenseModal[],monthlyDetailsHandler:()=>void
  };
const IncomeCard = ({ expensesOBJ, monthlyDetailsHandler }: PropType) => {
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);

  useEffect(() => {
    setIncomeAmount(0);
    setExpenseAmount(0);
    expensesOBJ.map((singleExpense: ExpenseModal) => {
      if (singleExpense.type === "income") {
        setIncomeAmount((prevState) => prevState + singleExpense.amount);
      } else {
        setExpenseAmount((prevState) => prevState + singleExpense.amount);
      }
    });
  }, [expensesOBJ]);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={monthlyDetailsHandler}
    >
      <View>
        <Text>income {incomeAmount}</Text>
        <Text>expense {expenseAmount}</Text>
      </View>
      <View>
        <PieChartComponent expensesOBJ={expensesOBJ} widthAndHeight={70} listItems={false}/>
      </View>
    </TouchableOpacity>
  );
};

export default IncomeCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.violet,
    width: "90%",
    height: 100,
    marginVertical: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: styleNumber.borderRadius,
    borderWidth: 3,
    borderColor: COLORS.neongreen,
  },
  incomeTxt: { color: "green" },
  expenseTxt: { color: "red" },
});
