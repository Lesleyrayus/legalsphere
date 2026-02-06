"use client"

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { bookingsData, type Booking } from "@/lib/data";
import { format, parse, isSameDay } from "date-fns";

export function Bookings() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const bookedDays = bookingsData.map(booking => parse(booking.date, 'MMMM d, yyyy', new Date()));

  const selectedDayBookings = date
    ? bookingsData.filter(booking => isSameDay(parse(booking.date, 'MMMM d, yyyy', new Date()), date))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
            <CardContent className="p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    classNames={{
                        head_cell: 'w-full',
                        cell: 'w-full',
                        row: 'flex w-full mt-2',
                    }}
                    modifiers={{ booked: bookedDays }}
                    modifiersStyles={{
                        booked: {
                            border: '1px solid hsl(var(--primary))',
                            borderRadius: 'var(--radius)',
                        },
                        selected: {
                           backgroundColor: 'hsl(var(--primary))',
                           color: 'hsl(var(--primary-foreground))',
                        }
                    }}
                 />
            </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
                Appointments for {date ? format(date, "MMMM d, yyyy") : "All Upcoming"}
            </CardTitle>
            <CardDescription>
                {date && selectedDayBookings.length > 0 ? `You have ${selectedDayBookings.length} appointment(s) on this day.` : ``}
                {date && selectedDayBookings.length === 0 && 'No appointments for this day.'}
                {!date && 'Select a day to see appointments.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {selectedDayBookings.length > 0 ? (
                <Table>
                <TableBody>
                    {selectedDayBookings.map((booking: Booking) => (
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
                        <div className="font-medium">{booking.time}</div>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            ) : (
                <div className="p-6 text-center text-muted-foreground">
                    {!date ? 'Select a day from the calendar to view appointments.' : 'No appointments scheduled for this day.'}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
