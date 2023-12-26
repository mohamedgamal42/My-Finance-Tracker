import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import PieChart from "react-native-pie-chart";

import { ExpenseModal } from "../modals/expenseModal";
import PieChartColorDetail from "./pieChartColorDetail";

type PropType = {
  expensesOBJ: ExpenseModal[];
  widthAndHeight: number;
  listItems: boolean;
};
const PieChartComponent = ({
  expensesOBJ,
  widthAndHeight,
  listItems,
}: PropType) => {
  const expenseMap = new Map();
  let pieChartDataArray: any[] = [];

  expensesOBJ.map((expense: ExpenseModal) => {
    if (expenseMap.has(expense.category)) {
      const expenseAmount = +expenseMap.get(expense.category) + +expense.amount;
      expenseMap.set(expense.category, expenseAmount);
    } else {
      expenseMap.set(expense.category, expense.amount);
    }
  });

  const availbleColors = [
    "#8ff143",
    "#74ee15",
    "#5cbe10",
    "#3a770a",
    "#224706",
  ];
  let index = 0;
  expenseMap.forEach((value, key) => {
    index += 1;
    pieChartDataArray.push({
      category: key,
      amount: value,
      color: availbleColors[index],
    });
  });

  const expenseAmountArray = pieChartDataArray.map((item) => +item.amount);

  let pichartColorSliceArray: string[] = pieChartDataArray.map(
    (item) => item.color
  );

  const showColorDetails = () => {
    if (listItems) {
      return (
        <FlatList
          data={pieChartDataArray}
          renderItem={(item) => <PieChartColorDetail colorDetail={item.item} />}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      {expenseAmountArray.length > 1 ? (
        <>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={expenseAmountArray}
            sliceColor={pichartColorSliceArray}
            coverRadius={0.2}
            // coverFill={"#FFF"}
          />
          {showColorDetails()}
        </>
      ) : null}
    </View>
  );
};

export default PieChartComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  expenseTxt: {
    color: "white",
    fontsize: 20,
  },
});
