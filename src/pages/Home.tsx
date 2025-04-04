import { useEffect, useMemo, useState } from "react";
import ExceptionModal from "@/components/ExceptionModal/ExceptionModal";
import ScheduleAssignmentModal from "@/components/ScheduleAssignmentModal/ScheduleAssignmentModal";
import ScaleLayout from "@/components/ScaleLayout/ScaleLayout";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { scaleForm, ScaleFormValues } from "@/shared/lib/forms/scaleForm";
import { Exception } from "@/shared/types/Exception";
import { AssignmentFormValues } from "@/shared/lib/forms/assignmentForm";
import { useScale } from "@/shared/hooks/useScale";
import { useNavigate } from "react-router-dom";
import { scaleGroup } from "@/shared/mocks/scaleResult";
import { useCooperators } from "@/shared/hooks/useCooperators";

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
  const assignments: AssignmentFormValues[] = watch("assignments");
  const navigate = useNavigate();

  const { data: cooperators } = useCooperators();

  const cooperatorsWithFlags = useMemo(
    () =>
      cooperators?.map((cooperator) => ({
        ...cooperator,
        hasExceptions: exceptions.some(
          (exception) => exception.cooperator_id === cooperator.id
        ),
        hasAssignments: assignments.some(
          (assignment) => assignment.cooperator_id === cooperator.id
        ),
      })) || [],
    [cooperators, exceptions, assignments]
  );

  const handleAddExceptionForCooperator = (coopId: string) => {
    setSelectedCooperatorForException(coopId);
    setIsExceptionModalOpen(true);
  };

  const handleAddAssignmentForCooperator = (coopId: string) => {
    setSelectedCooperatorForAssignment(coopId);
    setIsAssignmentModalOpen(true);
  };

  const cooperatorsSelected = useMemo(
    () => cooperators?.filter((coop) => cooperatorsIds.includes(coop.id)) || [],
    [cooperators, cooperatorsIds]
  );

  const onSubmit = async (data: ScaleFormValues) => {
    try {
      toast("Escala gerada com sucesso!");
      setScaleData(scaleGroup);
      navigate("/resultado");
    } catch {
      toast("Houve um erro ao gerar escala!");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ScaleLayout
            cooperators={cooperators}
            scaleName="name"
            cooperatorsWithFlags={cooperatorsWithFlags}
            onAddExceptionForCooperator={handleAddExceptionForCooperator}
            onAddAssignmentForCooperator={handleAddAssignmentForCooperator}
            exceptions={exceptions}
            assignments={assignments}
            onAddException={() => setIsExceptionModalOpen(true)}
            onRemoveException={(id) =>
              setValue(
                "exceptions",
                getValues("exceptions").filter(
                  (except) => except.cooperator_id !== id
                )
              )
            }
            onAddAssignment={() => setIsAssignmentModalOpen(true)}
            onRemoveAssignment={(id) =>
              setValue(
                "assignments",
                getValues("assignments").filter(
                  (assign) => assign.cooperator_id !== id
                )
              )
            }
          />
        </form>

        <ExceptionModal
          isOpen={isExceptionModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForException}
          setCooperatorId={setSelectedCooperatorForException}
          onClose={() => setIsExceptionModalOpen(false)}
          onSave={(exception) => {
            setValue("exceptions", [
              ...getValues("exceptions").filter(
                (except) => except.cooperator_id !== exception.cooperator_id
              ),
              exception,
            ]);
            setIsExceptionModalOpen(false);
          }}
        />

        <ScheduleAssignmentModal
          isOpen={isAssignmentModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForAssignment}
          onSave={(assignment) => {
            setValue("assignments", [
              ...getValues("assignments").filter(
                (assign) => assign.cooperator_id !== assignment.cooperator_id
              ),
              assignment,
            ]);
            setIsAssignmentModalOpen(false);
          }}
          onClose={() => setIsAssignmentModalOpen(false)}
        />
      </FormProvider>
    </>
  );
};

export default Home;
