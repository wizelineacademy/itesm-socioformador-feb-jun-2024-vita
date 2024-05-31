"use client";


import { ValueRecord } from "@/src/data/datatypes/autoeval";
import { useEffect, useState } from "react";
import { XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer, TooltipProps, LineChart, CartesianGrid} from "recharts";

interface LineChartProps {
    data: ValueRecord[],
    tags: string[]
    lineColor: string,
    infoColor: string,
    xLabel: string,
    yLabel: string
}

export const LineChartPlot: React.FC<LineChartProps> = ({ 
    data, 
    tags,
    lineColor,
    infoColor,
    xLabel,
    yLabel 
}) => {

    const [aspect, setAspect] = useState(3); // Default aspect ratio for large screens

    useEffect(() => {
        const updateAspect = () => {
            if (window.innerWidth < 768) {
                setAspect(2); // Aspect ratio for small screens
            } else {
                setAspect(3); // Aspect ratio for large screens
            }
        };

        // Set initial aspect ratio
        updateAspect();

        // Add event listener for window resize
        window.addEventListener("resize", updateAspect);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateAspect);
        };
    }, []);

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-gray-100 rounded-xl px-5 py-5 ">
                    <p className="label mb-2 font-bold text-gray-900">{`${tags[0]}: ${label}`}</p>
                    <p className={`intro font-bold ${infoColor}`}>{`${tags[1]}: ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%" className={"aspect"} aspect={aspect}>
            <LineChart width={400} height={250}  data={data} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={"preserveStartEnd"} label={{ value: xLabel, position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: yLabel, angle: -90, position: 'insideCenter', offset: 15 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke={lineColor} activeDot={{ r: 8 }}
/>
            </LineChart>
        </ResponsiveContainer>
    );
};