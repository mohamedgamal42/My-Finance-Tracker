import React, { useContext, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import { ExpenseContext } from "../store/context/expense-context";
import Expense from "../components/expense";
import IncomeCard from "../components/incomeCard";
import { ExpenseModal } from "../modals/expenseModal";
import { fetchExpenses } from "../dataBase/databse";
import { COLORS, styleNumber } from "../constants/constants";

const HomeScreen = ({ navigation }: any) => {
  const expenseCTX = useContext(ExpenseContext);
  const expensesOBJ: ExpenseModal[] = expenseCTX.expenses;

  const addExpenseHandler = () => {
    navigation.navigate("AddExpenseScreen");
  };

  const monthlyDetailsHandler = () => {
    navigation.navigate("MonthDetailsScreen");
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchexpensesHandler = async () => {
      const expenses = await fetchExpenses();
      expenses.forEach((element: ExpenseModal) => {
        expenseCTX.addExpense(element);
      });
    };
    if (isFocused) {
      fetchexpensesHandler();
    }
  }, []);

  return (
    <LinearGradient
      colors={[COLORS.violet, "black", "black"]}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
        <IncomeCard
          expensesOBJ={expensesOBJ}
          monthlyDetailsHandler={monthlyDetailsHandler}
        />
        <View style={styles.expenseContainer}>
          <View>
            <TouchableOpacity
              onPress={addExpenseHandler}
              style={styles.addExpenseButton}
            >
              <Text>Add Expenses</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={expensesOBJ}
              renderItem={(item) => <Expense expense={item.item} />}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    width: "90%",
    marginVertical: 20,
    padding: 10,
  },
  cardContainer: {
    backgroundColor: COLORS.violet,
    width: "90%",
    height: 100,
    marginVertical: 20,
    padding: 10,
  },
  expenseContainer: {
    width: "90%",
    marginVertical: 20,
    padding: 10,
    paddingBottom: 140,
  },
  addExpenseButton: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.neongreen,
    marginBottom: 5,
    borderRadius:styleNumber.borderRadius
  },
});
