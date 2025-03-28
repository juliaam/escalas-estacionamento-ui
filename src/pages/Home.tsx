import { useEffect, useMemo, useState } from "react";
import ExceptionModal from "@/components/ExceptionModal/ExceptionModal";
import ScheduleAssignmentModal from "@/components/ScheduleAssignmentModal/ScheduleAssignmentModal";
import ScaleLayout from "@/components/ScaleLayout/ScaleLayout";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { mockCooperators } from "@/shared/mocks/mockCooperators";
import {
  AssignmentsCooperators,
  scaleForm,
  ScaleFormValues,
} from "@/shared/lib/forms/scaleForm";
import { ExceptionsFormValues } from "@/shared/lib/forms/exceptionForm";
import { Exception } from "@/shared/types/Exception";
import { AssignmentFormValues } from "@/shared/lib/forms/assignmentForm";
import { useScale } from "@/shared/hooks/useScale";
import { useNavigate } from "react-router-dom";
import { scaleGroup } from "@/shared/mocks/scaleResult";

const generateScaleBody = ({
  cooperatorsIds,
  exceptions,
  assignments,
  date,
  name,
}: ScaleFormValues) => {
  const cooperators = cooperatorsIds.map((coopId) => ({
    id_coop: coopId,
    exceptions: exceptions
      .filter((exception) => exception.cooperator_id === coopId)
      .map(({ cooperator_id: _, ...exception }) => exception),
    assignments: assignments
      .filter((assignment) => assignment.cooperator_id === coopId)
      .map(({ cooperator_id: _, ...assignment }) => assignment),
  }));
  return {
    name,
    date: date.toISOString(),
    cooperators,
  };
};

const Home = () => {
  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedCooperatorForException, setSelectedCooperatorForException] =
    useState("");
  const [selectedCooperatorForAssignment, setSelectedCooperatorForAssignment] =
    useState("");
  const methods = useForm<ScaleFormValues>({
    defaultValues: scaleForm.initialValues,
  });
  const { handleSubmit, setValue, getValues, watch } = methods;
  const { setScaleData } = useScale();
  const cooperatorsIds: string[] = watch("cooperatorsIds");
  const exceptions: Exception[] = watch("exceptions");
  const assignments: AssignmentsCooperators[] = watch("assignments");
  const navigate = useNavigate();

  const cooperatorsWithFlags = mockCooperators.map((cooperator) => ({
    ...cooperator,
    hasExceptions: exceptions.some(
      (exception) => exception.cooperator_id === cooperator.id
    ),
    hasAssignments: assignments.some(
      (assignment) => assignment.cooperator_id === cooperator.id
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
    setSelectedCooperatorForException("");
    setIsExceptionModalOpen(true);
  };

  const onSaveException = (exception: ExceptionsFormValues) => {
    const exceptions = getValues("exceptions");
    let newValue;

    const alreadyExists = exceptions.some(
      (except) => except.cooperator_id === exception.cooperator_id
    );

    if (alreadyExists) {
      newValue = exceptions.map((except) => {
        if (except.cooperator_id === exception.cooperator_id) {
          return exception;
        }
        return except;
      });
    } else {
      newValue = [...exceptions, exception];
    }

    setValue("exceptions", newValue);
    setSelectedCooperatorForException("");
    setIsExceptionModalOpen(false);
  };

  const onSaveAssignment = (assignment: AssignmentFormValues) => {
    const assignments = getValues("assignments");
    let newValue;

    const alreadyExists = assignments.some(
      (assign) => assignment.cooperator_id === assign.cooperator_id
    );

    if (alreadyExists) {
      newValue = assignments.map((assign) => {
        if (assignment.cooperator_id === assign.cooperator_id) {
          return assign;
        }
        return assignment;
      });
    } else {
      newValue = [...assignments, assignment];
    }

    setValue("assignments", newValue);
    setSelectedCooperatorForException("");
    setIsExceptionModalOpen(false);
  };

  const handleRemoveException = (id: string) => {
    const exceptions = getValues("exceptions");
    const newValue = exceptions.filter((except) => except.cooperator_id !== id);

    setValue("exceptions", newValue);
    toast.success("Exceção removida");
  };

  const handleRemoveAssignment = (id: string) => {
    const assignments = getValues("assignments");
    const newValue = assignments.filter(
      (assign) => assign.cooperator_id !== id
    );

    setValue("assignments", newValue);
    toast.success("Agendamento removido");
  };

  const cooperatorsSelected = useMemo(
    () => mockCooperators.filter((coop) => cooperatorsIds.includes(coop.id)),
    [cooperatorsIds]
  );

  const onSubmit = async (data: ScaleFormValues) => {
    try {
      const scaleBody = data;
      // const resultado = await ScaleService.generate(scaleBody);
      setScaleData(scaleGroup);
      navigate("/resultado");
    } catch {
      // error handler later
      toast("Houve um erro ao gerar escala!");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScaleLayout
            scaleName="name"
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
        </form>

        <ExceptionModal
          isOpen={isExceptionModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForException}
          setCooperatorId={(coopId: string) => {
            setSelectedCooperatorForException(coopId);
          }}
          onClose={() => {
            setSelectedCooperatorForException("");
            setIsExceptionModalOpen(false);
          }}
          onSave={onSaveException}
        />

        <ScheduleAssignmentModal
          isOpen={isAssignmentModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForAssignment}
          onSave={onSaveAssignment}
          onClose={() => {
            setSelectedCooperatorForAssignment("");
            setIsAssignmentModalOpen(false);
          }}
        />
      </FormProvider>
    </>
  );
};

export default Home;
