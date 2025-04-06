import { ScaleFormValues } from "../lib/forms/scaleForm";

export function formatScale({
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
    selected_date: date.toISOString(),
    cooperators,
  };
}
