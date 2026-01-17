import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { bookingsData, type Booking } from "@/lib/data";

export function Bookings() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>User Bookings</CardTitle>
        <CardDescription>A list of your upcoming appointments.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody>
            {bookingsData.map((booking: Booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={booking.avatar} alt={booking.client} data-ai-hint="person face" />
                      <AvatarFallback>
                        {booking.client.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{booking.client}</div>
                      <div className="text-sm text-muted-foreground">
                        {booking.purpose}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="font-medium">{booking.date}</div>
                  <div className="text-sm text-muted-foreground">
                    {booking.time}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
