"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateRangeSelectorProps {
    onRangeChange: (start: Date, end: Date) => void
    label: string
}

export function DateRangeSelector({ onRangeChange, label }: DateRangeSelectorProps) {
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate)
            const end = new Date(endDate)
            if (start <= end) {
                onRangeChange(start, end)
            }
        }
    }, [startDate, endDate, onRangeChange])

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="flex items-end space-x-4">
                <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

