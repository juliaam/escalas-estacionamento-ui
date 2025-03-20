import { useState } from "react";
import ExceptionModal from "@/components/ExceptionModal/ExceptionModal";
import ScheduleAssignmentModal, {
  AssignmentData,
} from "@/components/ScheduleAssignmentModal/ScheduleAssignmentModal";
import ScaleLayout from "@/components/ScaleLayout/ScaleLayout";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mockCooperators } from "@/shared/mocks/mockCooperators";
import { ScaleFormValues } from "@/shared/lib/forms/scaleForm";

const Home = () => {
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [exceptions, setExceptions] = useState<ExceptionData[]>([]);
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [selectedCooperatorForException, setSelectedCooperatorForException] =
    useState("");
  const [selectedCooperatorForAssignment, setSelectedCooperatorForAssignment] =
    useState("");

  const methods = useForm<ScaleFormValues>();
  const { handleSubmit } = methods;

  const cooperatorsWithFlags = mockCooperators.map((cooperator) => ({
    ...cooperator,
    hasExceptions: exceptions.some(
      (exception) => exception.cooperatorId === cooperator.id
    ),
    hasAssignments: assignments.some(
      (assignment) => assignment.cooperatorId === cooperator.id
    ),
  }));

  const handleAddExceptionForCooperator = (coopId: string) => {
    setSelectedCooperatorForException(coopId);
    setIsExceptionModalOpen(true);
  };

  const handleAddAssignmentForCooperator = (coopId: string) => {
    setSelectedCooperatorForAssignment(coopId);
    setIsAssignmentModalOpen(true);
  };

  const handleAddException = () => {
    console.log("aqui");
    setSelectedCooperatorForException("");
    setIsExceptionModalOpen(true);
  };

  const addException = () => {
    console.log("add");
  };

  const handleRemoveException = (id: string) => {
    // ver isso posteriormente
    toast.success("Exceção removida");
  };

  const handleRemoveAssignment = (id: string) => {
    toast.success("Agendamento removido");
  };

  const onSubmit = (data: ScaleFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ScaleLayout
          scaleName="name"
          monthName="month"
          cooperatorsWithFlags={cooperatorsWithFlags}
          onAddExceptionForCooperator={handleAddExceptionForCooperator}
          onAddAssignmentForCooperator={handleAddAssignmentForCooperator}
          exceptions={exceptions}
          assignments={assignments}
          onAddException={handleAddException}
          onRemoveException={handleRemoveException}
          onAddAssignment={() => setIsAssignmentModalOpen(true)}
          onRemoveAssignment={handleRemoveAssignment}
        />

        <ExceptionModal
          isOpen={isExceptionModalOpen}
          onClose={() => setIsExceptionModalOpen(false)}
          cooperators={mockCooperators}
          selectedCooperatorId={selectedCooperatorForException}
          setCooperatorId={(coopId: string) => {
            setSelectedCooperatorForException(coopId);
          }}
          onSave={(exception) => ""}
        />

        <ScheduleAssignmentModal
          isOpen={isAssignmentModalOpen}
          onClose={() => setIsAssignmentModalOpen(false)}
          cooperators={mockCooperators}
          selectedCooperatorId={selectedCooperatorForAssignment}
        />
      </form>
    </FormProvider>
  );
};

export default Home;
