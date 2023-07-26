export default function guardrail(mathFunction) {
  const queue = [];
  let returnedValue;

  try {
    returnedValue = mathFunction();
  } catch (e) {
    returnedValue = e.toString();
  }

  queue.push(returnedValue);
  queue.push('Guardrail was processed');

  return queue;
}
