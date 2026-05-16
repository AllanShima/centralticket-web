"use client"

import * as React from "react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerSimpleProp {
    date?: Date | undefined,
    setDate?: React.Dispatch<React.SetStateAction<Date>> | undefined,
    label?: string
}

export function DatePickerSimple({ date, setDate } : DatePickerSimpleProp) {

  return (
    <Field className="flex w-fit h-fit ">
      <Popover>
        <PopoverTrigger asChild className="flex h-fit w-fit">
          <Button
            variant="outline"
            id="date-picker-simple"
            className="flex w-fit justify-start font-normal"
          >
            {date ? format(date, "PPP") : <span>Selecione uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            required
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
