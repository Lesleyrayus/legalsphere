import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow, TableHead, TableHeader } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { caseFilesData, type CaseFile } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CaseFiles() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Case Files</CardTitle>
          <CardDescription>Manage your firm's case files.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Case
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caseFilesData.map((file: CaseFile) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">{file.id}</TableCell>
                <TableCell>{file.clientName}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      file.status === "Active"
                        ? "secondary"
                        : file.status === "Closed"
                        ? "outline"
                        : "default"
                    }
                    className={cn(
                        file.status === 'Active' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
                        file.status === 'Pending' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                    )}
                  >
                    {file.status}
                  </Badge>
                </TableCell>
                <TableCell>{file.lastUpdated}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
