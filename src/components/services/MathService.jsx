import { evaluate } from "mathjs";

export function getOperations(params) {
  const operators = getOperators(params);
  let operations = [];
  for (let i = 0; i < params.amount; i++) {
    const operation = generateOperation(params, operators);
    operations.push({
      id: i + 1,
      operation,
      operationText: getWrittenOperation(operation),
    });
  }
  return operations;
}

export function getCorrectAnswers(operations) {
  for (let operation of operations) {
    if (operation.answer === null || operation.answer === "") {
      operation.isRightAnswer = false;
    } else if (evaluate(operation.operation) === Number(operation.answer)) {
      operation.isRightAnswer = true;
    } else {
      operation.isRightAnswer = false;
    }
    operation.rightAnswer = evaluate(operation.operation);
  }
  return operations;
}

function generateOperation(params, operators) {
  if (params.isTables) {
    return tablesOperation(params, operators);
  } else if (!params.isTables) {
    return mathOperation(params, operators);
  }
}

function mathOperation(params, operators) {
  let operation = "";

  for (let i = 0; i < params.operands; i++) {
    let newOperand = getOperand(params.negativeNumbers, params.maximum);

    operation = operation + newOperand;

    if (i < params.operands - 1) {
      operation = operation + getRandomOperator(operators);
    }
  }

  operation = validateOperation(params, operators, operation);

  return operation;
}

function tablesOperation(params, operators) {
  let operation = "";
  const tables = params.tablesSelection.filter(
    (t) => t.value && t.label <= params.tablesMaximum
  );
  const tableOperand = tables[getRandomInt(0, tables.length - 1)].label;
  const operand = getOperand(params.negativeNumbers, params.tablesMaximum);
  const operator = getRandomOperator(operators);

  if (operator === "*") {
    operation = tableOperand + operator + operand;
  } else if (operator === "/") {
    operation =
      evaluate(tableOperand + "*" + operand) + operator + tableOperand;
  }

  return operation;
}

function validateOperation(params, operators, operation) {
  let validatedOperation = operation;

  if (isNaN(evaluate(operation)) || evaluate(operation) === Infinity) {
    validatedOperation = generateOperation(params, operators);
  }
  if (evaluate(operation) % 1 !== 0) {
    validatedOperation = generateOperation(params, operators);
  }
  if (!params.negativeNumbers && evaluate(operation) < 0) {
    validatedOperation = generateOperation(params, operators);
  }

  return validatedOperation;
}

function getOperand(negativeNumbers, max) {
  let operand;
  if (negativeNumbers) {
    operand = getRandomInt(1, max).toString();
    if (getRandomInt(0, 2) === 1) {
      operand = "(-" + operand + ")";
    }
  } else if (!negativeNumbers) {
    operand = getRandomInt(1, max).toString();
  }
  return operand;
}

function getRandomOperator(operators) {
  const randomIndex = getRandomInt(0, Number(operators.length) - 1);

  return operators[randomIndex];
}

function getOperators(params) {
  let operators = [];
  if (params.addition && !params.isTables) {
    operators.push("+");
  }
  if (params.substraction && !params.isTables) {
    operators.push("-");
  }
  if (
    (!params.isTables && params.multiplication) ||
    (params.isTables && params.tablesMultiplication)
  ) {
    operators.push("*");
  }
  if (
    (!params.isTables && params.division) ||
    (params.isTables && params.tablesDivision)
  ) {
    operators.push("/");
  }
  return operators;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getWrittenOperation(operation) {
  operation = operation.replaceAll("+", " + ");
  operation = operation.replaceAll("-", " - ");
  operation = operation.replaceAll("( - ", "(-");
  operation = operation.replaceAll("*", " x ");
  operation = operation.replaceAll("/", " ÷ ");

  return operation;
}
