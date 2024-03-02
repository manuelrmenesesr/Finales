export default (movements) => {
  movements.forEach(movement => {
    console.log("Movement ID:", movement.id);
    console.log("Concept:", movement.concept);
    console.log("Amount:", movement.amount);
    console.log("Account:", movement.Account.name);
    if (movement.Account.entity) console.log("Account entity:", movement.Account.entity);
    console.log("Date:", movement.date.toISOString().split('T')[0]);
    console.log("Categories On Movements:");
    movement.categoriesOnMovements.forEach(catOnMov => {
      console.log("  - CategoriesOnMovements ID:", catOnMov.id);
      console.log("    Category:", catOnMov.Category.category);
      console.log("    Subcategory:", catOnMov.Category.subcategory);
      console.log("    Amount:", catOnMov.amount);
      if (catOnMov.disbursementTransactions.length > 0) {
        console.log("    As Debt Disbursement:");
        catOnMov.disbursementTransactions.forEach(disbursementTransaction => {
          console.log("      - DisbursementTransactions (Debt) ID:", disbursementTransaction.id);
          console.log("        Repayment CategoriesOnMovements ID:", disbursementTransaction.RepaymentMovements.id);
          console.log("        Repayment Movement ID:", disbursementTransaction.RepaymentMovements.Movements.id);
          console.log("        Repayment Concept:", disbursementTransaction.RepaymentMovements.Movements.concept);
          console.log("        Repayment Movement Amount:", disbursementTransaction.RepaymentMovements.Movements.amount);
          console.log("        Repayment Date:", disbursementTransaction.RepaymentMovements.Movements.date.toISOString().split('T')[0]);
          console.log("        Repayment Category:", disbursementTransaction.RepaymentMovements.Category.category);
          console.log("        Repayment Subcategory:", disbursementTransaction.RepaymentMovements.Category.subcategory);
          console.log("        Repayment Debt Amount:", disbursementTransaction.RepaymentMovements.amount);
          console.log("        Debt Remaining:", disbursementTransaction.remaining);
        });
      }
      if (catOnMov.repaymentTransactions.length > 0) {
        console.log("    As Debt Repayment:");
        catOnMov.repaymentTransactions.forEach(repaymentTransaction => {
          console.log("      - DisbursementTransactions (Debt) ID:", repaymentTransaction.id);
          console.log("        Disbursement CategoriesOnMovements ID:", repaymentTransaction.DisbursementMovements.id);
          console.log("        Disbursement Movement ID:", repaymentTransaction.DisbursementMovements.Movements.id);
          console.log("        Disbursement Concept:", repaymentTransaction.DisbursementMovements.Movements.concept);
          console.log("        Disbursement Movement Amount:", repaymentTransaction.DisbursementMovements.Movements.amount);
          console.log("        Disbursement Date:", repaymentTransaction.DisbursementMovements.Movements.date.toISOString().split('T')[0]);
          console.log("        Disbursement Category:", repaymentTransaction.DisbursementMovements.Category.category);
          console.log("        Disbursement Subcategory:", repaymentTransaction.DisbursementMovements.Category.subcategory);
          console.log("        Disbursement Debt Amount:", repaymentTransaction.DisbursementMovements.amount);
          console.log("        Debt Remaining:", repaymentTransaction.remaining);
        });
      }
    });
    console.log("\n");
  });
}