import React from "react";
import { Label } from "@/components/ui/label";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CardProps {
  title: string;
  value: string | number;
  color?: string; 
}

export default function CustomCard({
  title,
  value,
  color = "bg-green-500",
}: CardProps) {
  return (
    <div className="group relative">
      <Card className="relative shadow-md transform transition-transform duration-300 group-hover:scale-105">
        <div
          className={`absolute top-0 left-0 h-full w-3 ${color} rounded-s-lg`}
          style={{ borderTopLeftRadius: "0.5rem" }}
        ></div>

        {/* Kart İçeriği */}
        <CardHeader>
          <CardTitle className="text-black text-center">
            <Label className=" text-1xl" htmlFor="name">
              {title}
            </Label>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-black text-center text-2xl font-bold p-2">
          <Label className="text-1xl p-2" htmlFor="name">
            {value}
          </Label>
        </CardContent>
      </Card>
    </div>
  );
}
