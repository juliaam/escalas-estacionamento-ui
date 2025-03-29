import { ScaleFormValues } from "../lib/forms/scaleForm";

export function formatScale({
  name,
  cooperatorsIds,
  exceptions,
  assignments,
  date,
}: ScaleFormValues) {
  const cooperators = cooperatorsIds.map((coopId) => ({
    id_coop: coopId,
    exceptions: exceptions
      .filter((except) => except.cooperator_id === coopId)
      .map(({ cooperator_id: _, date, ...except }) => {
        return {
          date: date.toISOString(),
          ...except,
        };
      }),
    assignments: assignments
      .filter((assign) => assign.cooperator_id === coopId)
      .map(({ cooperator_id: _, date, ...assign }) => {
        return {
          date: date.toISOString(),
          ...assign,
        };
      }),
  }));
  return {
    name,
    date: date.toISOString(),
    cooperators,
  };
}
