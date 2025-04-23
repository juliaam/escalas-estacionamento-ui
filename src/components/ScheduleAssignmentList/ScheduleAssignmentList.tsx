import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Moon, Plus, Sun, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/shared/utils/twMerge";
import { useFormContext } from "react-hook-form";
import { ScaleFormValues } from "@/shared/lib/forms/scaleForm";
import { Cooperator } from "@/shared/types/Cooperator";
import { AssignmentFormValues } from "@/shared/lib/forms/assignmentForm";
import { Period } from "@/shared/enums/period";

interface ScheduleAssignmentListProps {
  assignments: AssignmentFormValues[];
  cooperators: Cooperator[];
  onAddAssignment: () => void;
  onRemoveAssignment: (id: string) => void;
  className?: string;
}

const ScheduleAssignmentList: React.FC<ScheduleAssignmentListProps> = ({
  assignments,
  cooperators,
  onAddAssignment,
  onRemoveAssignment,
  className,
}) => {
  const { watch } = useFormContext<ScaleFormValues>();
  const selectedCooperators = watch("cooperatorsIds");
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-center justify-between gap-x-2">
          <div>
            <CardTitle className="text-lg">Agendamentos</CardTitle>
          </div>
          <Button
            disabled={!selectedCooperators.length}
            onClick={onAddAssignment}
            size="sm"
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-2 pt-0">
        <ScrollArea className="h-full">
          {assignments.length > 0 ? (
            <div className="space-y-2 pr-2">
              {assignments.map((assignment) => {
                const cooperator = cooperators.find(
                  (c) => c.id === assignment.cooperator_id
                );

                return (
                  <div
                    key={assignment.cooperator_id}
                    className="group flex items-center gap-2 rounded-md bg-green-50 p-2"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-md truncate font-medium">
                        {cooperator?.name || "Cooperador"}
                      </div>
                      <div className="flex gap-1 text-sm text-muted-foreground">
                        <span>
                          Data: {format(assignment.date, "dd/MM/yyyy")}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1",
                            assignment.period === Period.enum.morning
                              ? "text-yellow-500"
                              : "text-blue-500"
                          )}
                        >
                          {assignment.period === Period.enum.morning ? (
                            <Sun size={16} />
                          ) : (
                            <Moon size={16} />
                          )}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() =>
                        onRemoveAssignment(assignment.cooperator_id)
                      }
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-4 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-1 text-sm font-medium">
                Nenhum agendamento adicionado
              </h3>
              <p className="mb-2 max-w-xs text-xs text-muted-foreground">
                Adicione agendamentos para dias específicos onde um cooperador
                deve participar da escala.
              </p>
              <Button
                disabled={!selectedCooperators.length}
                onClick={onAddAssignment}
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>Adicionar Agendamento</span>
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ScheduleAssignmentList;
