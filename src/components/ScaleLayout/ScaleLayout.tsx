import React from "react";
import CooperatorList from "@/components/CooperatorList/CooperatorList";
import ScaleHeader from "@/components/ScaleHeader/ScaleHeader";
import ExceptionList from "@/components/ExceptionList/ExceptionList";
import ScheduleAssignmentList from "@/components/ScheduleAssignmentList/ScheduleAssignmentList";
import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";
import { Exception } from "@/shared/types/Exception";
import { AssignmentFormValues } from "@/shared/lib/forms/assignmentForm";
import { Cooperator } from "@/shared/types/Cooperator";

interface ScaleLayoutProps {
  scaleName: string;
  cooperatorsWithFlags: Cooperator[];
  exceptions: Exception[];
  assignments: AssignmentFormValues[];
  cooperators: Cooperator[];
  onAddExceptionForCooperator: (id: string) => void;
  onAddAssignmentForCooperator: (id: string) => void;
  onAddException: () => void;
  onRemoveException: (id: string) => void;
  onAddAssignment: () => void;
  onRemoveAssignment: (id: string) => void;
}

const ScaleLayout: React.FC<ScaleLayoutProps> = ({
  scaleName,
  cooperatorsWithFlags,
  onAddExceptionForCooperator,
  onAddAssignmentForCooperator,
  exceptions,
  onAddException,
  onRemoveException,
  assignments,
  onAddAssignment,
  onRemoveAssignment,
  cooperators,
}) => {
  console.log(cooperatorsWithFlags, "coopwithflags");
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto flex h-full flex-col px-4 py-4">
        <ScaleHeader scaleName={scaleName} className="mb-3" />

        <div className="grid flex-1 grid-cols-1 gap-3 overflow-hidden lg:grid-cols-3">
          <div className="overflow-hidden lg:col-span-2">
            <div className="animate-fade-in flex h-full flex-col rounded-lg border bg-card p-4 shadow-sm">
              <div className="m-2 flex justify-between">
                <h2 className="text-xl font-semibold">Cooperadores</h2>
                <Button>
                  Gerenciar cooperadores <Users2 />
                </Button>
              </div>
              <CooperatorList
                allCooperators={cooperatorsWithFlags}
                onAddException={onAddExceptionForCooperator}
                onAddAssignment={onAddAssignmentForCooperator}
                className="flex-1 overflow-hidden"
              />
            </div>
          </div>

          <div className="animation-delay-100 animate-fade-in grid h-full grid-rows-2 gap-3">
            <ExceptionList
              exceptions={exceptions}
              cooperators={cooperators}
              onAddException={onAddException}
              onRemoveException={onRemoveException}
              className="h-full overflow-hidden"
            />

            <ScheduleAssignmentList
              assignments={assignments}
              cooperators={cooperators}
              onAddAssignment={onAddAssignment}
              onRemoveAssignment={onRemoveAssignment}
              className="h-full overflow-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleLayout;
