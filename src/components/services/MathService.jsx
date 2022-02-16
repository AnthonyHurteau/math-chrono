import { evaluate } from "mathjs";

export function getOperations(params) {
  const operators = getOperators(params);

  return generateOperations(params, operators);
}

export function getCorrectAnswers(operations) {
  for (let operation of operations) {
    if (evaluate(operation.operation) === Number(operation.answer)) {
      operation.isRightAnswer = true;
    } else {
      operation.isRightAnswer = false;
    }
  }

  return operations;
}

function generateOperations(params, operators) {
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

function generateOperation(params, operators) {
  let operation = "";

  for (let i = 0; i < params.operands; i++) {
    let newOperand = getOperand(params);

    if (params.negativeNumbers) {
      if (
        newOperand.charAt(0) === "-" &&
        operation.charAt(operation.length - 1) === "+"
      ) {
        operation = operation.slice(0, -1);
      }
    }

    operation = operation + newOperand;

    if (i < params.operands - 1) {
      operation = operation + getRandomOperator(operators);
    }
  }

  operation = validateOperation(params, operators, operation);

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

function getOperand(params) {
  let operand;
  if (params.negativeNumbers) {
    operand = getRandomInt(1, params.maximum).toString();
    if (getRandomInt(0, 2) === 1) {
      operand = "-" + operand;
    }
  } else if (!params.negativeNumbers) {
    operand = getRandomInt(1, params.maximum).toString();
  }
  return operand;
}

function getRandomOperator(operators) {
  const randomIndex = getRandomInt(0, Number(operators.length) - 1);

  return operators[randomIndex];
}

function getOperators(params) {
  let operators = [];
  if (params.addition) {
    operators.push("+");
  }
  if (params.substraction) {
    operators.push("-");
  }
  if (params.multiplication) {
    operators.push("*");
  }
  if (params.division) {
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
  operation = operation.replaceAll("*", " x ");
  operation = operation.replaceAll("/", " ÷ ");

  // operation = operation + " = ";

  return operation;
}
