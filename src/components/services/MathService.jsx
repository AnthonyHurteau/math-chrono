export function getOperations(params) {
  const operators = getOperators(params);

  return generateOperations(params, operators);
}

function generateOperations(params, operators) {
  let operations = [];
  for (let i = 0; i < params.amount; i++) {
    operations.push({ operation: generateOperation(params, operators) });
  }
  return operations;
}

function generateOperation(params, operators) {
  let operation = "";
  for (let i = 0; i < params.operands; i++) {
    operation = operation + getOperand(params);
    if (i < params.operands - 1) {
      operation = operation + getRandomOperator(operators);
    }
  }
  return operation;
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
