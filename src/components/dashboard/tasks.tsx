"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tasksData, type Task } from "@/lib/data";
import { Check, X, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const { toast } = useToast();

  const handleTaskAction = (taskId: string, action: "Accepted" | "Denied") => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast({
      title: `Task ${action}`,
      description: `You have ${action.toLowerCase()} task ${taskId}.`,
    });
  };

  const pendingTasks = tasks.filter((task) => task.status === 'Pending');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Tasks </CardTitle>
        <CardDescription>
          Review and respond to your pending tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {pendingTasks.length > 0 ? (
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <Dialog key={task.id}>
                <DialogTrigger asChild>
                  <button className="flex w-full text-left items-center p-4 rounded-md border hover:bg-muted/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-4">
                        <task.icon className="h-6 w-6 text-muted-foreground" />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{task.case}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                    </div>
                    <div className="ml-auto text-sm text-muted-foreground">{task.dueDate}</div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>Task Details</DialogTitle>
                    <DialogDescription>
                      Review the details of the task before accepting or denying.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="case-id" className="text-right">
                        Case
                      </Label>
                      <span id="case-id" className="col-span-2 font-semibold">{task.case}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="client-name" className="text-right">
                        Client
                      </Label>
                      <span id="client-name" className="col-span-2">{task.clientName}</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="task-id" className="text-right">
                        Task ID
                      </Label>
                      <span id="task-id" className="col-span-2">{task.id}</span>
                    </div>
                    <div className="grid grid-cols-3 items-start gap-4">
                      <Label htmlFor="task-desc" className="text-right mt-1">
                        Description
                      </Label>
                      <p id="task-desc" className="col-span-2 text-sm">{task.description}</p>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="due-date" className="text-right">
                        Due Date
                      </Label>
                      <span id="due-date" className="col-span-2">{task.dueDate}</span>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleTaskAction(task.id, "Denied")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Deny
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => handleTaskAction(task.id, "Accepted")}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
            <Briefcase className="w-12 h-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No Pending Tasks</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All tasks are up to date.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
