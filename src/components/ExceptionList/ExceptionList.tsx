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
import { Period } from "@/shared/enums/period";
import { ExceptionsFormValues } from "@/shared/lib/forms/exceptionForm";

interface ExceptionListProps {
  exceptions: ExceptionsFormValues[];
  cooperators: Cooperator[];
  onAddException: () => void;
  onRemoveException: (id: string) => void;
  className?: string;
}

const ExceptionList: React.FC<ExceptionListProps> = ({
  exceptions,
  cooperators,
  onAddException,
  onRemoveException,
  className,
}) => {
  const { watch } = useFormContext<ScaleFormValues>();
  const selectedCooperators = watch("cooperatorsIds");
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="flex-shrink-0 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Exceções</CardTitle>
          <Button
            onClick={onAddException}
            disabled={!selectedCooperators.length}
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
          {exceptions.length > 0 ? (
            <div className="space-y-2 pr-2">
              {exceptions.map((exception) => {
                const cooperator = cooperators?.find(
                  (c) => c.id === exception.cooperator_id
                );

                return (
                  <div
                    key={exception.cooperator_id}
                    className="group flex items-center gap-3 rounded-md bg-secondary p-3"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary-foreground/5">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="truncate font-medium">
                        {cooperator?.name || "Cooperador"}
                      </span>
                      <div className="flex gap-1 text-sm text-muted-foreground">
                        <span>
                          Data: {format(exception.date, "dd/MM/yyyy")}
                        </span>
                        <span
                          className={cn(
                            "flex items-center gap-1",
                            exception.period === Period.enum.morning
                              ? "text-yellow-500"
                              : "text-blue-500"
                          )}
                        >
                          {exception.period === Period.enum.morning ? (
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
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() =>
                        onRemoveException?.(exception.cooperator_id)
                      }
                    >
                      <X className="h-4 w-4" />
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
                Nenhuma exceção adicionada
              </h3>
              <p className="mb-2 max-w-xs text-xs text-muted-foreground">
                Adicione exceções para dias específicos no qual haja
                cooperadores já escalados
              </p>
              <Button
                onClick={onAddException}
                variant="outline"
                size="sm"
                className="gap-1"
                disabled={!selectedCooperators.length}
              >
                <Plus className="h-3 w-3" />
                <span>Adicionar Exceção</span>
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExceptionList;
