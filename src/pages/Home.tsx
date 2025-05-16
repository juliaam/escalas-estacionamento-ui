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
import { useCooperators } from "@/shared/hooks/useCooperators";
import { ScaleService } from "@/services/ScaleService";
import { formatScale } from "@/shared/utils/formatScale";
import { ExceptionsFormValues } from "@/shared/lib/forms/exceptionForm";
import { Cooperator } from "@/shared/types/Cooperator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";

const Home = () => {
  const navigate = useNavigate();
  const { setScaleData } = useScale();
  const {
    data: cooperators,
    fetchCooperators,
    isLoading: isLoadingCooperators,
  } = useCooperators();
  const methods = useForm<ScaleFormValues>({
    defaultValues: scaleForm.initialValues,
    resolver: zodResolver(scaleForm.validationSchema),
  });
  const { handleSubmit, setValue, getValues, watch } = methods;

  const [isExceptionModalOpen, setIsExceptionModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [selectedCooperatorForException, setSelectedCooperatorForException] =
    useState("");
  const [selectedCooperatorForAssignment, setSelectedCooperatorForAssignment] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cooperatorsIds: string[] = watch("cooperatorsIds");
  const exceptions: Exception[] = watch("exceptions");
  const assignments: AssignmentFormValues[] = watch("assignments");
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

  const onSaveException = (exception: ExceptionsFormValues) => {
    setValue("exceptions", [...getValues("exceptions"), exception]);
    setIsExceptionModalOpen(false);
    setSelectedCooperatorForException("");
    toast("Exceção criada com sucesso!");
  };

  const onSaveAssignment = (assignment: AssignmentFormValues) => {
    setValue("assignments", [...getValues("assignments"), assignment]);
    setIsAssignmentModalOpen(false);
    setSelectedCooperatorForAssignment("");
    toast("Agendamento criado com sucesso!");
  };

  const onRemoveException = (id: Cooperator["id"]) => {
    setValue(
      "exceptions",
      getValues("exceptions").filter((except) => except.cooperator_id !== id)
    );
    toast("Excessão removida com sucesso!");
  };

  const onRemoveAssignment = (id: Cooperator["id"]) => {
    setValue(
      "assignments",
      getValues("assignments").filter((assign) => assign.cooperator_id !== id)
    );
    toast("Agendamento removido com sucesso!");
  };

  const onSubmit = async (data: ScaleFormValues) => {
    try {
      setIsLoading(true);
      const scale = await ScaleService.generate(formatScale(data) as never);
      setScaleData(scale);
      toast("Escala gerada com sucesso!");
      navigate("/resultado");
    } catch {
      toast("Houve um erro ao gerar escala!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const populateCooperators = async () => {
      const coops = await fetchCooperators();
      if (coops) {
        setValue(
          "cooperatorsIds",
          coops.map((coop) => coop.id)
        );
      }
    };
    populateCooperators();
  }, []);

  return (
    <>
      <FormProvider {...methods}>
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ScaleLayout
              cooperators={cooperators}
              scaleName="name"
              exceptions={exceptions}
              assignments={assignments}
              cooperatorsWithFlags={cooperatorsWithFlags}
              onAddExceptionForCooperator={handleAddExceptionForCooperator}
              onAddAssignmentForCooperator={handleAddAssignmentForCooperator}
              onAddException={() => {
                setIsExceptionModalOpen(true);
                setSelectedCooperatorForException("");
              }}
              onAddAssignment={() => setIsAssignmentModalOpen(true)}
              onRemoveException={onRemoveException}
              onRemoveAssignment={onRemoveAssignment}
              isLoadingCooperators={isLoadingCooperators}
            />
          </form>
        )}

        <ExceptionModal
          isOpen={isExceptionModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForException}
          setCooperatorId={setSelectedCooperatorForException}
          onClose={() => {
            setIsExceptionModalOpen(false);
            setSelectedCooperatorForException("");
          }}
          onSave={onSaveException}
        />

        <ScheduleAssignmentModal
          isOpen={isAssignmentModalOpen}
          cooperators={cooperatorsSelected}
          selectedCooperatorId={selectedCooperatorForAssignment}
          onSave={onSaveAssignment}
          onClose={() => {
            setIsAssignmentModalOpen(false);
            setSelectedCooperatorForAssignment("");
          }}
        />
      </FormProvider>
    </>
  );
};

export default Home;
